import { UserShortenType } from "./userType";
import { VocabType } from "./VocabType";

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
   user: UserShortenType;
   totalVocabulary: number;
   vocabList: VocabType[];
}