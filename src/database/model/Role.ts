import { Document } from 'mongoose';

export const enum RoleCode {
    MODERATOR = 'Moderator',
    USER = 'User',
    ADMIN = 'Admin',
}

export const enum RightsEnu {
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete',
    CREATE = 'create',
}

export default interface Role extends Document {
    name: RoleCode;
    description: string;
    rights: RightsEnu[];
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}