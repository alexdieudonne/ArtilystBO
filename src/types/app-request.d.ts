import { Request } from 'express';
import User from '../database/model/User';

type PublicRequest = Request;

declare type PayloadReq = { req: ProtectedRequest }

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends PublicRequest {
  user: User;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
