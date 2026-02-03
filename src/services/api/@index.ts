import { createUser } from "./createUser";
import { createUserHabit } from "./createUserHabit";
import { deleteUser } from "./deleteUser";
import { deleteUserHabit } from "./deleteUserHabit";
import { getUser } from "./getUser";
import { getUserHabitById } from "./getUserHabitById";
import { getUserHabits } from "./getUserHabits";
import { patchUserHabit } from "./patchUserHabit";
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

//Habits
static getUserHabits = getUserHabits;
static getUserHabitById = getUserHabitById;
static createUserHabit = createUserHabit;
static patchUserHabit = patchUserHabit;
static deleteUserHabit = deleteUserHabit;
}
