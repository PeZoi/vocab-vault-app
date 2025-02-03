export type UserType = {
   id: number;
   fullName: string;
   email: string;
   avatar: string;
   role: RoleType;
   createAt: string;
   updateAt: string;
}

export type UserShortenType = {
   id: number;
   fullName: string;
   email: string;
   avatar: string;
}

type RoleType = {
   id: number;
   roleName: string;
}