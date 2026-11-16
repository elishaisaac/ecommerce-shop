import mongoose from "mongoose";

const roleRolePermissionSchema = new mongoose.Schema({
    roleFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }, 
    permissionFID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission"
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

const RolePermission = mongoose.model("RolePermission", roleRolePermissionSchema)

export default RolePermission