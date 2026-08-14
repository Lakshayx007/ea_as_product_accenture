import os
import groq
from pydantic import BaseModel

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

# We configure Groq client here
client = None
if GROQ_API_KEY:
    client = groq.Groq(api_key=GROQ_API_KEY)

class ChatRequest(BaseModel):
    message: str
    role: str

def get_system_prompt(role: str) -> str:
    base_context = """
    You are an AI assistant for Accenture's new Enterprise Architecture (EA) platform, built using TOGAF 10 and ArchiMate 3.2.
    The platform treats EA as a Data Product (Data Mesh principles), integrating ServiceNow, SAP PPM, Signavio, and Apptio into a canonical Azure SQL repository via Azure API Management and Event Hub.
    Benefits: $480K investment yields $893K ROI over 3 years (186% ROI). Manual data collection drops from 2,400 hours to 960 hours (60% reduction). Data freshness improves from 4-8 weeks to under 4 hours. Application coverage rises from 40% to 95%+. Error rate drops from 18% to 2%.
    """
    
    role_prompts = {
        "cio": "You are assisting the CIO. Focus on board-ready reporting, DORA compliance, $2B IT portfolio visibility, and EAIMM maturity (improving from Level 1 to Level 5).",
        "cfo": "You are assisting the CFO. Focus on IT spend optimization, detecting duplicate platforms, cost-by-application visibility, and the $893K ROI.",
        "ea_manager": "You are assisting the EA Manager. Focus on data quality rules (Great Expectations), canonical models, automated syncs, and the reduction of survey overhead.",
        "prog_manager": "You are assisting the Programme Manager. Focus on project-to-application dependency mapping, timeline overlaps, and AI-driven impact analysis for proposed changes.",
        "sec_officer": "You are assisting the Security/Compliance Officer. Focus on DORA audit trails, automated continuous compliance monitoring, zero-trust security zones, and end-of-life technology risks."
    }
    
    return base_context + "\n" + role_prompts.get(role, "You are assisting a general stakeholder.") + "\nIf you cannot answer from the project context, use your general knowledge."

def chat_with_groq(req: ChatRequest):
    if not client:
        return {"reply": "Groq API key not configured. Please add it to your environment variables."}
        
    sys_prompt = get_system_prompt(req.role)
    try:
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": sys_prompt},
                {"role": "user", "content": req.message}
            ],
            temperature=0.7,
            max_tokens=500
        )
        return {"reply": completion.choices[0].message.content}
    except Exception as e:
        return {"reply": f"Error calling Groq API: {str(e)}"}
