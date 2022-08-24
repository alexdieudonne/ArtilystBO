import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import { ProtectedRequest, PublicRequest, RoleRequest } from '../../../types/app-request';
import crypto from 'crypto';
import { BadRequestError } from '../../../core/ApiError';
import User from '../../../database/model/User';
import validator from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import _ from 'lodash';

import { RoleCode } from '../../../database/model/Role';

const router = express.Router();

router.post(
  '/',
  // asyncHandler(async () => await schema.signup['email'].validateAsync({})),
  validator(schema.signup),
  asyncHandler(async (req: PublicRequest, res, next) => {
    //const user = await UserRepo.findByEmail(req.body.email);
    // if (user) throw new BadRequestError('User already registered');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');
    // const passwordHash = await bcrypt.hash(req.body.password, 10);

    // const { user: createdUser, keystore } = await UserRepo.create(
    //   {
    //     email: req.body.email,
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname,
    //     username: req.body.username,
    //     password: passwordHash,
    //   } as User,
    //   accessTokenKey,
    //   refreshTokenKey,
    //   RoleCode.USER,
    // );

    //const tokens = await createTokens(createdUser, keystore.primaryKey, keystore.secondaryKey);
    // new SuccessResponse('Signup Successful', {
    //   user: _.pick(createdUser, [
    //     '_id',
    //     'firstname',
    //     'lastname',
    //     'email',
    //     '-roles',
    //     'profilePicUrl',
    //   ]),
    //   tokens: tokens,
    // }).send(res);
  }),
);


