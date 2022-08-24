import Joi from 'joi';
import { JoiAuthBearer } from '../../../helpers/validator';

export default {
  checkMail: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
  }),
  userCredential: Joi.object().keys({
     email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6),
  }),
  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),

  signup: Joi.object().keys({
    firstname: Joi.string().required().min(3),
    lastname: Joi.string().required().min(3),
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6),
    birthdate: Joi.date().optional(),
    categoryAccount: Joi.string().optional(),
    pictures: Joi.any().optional(),
  }),

  profil: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    birthdate: Joi.date().required().optional(),
  }),

  //role
  roleCreate: Joi.object().keys({
    name: Joi.string().required().min(3),
    description: Joi.string().required().min(3).max(250),
    status: Joi.boolean().optional(),
  }),
};
