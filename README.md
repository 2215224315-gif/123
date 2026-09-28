# 景珩医美 · 课程与 AI 服务平台

面向医美机构经营者的官网、会员课程和 AI 内容工具起步项目。当前版本提供首页、课程用户端、管理端展示页、API 健康检查和独立 AI 服务占位接口；登录、支付、课程播放、真实数据持久化及模型接入尚未实现。

## 目录

```text
apps/
  web/        官网 + 用户端 + 管理端（Vite / React / TypeScript）
  api/        业务 API（Node.js / Express）
  ai/         独立 AI 服务（Python / FastAPI）
infra/
  nginx/      按域名/路径路由的 Nginx 示例
  docker/     Web 静态站点镜像
docs/         架构、域名和部署说明
```

## 技术选择

- **pnpm workspace**：一个仓库管理多个可独立部署的服务，后续便于拆分域名或迁移。
- **Vite + React + TypeScript**：用于快速构建响应式官网、会员学习界面和运营后台；当前先以路径区分端，域名接入时可再独立构建。
- **Express API**：轻量 Node 服务，负责账号、课程、订单等业务接口；后续可加 PostgreSQL、Prisma、身份认证和支付回调。
- **FastAPI AI 服务**：与业务 API 分开部署，方便配置模型供应商、异步任务、限流和独立扩缩容。
- **Docker Compose / Nginx**：本地联调与生产反向代理配置示例；域名 DNS、备案、HTTPS 证书及主机信息由部署环境决定。

## 本地启动

需要 Node.js 20+、pnpm 11+、Python 3.11+。

```bash
cp .env.example .env
corepack enable
pnpm install
pnpm dev
```

另开终端启动 AI 服务：

```bash
cd apps/ai
python -m venv .venv
source .venv/bin/activate   # Windows PowerShell: .venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

- 官网：<http://localhost:5173>
- 会员用户端：<http://localhost:5173/learn>
- 管理端：<http://localhost:5173/admin>
- API 健康检查：<http://localhost:4000/api/v1/health>
- AI 服务健康检查：<http://localhost:8001/health>
- API 文档：<http://localhost:8001/docs>

也可用 `docker compose up --build` 启动三个容器。

## 域名扩展

可以先由同一 Web 应用通过路径区分，也可按需拆分为 `www.example.com`（官网）、`learn.example.com`（会员端）、`admin.example.com`（管理端）、`api.example.com`（业务 API）、`ai.example.com`（AI 服务）。Nginx 示例见 [`docs/deployment.md`](docs/deployment.md)。更换实际域名时更新 DNS、TLS 证书和 `.env` 中对应的公开地址。

## API 起步接口

- `GET /api/v1/health`
- `GET /api/v1/overview`（演示用平台概览）
- `GET /health`（AI 服务）
- `POST /v1/assistant/draft`（本地演示回复；模型接入接口预留）

医疗相关内容仅提供经营、课程和合规文案辅助，不提供诊断、治疗建议或疗效保证。接入真实模型前应增加权限、审计、敏感信息处理、内容审核和服务条款。
