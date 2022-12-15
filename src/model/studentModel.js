const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId;

const studentSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            trim: true,
            require: true
        },
        Subject: {
            type: String,
            trim: true,
            require: true
        },
        Marks: {
            type: Number,
            trim: true,
            require: true
        },
        userId: {
            type: objectId,
            ref: "User",
            trim: true,
            require: true
        },
        idDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Student", studentSchema);