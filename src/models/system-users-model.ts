export interface ISystemUser {
  sid: string;
  firstName: string;
  lastName: string;
  isActive?: boolean;
  createdOn?: number;
  lastUpdatedOn?: number;
}
export interface IRole {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  isAdmin: boolean;
}
export interface IResource {
  id: number;
  name: string;
  description?: string;
  type: string;
  isActive: boolean;
}
export interface IRoleResource {
  id: number;
  role: number;
  resource: number;
  permissions: number;
}
export interface IUserRole {
  id: number;
  user: string;
  role: number;
}
