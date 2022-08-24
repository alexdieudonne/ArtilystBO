/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  gender?: 'Mr' | 'Mrs' | 'Other';
  firstname: string;
  lastname: string;
  size?: number;
  weight?: number;
  ethnie?: 'Afro' | 'Hispanic' | 'Asiatic' | 'Caucasian' | 'Indian' | 'Oriental';
  tattoo?: 'YES' | 'NO';
  hair?: 'Fair' | 'Brown' | 'Black' | 'Grey' | 'White' | 'Chatain' | 'Roux' | 'Other';
  roles?: (string | Role)[];
  measurement: {
    value?: number;
    id?: string;
  }[];
  category_account?: 'MODEL' | 'PHOTO' | 'COMEDIAN' | 'STYLIST' | 'REALISATOR';
  bodytype?: 'Skinny' | 'Thin' | 'Average' | 'Atletic' | 'BodyBuilder' | 'Curvy' | 'Coated';
  'Type compte'?: 'ARTIST' | 'RECRUITER';
  username: string;
  pictures?: (string | Media)[];
  bio?: string;
  moreinfos?: {
    [k: string]: unknown;
  }[];
  verified?: boolean;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "roles".
 */
export interface Role {
  id: string;
  name: string;
  description: string;
  rights: ('read' | 'update' | 'delete')[];
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "medias".
 */
export interface Media {
  image?: string;
  id: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes: {
    thumbnail: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}