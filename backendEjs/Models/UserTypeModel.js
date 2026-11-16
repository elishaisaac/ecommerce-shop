import mongoose from "mongoose";

const userTypeSchema = new mongoose.Schema({
    userTypeName: {
        type: String
    },
    userTypeDescription: {
        type: String
    },
    branchID: {
        type: Number
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

const UserType = mongoose.model("UserType", userTypeSchema)

export default UserType