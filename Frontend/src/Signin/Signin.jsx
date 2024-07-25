import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

function Signin(){
    const navigate= useNavigate();
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");

    const handlemail= function(event){
        setEmail(event.target.value);
    }

    const handlepassword= function(event){
        setPassword(event.target.value);
    }

    const handlesubmit= async function(event){
        event.preventDefault();
        try{
            const response= await axios.post("http://localhost:3000/api/vi/user/signin",{
                userName: email,
                password: password
            })
            localStorage.setItem("token", response.data.token);    //Putting the jwt token in local storage
            if(response.status===200){
                alert(response.data.msg);
                navigate("/paydashboard");
            }
        }
        catch(error){
            if(error.response){
                alert(error.response.data.msg);
            }
            else if(error.request){
                alert("No response from server");
            }
            else{
                alert("Error in singing in");
            }
        }
    }

    return(
        <>
        <div className="container">
            <form onSubmit={handlesubmit} className="form-container">
                <h2>Sign In</h2>
                <h4>Email</h4>
                <input type="email" placeholder="abcd@gmail.com" value={email} onChange={handlemail}></input>
                <h4>Password</h4>
                <input type="password" placeholder="123456" value={password} onChange={handlepassword}></input> <br/>
                <button>Sign In</button>
            </form>
        </div>
        </>
    )
}


export default Signin;
