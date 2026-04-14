import io
import json
import time
import random
import pandas as pd
from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks

from email.mime.multipart import MIMEMUltipart
from email.mime.text import MIMEText
import smtp as sm

from dtos import productDTO
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------Helper Functions---------------

def send_bulk_emails_task(user_email, app_password, drafts):
    """The background worker logic with anti-spam delays."""
    try:
        server = sm.SMTP("smtp.gmail.com",587)
        server.starttls()
        server.login(user_email, app_password)

        for draft in drafts:
            message = MIMEMultipart("alternative")
            

@app.get("/")
def home():
    return "Hello"


@app.post("/create_products")
def create_products(data:productDTO):
    print(data)
    return {"status": "Produts created sucessfully"}


# ApiCheck.jsx

# import axios from "axios";
# import {useState} from "react";

# function ApiCheck() {

#     const [id, setId] = useState("");
#     const [title, setTitle] = useState("");
#     const [price, setPrice] = useState("");
#     const [count, setCount] = useState("");

#     function handleSubmit(e){
#         e.preventDefault();
         
#         const data = {
#             id: Number(id),
#             title: title,
#             price: Number(price),
#             count: Number(count),
#         }

#         axios.post("http://localhost:8000/create_products",data)
#         .then((res) => {
#             console.log(res.data);
#         })
#         .catch((err)=>{
#             console.log(err.response.data)
#         })
#     }


#     return (
#         <>
#             <h1>Post Request Form</h1>
#             <form onSubmit={handleSubmit} method="POST" id="myForm">
#                 <label htmlFor="id">id:</label>
#                 <input type="number" value={id} onChange={(e)=> setId(e.target.value)} id="Id" /><br /><br />

#                 <label htmlFor="title">title:</label>
#                 <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} id="Title" /><br /><br />

#                 <label htmlFor="price">price:</label>
#                 <input type="number" value={price} onChange={(e)=> setPrice(e.target.value)} id="Price" /><br /><br />

#                 <label htmlFor="count">count:</label>
#                 <input type="number" value={count} onChange={(e)=> setCount(e.target.value)} id="Count" /><br /><br />

#                 <button type="submit" id="Btn">Submit</button>
#             </form>
#         </>
#     )
# }

# export default ApiCheck;