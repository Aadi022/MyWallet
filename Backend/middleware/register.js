//This middleware is for signing up. It checks if the entered info is of valid format and username isn't already a part of the database.

const db= require("../db/db");
const userdb= db.User;
const zod= require("zod");

const signupSchema= zod.object({
    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

async function checker(req,res,next){
    const body= req.body;


    const result= signupSchema.safeParse(body);

    if(!result.success){
        res.status(400).json({
            msg: "Incorrect format entered"
        })
    }

    const val= await userdb.findOne({
        userName: body.userName
    })

    if(val){
        res.status(403).json({
            msg: "Username already exists"
        })
    }
    else{
        next();
    }
}

module.exports= checker;