import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
    userFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    roleFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
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

const UserRole = mongoose.model("UserRole", userRoleSchema)

export default UserRole