export type DeckRequestType = {
   title?: string;
   description?: string;
   isPublic?: boolean;
}

export type DeckResponseType = {
   id?: number;
   title?: string;
   description?: string;
   isPublic?: boolean;
   createAt: string;
   updateAt: string;
   user: DeckUserType;
}

type DeckUserType = {
   id: number;
   fullName: string;
   email: string;
   avatar: string;
}