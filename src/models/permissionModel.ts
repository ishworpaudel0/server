import { Schema, model, Document, Types } from "mongoose"; 

export interface IPermission extends Document {
    permissionName: string;
    description: string;
}
const permissionSchema = new Schema<IPermission>({
    permissionName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const PermissionModel = model<IPermission>("Permission", permissionSchema);

export default PermissionModel;