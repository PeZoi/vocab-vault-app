import { UserShortenType } from "./userType";
import { VocabType } from "./vocabType";

export type FlashCardResponse = {
   id?: number;
   title?: string;
   user?: UserShortenType;
   vocabList?: VocabType[];
}

export type InfoProgressType = {
   unknow: number;
   know: number;
   progress: number;
   total: number;
   subTotal: number;
};