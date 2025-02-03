export type UserType = {
   id: number;
   fullName: string;
   email: string;
   avatar: string;
   role: RoleType;
   createAt: string;
   updateAt: string;
}

type RoleType = {
   id: number;
   roleName: string;
}