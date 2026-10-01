const ARK_ENDPOINT = 'https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks';
const ALLOWED_ASPECT_RATIOS = new Set(['16:9', '9:16', '1:1', '4:3', '3:4', '21:9']);
const ALLOWED_RESOLUTIONS = new Set(['480p', '720p', '1080p']);

function send(res, status, payload) {
  res.status(status).json(payload);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: '仅支持 POST 请求' });

  const apiKey = process.env.ARK_API_KEY;
  const accessCode = process.env.DEMO_ACCESS_CODE;
  const model = process.env.ARK_VIDEO_MODEL || 'doubao-seedance-2-5-260628';

  if (!apiKey || !accessCode) {
    return send(res, 503, { error: '服务端尚未配置视频生成凭证' });
  }
  if (req.headers['x-demo-access-code'] !== accessCode) {
    return send(res, 401, { error: '演示访问码不正确' });
  }

  const prompt = String(req.body?.prompt || '').trim();
  const aspectRatio = ALLOWED_ASPECT_RATIOS.has(req.body?.aspectRatio) ? req.body.aspectRatio : '16:9';
  const resolution = ALLOWED_RESOLUTIONS.has(req.body?.resolution) ? req.body.resolution : '720p';
  const duration = Math.max(4, Math.min(15, Number(req.body?.duration) || 5));

  if (prompt.length < 8 || prompt.length > 1600) {
    return send(res, 400, { error: '梦境描述需为 8–1600 个字符' });
  }

  const payload = {
    model,
    content: [{ type: 'text', text: prompt }],
    resolution,
    duration,
    aspect_ratio: aspectRatio,
    generate_audio: true,
    watermark: false
  };

  try {
    const response = await fetch(ARK_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Seedance create failed', response.status, data?.error?.code || data?.code || 'unknown');
      return send(res, response.status, { error: data?.error?.message || data?.message || '视频任务创建失败' });
    }
    return send(res, 200, { id: data.id || data.task_id, status: data.status || 'queued' });
  } catch (error) {
    console.error('Seedance create request failed', error?.message);
    return send(res, 502, { error: '暂时无法连接视频生成服务' });
  }
}
