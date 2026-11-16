import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String
    },
    userPassword: {
        type: String
    },
    userTypeFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserType"
    },
    createdBy : {
        type: String
    },
    updatedBy : {
        type : String
    },
    deletedBy: {
        type: String
    },
    deletedAt: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User