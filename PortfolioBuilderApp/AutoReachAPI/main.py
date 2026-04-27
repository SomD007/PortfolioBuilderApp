import io
import json
import time
import random
import pandas as pd
import smtplib as sm
from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from google import genai
from google.genai.types import HttpOptions

app = FastAPI()

# Enable CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- HELPERS ---

def get_gemini_client(api_key: str):
    return genai.Client(api_key=api_key, http_options=HttpOptions(api_version="v1"))

def generate_email_content(client, hr_name, company_name, job_description, resume_summary):
    prompt = f"""
        Act as a professional job seeker. Write a personalized cold email.
        HR Name: {hr_name or "Hiring Manager"}
        Company: {company_name}
        Target Role: {job_description}
        My Background: {resume_summary}
        
        Guidelines: 
        - Keep it under 150 words.
        - Mention a specific detail from the job description.
        - Output ONLY the email body.
        """
    try:
        # Changed model to a stable version
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=prompt
        )
        return response.text
    except Exception as e:
        print(f"Gemini Error: {e}")
        return "Error generating content."

def send_bulk_emails_task(user_email, app_password, drafts):
    """The background worker logic with anti-spam delays."""
    try:
        server = sm.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(user_email, app_password)

        for draft in drafts:
            msg = MIMEMultipart()
            msg['Subject'] = f"Application for {draft['job_desc']} - {draft['company']}"
            msg['From'] = user_email
            msg['To'] = draft['hr_email']
            msg.attach(MIMEText(draft['body'], "plain"))

            server.sendmail(user_email, draft['hr_email'], msg.as_string())
            print(f"Successfully sent to {draft['hr_email']}")
            
            # Anti-spam delay: 30 to 60 seconds
            time.sleep(random.randint(30, 60))
            
        server.quit()
    except Exception as e:
        print(f"SMTP Background Error: {e}")

# --- ENDPOINTS ---

@app.post("/generate-drafts")
async def handle_generation(
    excel_file: UploadFile = File(...),
    resume_summary: str = Form(...),
    api_key: str = Form(...)
):
    try:
        client = get_gemini_client(api_key)
        contents = await excel_file.read()
        df = pd.read_excel(io.BytesIO(contents))
        
        # Clean column names to prevent mapping errors
        df.columns = df.columns.str.strip()
        
        drafts = []
        for _, row in df.iterrows():
            # Mapping based on your Excel image: hr_name, email, JD, company
            hr_name = row.get('hr_name')
            hr_email = row.get('email')
            job_desc = row.get('JD')
            company = row.get('company')

            if not hr_email: continue

            body = generate_email_content(
                client, hr_name, company, job_desc, resume_summary
            )
            
            drafts.append({
                "hr_email": hr_email,
                "hr_name": hr_name,
                "company": company,
                "job_desc": job_desc,
                "body": body
            })
        return {"drafts": drafts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/send-final-emails")
async def handle_sending(
    background_tasks: BackgroundTasks,
    user_email: str = Form(...),
    app_password: str = Form(...),
    emails_data: str = Form(...)
):
    try:
        drafts = json.loads(emails_data)
        # Run the sending logic in the background so the user doesn't wait
        background_tasks.add_task(send_bulk_emails_task, user_email, app_password, drafts)
        return {"status": "success", "message": "Email background process started."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))











# import io
# import json
# import time
# import random
# import pandas as pd
# from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks

# from email.mime.multipart import MIMEMUltipart
# from email.mime.text import MIMEText
# import smtp as sm

# from dtos import productDTO
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()


# origins = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173"
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # -----------------Helper Functions---------------

# def send_bulk_emails_task(user_email, app_password, drafts):
#     """The background worker logic with anti-spam delays."""
#     try:
#         server = sm.SMTP("smtp.gmail.com",587)
#         server.starttls()
#         server.login(user_email, app_password)

#         for draft in drafts:
#             message = MIMEMultipart("alternative")
            

# @app.get("/")
# def home():
#     return "Hello"


# @app.post("/create_products")
# def create_products(data:productDTO):
#     print(data)
#     return {"status": "Produts created sucessfully"}


# # ApiCheck.jsx

# # import axios from "axios";
# # import {useState} from "react";

# # function ApiCheck() {

# #     const [id, setId] = useState("");
# #     const [title, setTitle] = useState("");
# #     const [price, setPrice] = useState("");
# #     const [count, setCount] = useState("");

# #     function handleSubmit(e){
# #         e.preventDefault();
         
# #         const data = {
# #             id: Number(id),
# #             title: title,
# #             price: Number(price),
# #             count: Number(count),
# #         }

# #         axios.post("http://localhost:8000/create_products",data)
# #         .then((res) => {
# #             console.log(res.data);
# #         })
# #         .catch((err)=>{
# #             console.log(err.response.data)
# #         })
# #     }


# #     return (
# #         <>
# #             <h1>Post Request Form</h1>
# #             <form onSubmit={handleSubmit} method="POST" id="myForm">
# #                 <label htmlFor="id">id:</label>
# #                 <input type="number" value={id} onChange={(e)=> setId(e.target.value)} id="Id" /><br /><br />

# #                 <label htmlFor="title">title:</label>
# #                 <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} id="Title" /><br /><br />

# #                 <label htmlFor="price">price:</label>
# #                 <input type="number" value={price} onChange={(e)=> setPrice(e.target.value)} id="Price" /><br /><br />

# #                 <label htmlFor="count">count:</label>
# #                 <input type="number" value={count} onChange={(e)=> setCount(e.target.value)} id="Count" /><br /><br />

# #                 <button type="submit" id="Btn">Submit</button>
# #             </form>
# #         </>
# #     )
# # }

# # export default ApiCheck;