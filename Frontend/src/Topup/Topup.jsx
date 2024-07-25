import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Topup.css";

function Topup(){
    const navigate= useNavigate();
    const [amount, setAmount]= useState();
    
    const handleInput= function handleInput(event){
        setAmount(event.target.value);
    }

    const handleSubmit= async function handleSubmit(event){
        event.preventDefault();
        const token= localStorage.getItem("token");
        try{
            const response= await axios.post("http://localhost:3000/api/vi/account/topup",
            {
                amount:amount
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            );
            if(response.status===200){
                alert(response.data.msg);
                navigate("/PayDashboard");
            }
        }
        catch(error){
            if(error.response){
                alert(error.response.msg);
            }
            else if(error.request){
                alert("Server not responding");
            }
            else{
                alert("Error in topping up money");
            }
        }
    }

    return(
        <>
        <div className='container'>
            <form onSubmit={handleSubmit} className='form-container'>
                <h2>Top-Up your Account</h2>
                <h4>Amount to Top-Up(in $)</h4>
                <input type="text" placeholder="Enter Amount" value={amount} onChange={handleInput}></input><br/>
                <button type="submit">Top-Up</button>
            </form>
        </div>
        </>
    )
}

export default Topup;