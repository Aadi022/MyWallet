import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Updateprofile.css"

function Updateprofile(){
    const navigate= useNavigate();
    const [firstname, setFirstname]= useState("");
    const [lastname, setLastname]= useState("");
    const [password, setPassword]= useState("");

    const handleFN= function handleFN(event){
        setFirstname(event.target.value);
    }

    const handleLN= function handleLN(event){
        setLastname(event.target.value);
    }

    const handlepassword= function handlepassword(event){
        setPassword(event.target.value);
    }

    const handleSubmit= async function handleSubmit(event){
        event.preventDefault();
        const token= localStorage.getItem("token");
        try{
            const response= await axios.put("http://localhost:3000/api/vi/user/update",
            {
                firstName: firstname,
                lastName: lastname,
                password: password
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            )

            if(response.status===200){
                alert("Successfully updated your profile");
            }
            navigate("/paydashboard");
        }
        catch(error){
            if(error.response){
                alert(response.data.msg);
            }
            else if(error.request){
                alert("Server not responding");
            }
            else{
                alert("There is an error in updating the profile");
            }
        }
    }

    return(
        <>
        <div className="container">
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Update Your Profile</h2>
                <h3>First Name</h3>
                <input type="text" placeholder="James" value={firstname} onChange={handleFN}></input>
                <h3>Last Name</h3>
                <input type="text" placeholder="Smith" value={lastname} onChange={handleLN}></input>
                <h3>Password</h3>
                <input type="text" placeholder="123456" value={password} onChange={handlepassword}></input> <br/>
                <button type="submit">Update</button>
            </form>
        </div>
        </>
    )
}

export default Updateprofile;