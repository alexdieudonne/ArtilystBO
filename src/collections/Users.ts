import { CollectionConfig } from 'payload/types';
import { typeAccount, categoryAccount, Gender, Ethnicity, Hair, Bodytype, YesNo } from '../database/model/AccountType';
import { getEnumValues } from '../helpers/utils';
import { Request } from 'express'
import User from '../database/model/User';
import { PayloadReq, ProtectedRequest } from '../types/app-request';
import { userCheckRole, userOwnChanges } from '../helpers/auth';
import { checkEmail, updateUser, usersCreate } from '../routes/v1/access/users';
import validator, { ValidationSource } from '../helpers/validator';
import schema from '../routes/v1/access/schema';
import {login} from '../routes/v1/access/login';


const beforeOperationHook = async ({
  args, // Original arguments passed into the operation
  operation, // name of the operation
}) => {
  // console.log(args.collection.Model)
  return args; // Return operation arguments as necessary
}


const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'firstname',
  },
  endpoints: [
    {
      path: '/',
      method: 'post',
      handler: [validator(schema.signup), usersCreate]
    },
    {
      path: '/me',
      method: 'put',
      handler: [validator(schema.profil), updateUser]
    },
    {
      path: '/login',
      method: 'post',
      handler: [validator(schema.userCredential), login]
    },
    {
      path: '/check-mail/:email',
      method: 'get',
      handler: [validator(schema.checkMail, ValidationSource.PARAM), checkEmail]
    }
  ],
  auth: {
    tokenExpiration: 6311520000, // How many seconds to keep the user logged in
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000, // Time period to allow the max login attempts
  },
  access: {
    read: userCheckRole,
    update: userOwnChanges,
    create: () => true,
  },
  hooks: {
    // afterError: (e) => {
    //   //formatError(e)
    //   console.log(e)
    // }
    beforeOperation: [beforeOperationHook],
  },
  fields: [
    {
      name: 'gender',
      label: 'Genre',
      type: 'select',
      defaultValue: 'Mr',
      hasMany: false,
      options: [
        ...getEnumValues(Gender)
      ]
    },
    {
      name: 'firstname',
      label: 'Nom de famille',
      type: 'text',
      required: true,
      access: {
        read: async (e) => {
          let result = false;
          const authenticated = e.req.user ? true : false
          return authenticated
        },
        update: () => true,
        create: () => true,
      },
    },
    {
      name: 'lastname',
      label: 'Prénom',
      type: 'text',
      required: true
    },
    {
      name: 'city',
      label: 'Ville',
      type: 'text',
      required: false
    },
    {
      name: 'size',
      label: 'Taille',
      type: 'number',
    },
    {
      name: 'weight',
      label: 'Poids',
      type: 'number',
    },
    {
      name: 'shoes_size',
      label: 'Pointure',
      type: 'number',
    },
    {
      name: 'ethnicity',
      label: 'Ethnie',
      type: 'select',
      hasMany: false,
      options: [
        ...getEnumValues(Ethnicity)
      ]
    },
    {
      name: 'tattoo',
      label: 'Tatouage',
      type: 'select',
      hasMany: false,
      options: [
        ...getEnumValues(YesNo)
      ]
    },
    {
      label: 'Cheveux',
      name: 'hair',
      type: 'select',
      hasMany: false,
      options: [
        ...getEnumValues(Hair)
      ]
    },
    {
      name: 'measurements',
      label: 'Mensurations',
      type: 'array',
      maxRows: 3,
      minRows: 0,
      fields: [
        {
          name: 'value',
          label: 'Valeur',
          type: 'number',
        },
      ],
    },
    {
      name: 'categoryAccount',
      label: 'Catégorie compte',
      type: 'select',
      options: [
        ...getEnumValues(categoryAccount)
      ]
    },
    {
      name: 'bodyType',
      label: 'Corpulence',
      type: 'select',
      options: [
        ...getEnumValues(Bodytype)
      ]
    },
    {
      name: 'birthdate',
      label: 'Date de naissance',
      type: 'date',
    },
    {
      label: 'Type de compte',
      name: 'typeUser',
      type: 'select',
      options: [
        ...getEnumValues(typeAccount)
      ]
    },
    // {
    //   label: 'Photos de l\'utilisateur',
    //   name: 'pictures',
    //   type: 'upload',
    //   relationTo: 'medias',
    // },
    {
      label: 'Photos de l\'utilisateur',
      name: 'pictures',
      type: 'array',
      fields: [ // required
        {
          name: 'image',
          type: 'upload',
          relationTo: 'medias',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        }
      ]
    },
    {
      name: 'bio',
      type: 'textarea',
      maxLength: 250
    },
    {
      label: 'Plus d\'infos',
      name: 'moreinfos',
      type: 'richText',
    },
    {
      name: 'verified',
      label: 'Vérifié',
      type: 'checkbox',
      required: false,
    },
    // Email added by default
    // Add more fields as needed 
  ],

};



export default Users;