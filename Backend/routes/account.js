const express=require("express");
const router= express.Router();
const db= require("../db/db");
const userdb= db.User;
const accountdb= db.Account;
router.use(express.json());
const jwtchecker= require("../middleware/jwtchecker");
const mongoose= require("mongoose");

router.get("/balance",jwtchecker,async function(req,res){
    const account= await accountdb.findOne({
        userId: req.userID
    })

    res.status(200).json({
        balance: account.balance
    })
})



router.post("/transfer", jwtchecker, async function(req,res){  //Route to transfer funds. 2 inputs required- amount to send, and userId to send

    const body= req.body;  //body will have two data- amount and to(userID of sending person)

    const sendaccount= await accountdb.findOne({
        userId: req.userID
    })

    if(!sendaccount || sendaccount.balance<body.amount){  //Check if sender account is valid and has sufficient funds
        return res.status(400).json({
            msg: "Invalid account"
        })
    }

    const toaccount= await accountdb.findOne({  
        userId: body.userID
    })

    if(!toaccount){   //Check if receiving account is valid
        return res.status(400).json({
            msg: "Invalid account"
        })
    }

    //Reached here, then sender account and receiver account is valid
    //Sending money by sender side
    const senderside= await accountdb.updateOne(
        {userId: req.userID},
        {
            $inc:{   //Just like $set is a category, $inc is a category in updateOne
                balance: -body.amount
            }
        }
    )

    //Receiving money on receiver side
    const receiverside= await accountdb.updateOne(
        {userId: body.userID},
        {
            $inc:{
                balance: +body.amount
            }
        }
    )
    res.status(200).json({
        msg:"Transfer is successful"
    })

})  


router.post("/topup",jwtchecker,async function(req,res){   //Top up money in wallet
    const body=req.body;   //body will contain amount
    const updatedbody= await accountdb.updateOne(
        {userId: req.userID},
        {
            $inc:{
                balance: +body.amount
            }
        }
    )
    if(updatedbody){
        res.status(200).json({
            msg:"Your wallet has been successfully topped up"
        });
    }
    else{
        res.status(403).json({
            msg:"Error in topping up wallet"
        });
    }
})



module.exports= router;