import { SearchCriteria, ModelQuery } from "../shared/common-entities.model";

export interface User {
    id: number;
    username: string;
    password: string;
    passwordConfirmation: string;
    name: string;
    email: string;
    token: string;
    role: Role;
}

export interface Role {
    id: number;
    name: string;
    notes: string;
    permissions: string;
}

export interface LoginParams {
    username: string;
    password: string;
}

export interface UserQuery extends ModelQuery {
    page: number;
    size: number;
    sortField: string;
    sortOrder: number;
    queryParams: SearchCriteria[];
}