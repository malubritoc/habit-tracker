import { createUser } from "./createUser";
import { deleteUser } from "./deleteUser";
import { getUser } from "./getUser";
import { updatePassword } from "./updatePassword";
import { updateProfile } from "./updateProfile";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class API {
    
//User
static createUser = createUser;
static getUser = getUser;
static deleteUser = deleteUser;

static updateProfile = updateProfile;
static updatePassword = updatePassword;
}