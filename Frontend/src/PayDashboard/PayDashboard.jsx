import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PayDashboard.css";
import { UserContext } from '../App.jsx';

function PayDashboard() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState();  //Current balance of the user
    const [allusers, setAllusers] = useState([]);  //This is for the list of matching users returned from the backend
    const [myuser, setMyuser] = useState("");   //This is for the user entered in the input box
    const { recmail, setRecmail } = useContext(UserContext);   //We did array destructuring from UserContext. useContext() deciphers the elements stores in UserContext, which is an array. We then do its array destructuring

    useEffect(() => {   //Put jwt in headers.authorization and fetch the balance of the user from backend
        async function fetching() {
            try {
                const token = localStorage.getItem("token");   //Getting the jwt token from local storage
                const response = await axios.get("http://localhost:3000/api/vi/user/mybalance", {
                    headers: {            //Putting the jwt token in headers-authorization. So when any backend route requires to validate the jwt token, we put the jwt token to the headers-authorization
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setBalance(response.data.balance);
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.msg);
                } else if (error.request) {
                    alert("No response from server");
                } else {
                    alert("Error in getting balance");
                }
            }
        }
        fetching();
    }, []);

    const handleallusers = function handleallusers(event) {
        setMyuser(event.target.value);
    }

    useEffect(() => {  //This will keep changing the allusers array as and when myuser keeps on changing. This calls the /bulk route from backend
        async function getusers() {
            try {
                const token = localStorage.getItem("token");
                const myresponse = await axios.get(`http://localhost:3000/api/vi/user/bulk?filter=${myuser}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAllusers([]);
                const arr = myresponse.data.user;  //arr stores the array of json ,i.e. the users, returned by the api
                for (let i = 0; i < arr.length; i++) {  //Traversing through the arr, and adding each json to allusers 
                    let temp = {   //creating a temp json, then assigning this json.firstName and json.lastName to arr[i].firstName and arr[i].lastName
                        firstName: arr[i].firstName,
                        lastName: arr[i].lastName,
                        userName: arr[i].userName
                    }
                    setAllusers(a => [...a, temp]);  //Finally adding this temp json to allusers
                }
                console.log(allusers);
            } catch (error) {
                if (error.myresponse) {
                    alert(myresponse.data.msg);
                } else if (error.request) {
                    alert("Server not responding");
                } else {
                    alert("There is an error in getting users");
                }
            }
        }
        getusers();
    }, [myuser])

    const handlebutton = function handlebutton(curruser) {   //This sends to /payment when the button gets clicked
        const mail = curruser.userName;
        setRecmail(mail);
        navigate("/payment");
    }

    const handleTopup = function handleTopup() {  //navigates to /topup
        navigate("/topup");
    }

    const handleProfile = function handleProfile() {
        navigate("/updateprofile");
    }

    return (  //We make use of key in <li> for uniqueness. We want to have a unique property of every list. Always remember whenever we want to display array on the website, we do it by map function, and return <ul>-><li>
        <>
            <div className="header">
                <h1>Payments App</h1>
                <button onClick={handleTopup} className="header-button">Top-Up Wallet</button>
                <button onClick={handleProfile} className="header-button">Update Profile</button>
                <h2 className="hellouser">Hello User</h2>
            </div>
            <div className="header_balance">
                <h2>Your Balance: ${balance}</h2>
            </div>
            <div>
                <h2 className="header_balance">Users</h2>
            </div>
            <div>
                <input type="text" placeholder="Search users..." className="inputbox" value={myuser} onChange={handleallusers}></input>
            </div>
            <div>
                <ul>
                    {allusers.map((curruser, index) => (
                        <li key={index} className="mylist">{curruser.firstName} {curruser.lastName}  ({curruser.userName})<button className="mybutton" onClick={() => handlebutton(curruser)}>Send Money</button></li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default PayDashboard;
