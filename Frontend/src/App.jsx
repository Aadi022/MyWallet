import Signup from "./Signup/Signup.jsx"
import Signin from "./Signin/Signin.jsx"
import PayDashboard from "./PayDashboard/PayDashboard.jsx"
import Payment from "./Payment/Payment.jsx"
import Topup from "./Topup/Topup.jsx"
import Updateprofile from "./Updateprofile/Updateprofile.jsx"
import React, {createContext} from "react"
import { Route,Router,Routes } from "react-router-dom"
import { useState } from "react"

export const UserContext= createContext();

function App() {

    const [recmail, setRecmail]= useState("");   //This is the userName of the user which gets clicked for sending money in PayDashboard.
    return(
        //Inside the fragments, return all the routes
        <>
        <UserContext.Provider value={{recmail,setRecmail}}>
        <Routes>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/signin" element={<Signin></Signin>}></Route>
            <Route path="/paydashboard" element={<PayDashboard></PayDashboard>}></Route>
            <Route path="/payment" element={<Payment></Payment>}></Route>
            <Route path="/topup" element={<Topup></Topup>}></Route>
            <Route path="/updateprofile" element={<Updateprofile></Updateprofile>}></Route>
        </Routes>
        </UserContext.Provider>
        </>
    )
}

export default App