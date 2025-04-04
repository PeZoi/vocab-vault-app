import { UserShortenType } from "./userType";
import { VocabType } from "./VocabType";

export type CardMatchResponse = {
  id?: number;
  title?: string;
  user?: UserShortenType;
  vocabList?: VocabType[];
}

export type CardMatchType = {
  idMatch?: number;
  word?: string;
}