//This middleware checks for zod validation of the entered body and checks if the userName exists in the database
const zod= require("zod");
const bcrypt= require("bcryptjs");
const db= require("../db/db");
const userdb= db.User;

async function login(req,res,next){
    const body= req.body;
    const loginbody= zod.object({
        userName: zod.string().email(),
        password: zod.string()
    })

    const result= loginbody.safeParse(body);

    if(result.success){
        const myusers= await userdb.findOne({
            userName: body.userName
        })

        if(myusers){
            req.myusers=myusers;
            next();
        }
        else{
            res.status(404).json({
                msg:"userName doesn't exist in the database"
            })
        }
    }
    else{
        res.status(400).json({
            msg: "Incorrect format of credentials"
        })
    }
}

module.exports=login;