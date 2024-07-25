const express= require("express");
const router= express.Router();
router.use(express.json());
const register= require("../middleware/register");
const zod=require("zod");
const db= require("../db/db");
const bcrypt= require("bcryptjs");
const userdb= db.User;
const mongoose= require("mongoose");
const saltRounds=12;
const JWT_SECRET= require("../config");
const jwt= require("jsonwebtoken");
const jwtchecker= require("../middleware/jwtchecker");
const loginmiddleware= require("../middleware/login");
const accountdb= db.Account;


router.post("/signup",register,async function(req,res){  //First we call the register middleware, which checks if a similar username doesn't exist in the db
    const body= req.body;

    const newuser= await userdb.create({  //creating the new user
        userName: body.userName,
        firstName: body.firstName,
        lastName: body.lastName,
        password: await bcrypt.hash(body.password,saltRounds)
    })

    const userId= newuser._id;  //This userId is the foreign key we will be using for the accountdb database. This will point that which account is for which user. 

    //We now make the account of the user, wherein we allot the user a random balance in his account. In real life, the user will enter his card details, and accordingly his bank balance will get updated
    const newaccount= await accountdb.create({
        userId,
        balance: 0
    });

    const token= jwt.sign({username: newuser._id}, JWT_SECRET);

    res.status(200).json({
        msg: "The user has been created successfully",
        token: token
    })

})


router.post("/signin", loginmiddleware ,async function(req,res){
    const body= req.body;
    const myuserdoc= req.myusers;

    const result= await bcrypt.compare(body.password, myuserdoc.password);
    if(result){
        const token= jwt.sign({username: myuserdoc._id}, JWT_SECRET);
        res.status(200).json({
            msg: "You have successfully logged in",
            token: token
        })
    }
    else{
        res.status(403).json({
            msg: "Incorrect password entered"
        })
    }
})



router.put("/update", jwtchecker, async function(req,res){  //Update user info
    const body=req.body;
    const updatebody= zod.object({
        firstName: zod.string(),
        lastName: zod.string(),
        password: zod.string()
    })

    const result= updatebody.safeParse(body);
    if(result.success){
        const updateuser= await userdb.updateOne(
            {_id: req.userID},
            {"$set": {
                firstName: body.firstName,
                lastName: body.lastName,
                password: body.password
            }}
        )

        res.status(200).json({
            msg: "The user has successfully updated his credentials"
        })
    }
    else{
        res.status(400).json({
            msg:"Invalid format of data entered"
        })
    }
})

//Read this query like- find from the database, given multiple conditions($or) such that firstname has ($regex)substring- filter and lastname has substring- filter
router.get("/bulk", jwtchecker, async function(req,res){
    const filter= req.query.filter || "";   //bulk?filter="string"
    const myusers= await userdb.find({
        $or: [{       //$or specifies multiple conditions. At least one condition must match for the document to return the query. Here, $or will return an array of json documentsthat matches either of the queries.
            firstName:{
                "$regex": filter     //Regular expressions (regex or regexp) are patterns used to match character combinations in strings. In JavaScript, they are also objects. Regex can be used for searching, matching, and replacing text. 
            }
        },
    {
        lastName:{
            "$regex": filter
        }
    }]
    })

    let ans=[];
    for(let i=0; i<myusers.length;i++){
        let newobj={
            userName: myusers[i].userName,
            firstName: myusers[i].firstName,
            lastName: myusers[i].lastName,
            _id: myusers[i]._id
        }
        if(newobj._id!=req.userID){
            ans.push(newobj);
        }
    }

    res.status(200).json({
        user: ans
    })
})


router.get("/mybalance",jwtchecker,async function(req,res){   //route to retreive back balance
    const userID= req.userID;  //getting user jwt token from jwtchecker
    const myaccount= await accountdb.findOne({  //getting the entire account document from accountdb
        userId: userID
    });

    res.status(200).json({
        balance: myaccount.balance  //responding with the balance
    })
})


router.get("/getid", jwtchecker, async function(req,res){
    const uname= req.query.uname;   
    const uid= await userdb.findOne({
        userName: uname
    });
    if(uid){
        res.status(200).json({
            id: uid._id
        });
    }
    else{
        res.status(403).json({
            msg:"User not found"
        })
    }
})


module.exports= router;