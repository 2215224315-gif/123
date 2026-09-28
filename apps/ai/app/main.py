from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(
    title="景珩 AI 服务",
    version="0.1.0",
    description="美业经营与内容工作流的 AI 服务预留接口。",
)


class DraftRequest(BaseModel):
    task: Literal["朋友圈文案", "短视频脚本", "直播复盘", "门店SOP"] = "朋友圈文案"
    topic: str = Field(min_length=2, max_length=300)
    tone: str = Field(default="自然、专业", max_length=80)


@app.get("/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "jingheng-ai",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/v1/assistant/draft")
def draft(request: DraftRequest) -> dict[str, str | bool]:
    """Safe local stub. Replace with a provider adapter after adding auth and moderation."""
    return {
        "mode": "stub",
        "task": request.task,
        "draft": (
            f"围绕「{request.topic}」整理一版{request.tone}的初稿。\n\n"
            "建议结合真实门店场景补充细节，并由运营人员核实后再发布。"
        ),
        "disclaimer": "仅用于经营和内容辅助；请人工核实，不生成诊断、治疗建议或疗效承诺。",
    }
