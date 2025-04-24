export type VocabType = {
   id?: number;
   origin?: string;
   define?: string;
   partsOfSpeech?: string;
   ipa?: string;
   level?: string;
   note?: string;
   deckId?: string;
   examples?: ExampleType[];
};

export type ExampleType = {
   id?: number;
   en?: string;
   vi?: string;
}

export enum TypeOfVocab {
   UNKNOW,
   KNOW,
}

// Để lưu trữ vào tiến trình khi học falsh card
export type Vocab2Type = {
   vocab: VocabType;
   type: TypeOfVocab;
};