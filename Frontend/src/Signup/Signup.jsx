import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css"

function Signup(){
    const [firstName, setFirstName]= useState("");
    const [lastName, setLastName]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const navigate= useNavigate();

    const handleFN= function(event){
        setFirstName(event.target.value);
    }

    const handleLN= function(event){
        setLastName(event.target.value);
    }

    const handlemail= function(event){
        setEmail(event.target.value);
    }

    const handlepassword= function(event){
        setPassword(event.target.value);
    }

    const handleSubmit= async function(event){
        event.preventDefault();   //The default behaviour of submit of a form is to refresh the page. Hence to avoid that, we use preventDefault
        try{
            const response= await axios.post("http://localhost:3000/api/vi/user/signup",{
                userName: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            })

            if(response.status===200){
                alert(response.data.msg);
            }
            navigate("/signin");
        }
        catch(error){
            if(error.response){  //request has reached backend api, and it has returned a status code other than 200
                alert(error.response.data.msg);
            }
            else if(error.request){  //Axios has sent request to backend, but there is no response from the backend
                alert("No response from the server")
            }
            else{   //Error in the setting up of sign up page
                alert("Error in signing up");
            }
        }
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }

    return(
        <>
        <div className="container">
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Signup</h2>
                <h4>First Name</h4>
                <input type="text" placeholder="James" value={firstName} onChange={handleFN}></input>
                <h4>Last Name</h4>
                <input type="text" placeholder="Smith" value={lastName} onChange={handleLN}></input>
                <h4>Email</h4>
                <input type="email" placeholder="abcd@gmail.com" value={email} onChange={handlemail}></input>
                <h4>Password</h4>
                <input type="password" placeholder="123456" value={password} onChange={handlepassword}></input> <br/>
                <button>Sign Up</button>
            </form>
        </div>
        </>
    )
}

export default Signup;