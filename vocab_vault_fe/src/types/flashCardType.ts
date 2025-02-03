import { UserShortenType } from "./userType";
import { VocabType } from "./VocabType";

export type FlashCardResponse = {
   id?: number;
   title?: string;
   user?: UserShortenType;
   vocabList?: VocabType[];
}