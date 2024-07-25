import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../App.jsx';
import "./Payment.css";

function Payment(){
    const navigate= useNavigate();
    const {recmail, setRecmail}= useContext(UserContext);  
    const [amount, setAmount]= useState("");   //This is the amount to be sent
    const [myuserid, setMyuserid]= useState("");    //This is the _id of the receiving user

    const handleAmount= function(event){   //This sets the amount entered in the input box 'amount' state variable
        setAmount(event.target.value);
    }

    useEffect(()=>
        {
            async function idgetter(){
            const token= localStorage.getItem("token");
            try{
                const response1= await axios.get(`http://localhost:3000/api/vi/user/getid?uname=${recmail}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                if(response1.status===200){
                    setMyuserid(response1.data.id);
                    console.log(response1);
                }
            }
            catch(error){
                alert("There are issues in fetching details of user");
            }
        }
        idgetter();
    })

    const handleSubmit= async function handleSubmit(event){
        event.preventDefault();
        const token= localStorage.getItem("token");
        try{
            const response2= await axios.post("http://localhost:3000/api/vi/account/transfer",
            {
                amount: amount,
                userID: myuserid
            }, 
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            if(response2.status===200){
                alert(response2.data.msg);
            }
        }
        catch(error){
            if(error.response2){
                alert(response2.data.msg);
            }
            else if(error.request){
                alert("Server is not responding");
            }
            else{
                alert("Error in tranferring money");
            }
        }
        navigate("/paydashboard")
    }

    return(
        <>
        <div className='container'>
            <form onSubmit={handleSubmit} className='form-container'>
                <h1>Send Money</h1>
                <h3>To: {recmail}</h3>
                <h3>Amount (in $)</h3>
                <input type="text" placeholder="Enter amount" value={amount} onChange={handleAmount}></input> <br/>
                <button type="submit">Initiate Transfer</button>
            </form>
        </div>
        </>
    )
}

export default Payment