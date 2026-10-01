# Seedance 接入与 Vercel 部署

项目已包含两个服务端接口：

- `POST /api/video/create`：创建 Seedance 2.5 视频任务
- `GET /api/video/status?id=<task-id>`：查询任务并返回视频地址

## 1. 本地环境变量

复制 `.env.example` 为 `.env.local`，填写：

```env
ARK_API_KEY=在火山方舟新建的APIKey
ARK_VIDEO_MODEL=doubao-seedance-2-5-260628
DEMO_ACCESS_CODE=自行设置的作品演示访问码
VITE_VIDEO_API_ENABLED=true
```

`ARK_API_KEY` 和 `DEMO_ACCESS_CODE` 只允许保存在服务端环境变量中，不能写入源码、聊天、截图或以 `VITE_` 开头。

## 2. Vercel 环境变量

在 Vercel 项目中打开 **Settings → Environment Variables**，添加上述四个变量，然后重新部署。

- `ARK_API_KEY`：真实 API Key
- `ARK_VIDEO_MODEL`：Seedance 模型 ID
- `DEMO_ACCESS_CODE`：用于限制公开简历页面的生成权限
- `VITE_VIDEO_API_ENABLED`：填写 `true`

访问者输入正确的演示访问码后才能创建付费任务。访问码不是 API Key，可以单独提供给面试官并随时更换。

## 3. 安全与费用控制

- 删除或轮换任何曾出现在截图、聊天或 Git 中的 Key。
- 在火山方舟设置费用预警和调用限额。
- 简历演示建议保持 720P、5 秒，先验证链路再增加时长。
- 不要移除后端的时长、分辨率和访问码校验。

## 4. 验证

```bash
npm install
npm run build
```

未设置 `VITE_VIDEO_API_ENABLED=true` 时，页面继续使用原有视觉 Demo，不会调用付费 API。
