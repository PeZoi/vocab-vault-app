export type VocabType = {
   id?: number;
   origin?: string;
   define?: string;
   partsOfSpeech?: string;
   ipa?: string;
   level?: string;
   note?: string;
   deckId?: string;
   examples?: {
      id?: number;
      en?: string;
      vi?: string;
   }[];
};