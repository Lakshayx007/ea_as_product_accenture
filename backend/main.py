from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from ai_service import chat_with_groq, ChatRequest

app = FastAPI(title="Accenture EA Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok", "message": "Accenture EA Platform API is running."}

@app.get("/api/ea-data")
def get_ea_data(role: str = "cio"):
    # Common Data
    eaimm_scores = {
        "categories": ["Data Freshness", "Integration Coverage", "Governance Maturity", "Traceability Depth", "Automation Level"],
        "baseline": [1, 2, 2, 2, 2],
        "target": [5, 4, 5, 4, 4]
    }
    
    # Mock data for ECharts based on role
    data = {}
    
    if role == "cio":
        data = {
            "title": "CIO / Technology Leadership Dashboard",
            "metrics": [
                {"label": "Portfolio Spend", "value": "$2.1B"},
                {"label": "Data Freshness", "value": "< 4 Hrs"},
                {"label": "EAIMM Score", "value": "22/25"}
            ],
            "eaimm": eaimm_scores,
            "architecture_layers": [
                {"value": 3200, "name": "SAP PPM Projects"},
                {"value": 8400, "name": "ServiceNow Apps"},
                {"value": 1500, "name": "Signavio Processes"},
                {"value": 1100, "name": "Apptio Cost Centers"}
            ]
        }
    elif role == "cfo":
        data = {
            "title": "CFO Dashboard",
            "metrics": [
                {"label": "Total Investment", "value": "$480K"},
                {"label": "Net Value (3 Yrs)", "value": "$893K"},
                {"label": "FTE Savings/Yr", "value": "$187K"}
            ],
            "roi_chart": {
                "years": ["Year 1", "Year 2", "Year 3"],
                "costs": [-271000, -302000, -320000],
                "benefits": [0, 604000, 1182000] # cumulative example
            }
        }
    elif role == "ea_manager":
        data = {
            "title": "EA Manager Dashboard",
            "metrics": [
                {"label": "Data Error Rate", "value": "2%", "note": "Down from 18%"},
                {"label": "Manual FTE Hrs", "value": "960", "note": "Down from 2,400"},
                {"label": "App Coverage", "value": "95%+", "note": "Up from 40%"}
            ],
            "error_rate_chart": {
                "months": ["M1", "M6", "M12", "M18"],
                "rate": [18, 10, 4, 2]
            }
        }
    elif role == "prog_manager":
        data = {
            "title": "Programme Manager Dashboard",
            "metrics": [
                {"label": "Active Projects", "value": "214"},
                {"label": "Identified Conflicts", "value": "7"},
                {"label": "Impact Analysis", "value": "3 Days", "note": "Down from 3 weeks"}
            ]
        }
    elif role == "sec_officer":
        data = {
            "title": "Security / Compliance Officer Dashboard",
            "metrics": [
                {"label": "Compliance Audits", "value": "100%", "note": "Automated"},
                {"label": "EOL Tech Risks", "value": "12", "note": "Critical"},
                {"label": "DORA Exceptions", "value": "0"}
            ],
            "eol_chart": {
                "categories": ["Databases", "OS", "Frameworks", "Middleware"],
                "counts": [4, 2, 5, 1]
            }
        }
    else:
        data = {"title": "Stakeholder Dashboard", "metrics": []}

    return {"status": "success", "data": data}

@app.post("/api/chat")
def chat(req: ChatRequest):
    return chat_with_groq(req)
