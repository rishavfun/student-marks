const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            trim: true,
            require: true
        },
        lname: {
            type: String,
            trim: true,
            require: true
        },
        password:{
            type : String,
            trim : true,
            require: true
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model("User", userSchema)