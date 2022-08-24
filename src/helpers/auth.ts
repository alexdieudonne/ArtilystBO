import Role, { RightsEnu } from "../database/model/Role";
import { PayloadReq } from "../types/app-request";

export const userCheckRole = async ({ req }: PayloadReq) => {
    let result = false;
    const authenticated = req.user ? true : false
    if (authenticated) {
        if (req.user.roles.length > 0) {
            console.log(req.user.roles.filter(role => (role.name == "Admin" || role.name == "User")))
        }
    }

    return authenticated
}

export const userAuthenticated = async ({ req }: PayloadReq):Promise<boolean> => {
    console.log('====================================');
    console.log(req.user);
    console.log('====================================');
    return !req.user
}



export const userOwnChanges = ({ req }: PayloadReq) => {
    const authenticated = req.user ? true : false
    if (authenticated) {
        const role = checkUserRole(req.user.roles);
        if (role == "user") {
            return {
                _id: {
                    equals: req.user._id
                }
            }
        } else if (role == "admin" || role == "moderator") return true
    }
    return false
}

export const checkRead = ({ req }: PayloadReq) => {
    if (userOwnChanges({ req }) != false) {
        const roles = req.user.roles
        for (let i = 0; i < roles.length; i++) {
            const element = roles[i];
            if (element.rights.includes(RightsEnu.READ)) return true
        }
    }
    return false;
}

const checkUserRole = (roles: Role[]): "user" | "admin" | "moderator" => {
    const user = roles.filter(role => (role.name == "User")).length > 0;
    const admin = roles.filter(role => (role.name == "Admin")).length > 0;
    const moderator = roles.filter(role => (role.name == "Admin")).length > 0;
    return user ? "user" : admin ? "admin" : "moderator"
}