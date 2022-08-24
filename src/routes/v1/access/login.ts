import express, { NextFunction, Response } from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import crypto from 'crypto';
import { BadRequestError, AuthFailureError } from '../../../core/ApiError';
import validator from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import _ from 'lodash';
import payload from 'payload';
import { User } from '../../../payload-types';
import { PublicRequest } from '../../../types/app-request';


export async function login(req: PublicRequest, res: Response, next: NextFunction) {
    const user = await payload.find<User>({ collection: 'users', where: { 'email': { 'equals': req.body.email } } })
    try {
      if (!user) throw new BadRequestError('User not registered');
      const logged_user = await payload.login({
        collection:'users',
        data: {
          email: req.body.email,
          password: req.body.password
      }})
      new SuccessResponse('Login Success', logged_user).send(res);
    } catch (error) {
      return next(new BadRequestError((error.message)))
    }
  }