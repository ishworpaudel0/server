export interface createRoleRequest {
  roleName: string;
  description: string;
  permissions?: string[];
}