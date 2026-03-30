import { Schema, model, Document, Types } from "mongoose";
export interface IRole extends Document {
  roleName: string;
  description: string;
  permissions?: Types.ObjectId[];
}

const roleSchema = new Schema<IRole>({
  roleName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  permissions: { type: [Schema.Types.ObjectId], ref: "Permission" },
});

const Role = model<IRole>("Role", roleSchema);
export default Role;
