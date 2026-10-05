export const VIDEO_API_ENABLED = import.meta.env.VITE_VIDEO_API_ENABLED === 'true';

function buildPrompt(dream, style) {
  return [
    `梦境内容：${dream}`,
    `视觉方向：${style === 'AI 智能匹配' ? '根据梦境自动选择温馨、梦幻且具有电影叙事感的视觉方案' : style}`,
    '生成一段完整连续的梦境短片。主体外观和场景结构保持稳定，动作自然，镜头运动平稳。',
    '保留梦境的不确定感，但不要加入文字、水印、字幕、品牌标志或额外人物。',
    '声音仅包含与画面匹配的自然环境声，不要旁白，不要背景音乐。'
  ].join('\n');
}

async function request(path, options, accessCode) {
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-demo-access-code': accessCode.trim(),
      ...(options?.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || '视频生成请求失败');
  return data;
}

export async function createDreamVideo({ dream, style, accessCode }) {
  return request('/api/video/create', {
    method: 'POST',
    body: JSON.stringify({
      prompt: buildPrompt(dream, style),
      aspectRatio: '16:9',
      resolution: '720p',
      duration: 5
    })
  }, accessCode);
}

export async function waitForDreamVideo(taskId, accessCode, onProgress) {
  const startedAt = Date.now();
  const timeoutMs = 12 * 60 * 1000;
  let progress = 20;

  while (Date.now() - startedAt < timeoutMs) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const data = await request(`/api/video/status?id=${encodeURIComponent(taskId)}`, { method: 'GET' }, accessCode);

    if (data.status === 'succeeded') {
      if (!data.videoUrl) throw new Error('任务成功，但未返回视频地址');
      onProgress?.(100, '梦境影像已经生成');
      return data;
    }
    if (['failed', 'expired', 'cancelled'].includes(data.status)) {
      throw new Error(data.error || `视频任务状态：${data.status}`);
    }

    progress = Math.min(progress + 4, 92);
    onProgress?.(progress, data.status === 'running' ? 'Seedance 正在生成梦境影像' : '任务正在排队');
  }

  throw new Error('生成等待超时，可稍后使用任务 ID 查询结果');
}
