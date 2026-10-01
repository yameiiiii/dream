const ARK_ENDPOINT = 'https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks';

function response(statusCode, payload) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  };
}

export async function handler(event) {
  if (event.httpMethod !== 'GET') return response(405, { error: '仅支持 GET 请求' });

  const apiKey = process.env.ARK_API_KEY;
  const accessCode = process.env.DEMO_ACCESS_CODE;
  const taskId = String(event.queryStringParameters?.id || '').trim();

  if (!apiKey || !accessCode) {
    return response(503, { error: '服务端尚未配置视频生成凭证' });
  }
  if (event.headers?.['x-demo-access-code'] !== accessCode) {
    return response(401, { error: '演示访问码不正确' });
  }
  if (!/^[a-zA-Z0-9_-]{6,160}$/.test(taskId)) {
    return response(400, { error: '任务 ID 无效' });
  }

  try {
    const arkResponse = await fetch(`${ARK_ENDPOINT}/${encodeURIComponent(taskId)}`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });
    const data = await arkResponse.json().catch(() => ({}));
    if (!arkResponse.ok) {
      console.error('Seedance status failed', arkResponse.status, data?.error?.code || data?.code || 'unknown');
      return response(arkResponse.status, { error: data?.error?.message || data?.message || '任务状态查询失败' });
    }

    const content = data.content || data.output || {};
    return response(200, {
      id: data.id || taskId,
      status: data.status,
      videoUrl: content.video_url || content.url || data.video_url || null,
      posterUrl: content.poster_url || content.cover_url || null,
      error: data.error?.message || null
    });
  } catch (error) {
    console.error('Seedance status request failed', error?.message);
    return response(502, { error: '暂时无法查询视频任务' });
  }
}
