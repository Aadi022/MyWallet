const express= require("express");
router=express.Router();
const userRouter= require("./user");
const accountRouter= require("./account");

router.use("/user",userRouter); //Nested flow of program. All /user routes will go to userRouter
router.use("/account",accountRouter);

module.exports= router;