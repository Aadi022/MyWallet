const mongoose=require("mongoose");

try {
    mongoose.connect("mongodb://localhost:27017/PayTM")
    console.log("Database connected successfully");
} catch (error) {
    console.log("Could not connect with the database", error);
}


const UserSchema= new mongoose.Schema({
    userName: String,
    firstName: String,  
    lastName: String,
    password: String
});

const accountSchema= new mongoose.Schema({
    userId: {   //In accountSchema, the userId field will act as the foreign key, referncing to userName field in UserSchema
        type: mongoose.Schema.Types.ObjectId,  //type is the data-type. The type for balance is Number. ObjectId is a data-type used to reference to other documents.
        ref: 'User'
    },

    balance: Number   //This stores the user balance
})

const User= mongoose.model('User', UserSchema);
const Account= mongoose.model('Account', accountSchema);

module.exports={
    User: User,
    Account: Account
}