import { createUser } from "./createUser";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class API {
    
//User
static createUser = createUser;

}