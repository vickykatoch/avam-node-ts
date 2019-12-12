export interface ISystemUser {
  id: string;
  firstName: string;
  lastName: string;
  isActive?: boolean;
  createdOn?: number;
  lastUpdatedOn?: number;
  roles?: IRole[];
}
export interface IRole {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  isAdmin: boolean;
  resources?: IResource[];
}
export interface IResource {
  id: number;
  name: string;
  description?: string;
  type: string;
  identifier: string;
  isActive: boolean;
  xclusiveAccess?: boolean;
}
