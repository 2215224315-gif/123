import express from 'express'
import cors from 'cors'

const app = express()
const port = Number(process.env.API_PORT || 4000)
const allowedOrigins = (process.env.WEB_ORIGINS || 'http://localhost:5173').split(',').map((value) => value.trim())

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json({ limit: '1mb' }))

app.get('/api/v1/health', (_request, response) => {
  response.json({ status: 'ok', service: 'jingheng-api', version: '0.1.0', timestamp: new Date().toISOString() })
})

app.get('/api/v1/overview', (_request, response) => {
  response.json({
    mode: 'demo',
    metrics: { members: 1286, publishedCourses: 18, monthlyRevenue: 86420, pendingTasks: 7 },
    notice: '演示数据；接入持久化数据库后再用于运营决策。',
  })
})

app.get('/api/v1/courses', (_request, response) => {
  response.json({ items: [
    { id: 'course-001', title: '从内容到到院：美业线上获客实战', category: '获客增长', lessonCount: 12, published: true },
    { id: 'course-002', title: '直播间成交设计与团队 SOP', category: '直播运营', lessonCount: 9, published: true },
    { id: 'course-003', title: '让 AI 成为你的内容搭档', category: 'AI 工具', lessonCount: 6, published: false },
  ] })
})

app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(500).json({ error: 'internal_server_error' })
})

app.listen(port, '0.0.0.0', () => console.log(`API listening on :${port}`))
