import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    permissionAction: {
        type: String
    }, 
    permissionResourse: {
        type: String
    },
    permissionDescription: {
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

const Permission = mongoose.model("Permission", permissionSchema)

export default Permission