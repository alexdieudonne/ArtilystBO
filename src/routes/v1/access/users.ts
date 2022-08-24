import { BadRequestError } from './../../../core/ApiError';
import { Response, NextFunction, Request } from 'express';
import validator from '../../../helpers/validator';
import { ProtectedRequest, PublicRequest } from "app-request";
import schema from './schema';
import payload from 'payload';
import { Media, User } from '../../../payload-types';
import { Field } from 'payload/types';
import { SuccessResponse } from '../../../core/ApiResponse';


export async function usersCreate(req: PublicRequest, res: Response, next: NextFunction) {

    const uniques = await checkUnique(payload.collections['users']?.config.fields as any, req.body)
    if (uniques.length > 0) return next(new BadRequestError(uniques));
    try {
        let pictures: Array<Media> = []
        const multiple_uploads = req.files?.pictures?.length

        if (multiple_uploads) {
            for (let i = 0; i < multiple_uploads; i++) {
                const pic = req.files?.pictures[i];
                let media = await payload.create<Media>({ collection: 'medias', data: {}, file: pic });
                media.image = media.id
                pictures.push(media)
            }
        } else if(multiple_uploads != undefined) {
            let media = await payload.create<Media>({ collection: 'medias', data: {}, file: req.files?.pictures });
            media.image = media.id
            pictures.push(media)
        }

        const user = await payload.create<User>({ collection: 'users', data: { ...req.body, pictures: pictures } });
        const logged_user = await payload.login<User>({ collection: 'users', data: { email: user.email as string, password: req.body.password } });

        return new SuccessResponse('Signup Successful', {
            ...logged_user
        }).send(res);
    } catch (error) {
        return next(new BadRequestError((error as any).message))
    }
}

export async function checkEmail(req: PublicRequest, res: Response, next: NextFunction) {
    try {
        const { email } = req.params as { email: string }
        const user = await getUserExists('email', email)
        if (user) throw new Error('Email unavailable')
        return new SuccessResponse('Email available', {}).send(res);
    } catch (error) {
        return next(new BadRequestError((error as any).message))
    }
}


async function checkUnique(collection: (Field & { unique?: boolean, name: string })[], body: any) {
    let result: ErrorPayload[] = []
    for (let i = 0; i < collection.length; i++) {
        const element = collection[i];

        if (element.unique && element.name in body) {
            const user = await getUserExists(element.name, body[element.name as string])
            if (user) {
                result.push({
                    type: 'unique',
                    message: `The field ${element.label} needs to be unique`,
                    field: element.name
                })
            }
        }
    }
    return result
}

export async function updateUser(req: PublicRequest, res: Response, next: NextFunction) {
    try {
        const user = await payload.update<User>({
            collection: 'users', data: { ...req.body, },
            id: req.user.id
        });
        return new SuccessResponse('User updated', {
            ...user
        }).send(res);
    } catch (error) {
        return next(new BadRequestError((error as any).message))
    }
}

const getUserExists = async (field: string, value: string) => {
    return (await payload.find<User>({ collection: 'users', where: { [field]: { 'equals': value } } })).totalDocs > 0;
}

type ErrorPayload = {
    type: string,
    message: string,
    field: string
}