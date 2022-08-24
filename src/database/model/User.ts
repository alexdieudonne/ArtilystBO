import { Document } from 'mongoose';
import { categoryAccount, typeAccount } from "./AccountType";
import Role from "./Role";


export default interface User extends Document {
  firstname: string;
  lastname: string;
  username: string;
  email?: string;
  birthdate?: Date;
  password: string;
  profilePicUrl?: string;
  roles: Role[];
  typeAccount: typeAccount;
  categoryAccount: categoryAccount;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}