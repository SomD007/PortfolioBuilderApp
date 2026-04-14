import axios from "axios";
import React, {useState} from "react";

function ColdEmailForm() {

    const [file, setFile] = useState(null);
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [resume, setResume] = useState("");

    function handleSubmit(e){
        e.preventDefault();
         
        const formData = {
            
        }

        axios.post("http://localhost:8000/create_products",data)
        .then((res) => {
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }


    return (
        <>
            <h1>Post Request Form</h1>
            {/* <form onSubmit={handleSubmit} method="POST" id="myForm">
                <label htmlFor="id">id:</label>
                <input type="number" value={id} onChange={(e)=> setId(e.target.value)} id="Id" /><br /><br />

                <label htmlFor="title">title:</label>
                <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} id="Title" /><br /><br />

                <label htmlFor="price">price:</label>
                <input type="number" value={price} onChange={(e)=> setPrice(e.target.value)} id="Price" /><br /><br />

                <label htmlFor="count">count:</label>
                <input type="number" value={count} onChange={(e)=> setCount(e.target.value)} id="Count" /><br /><br />

                <button type="submit" id="Btn">Submit</button>
            </form> */}
        </>
    )
}

export default ColdEmailForm;