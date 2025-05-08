import { UserType } from "./userType";


export type AuthStateType = {
   accessToken: string | null;
   user: UserType | null
}