import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import { getFlashCardAPI } from 'apis';
import { Stack } from 'collections';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { FlashCardResponse, InfoProgressType } from 'types';
import { Vocab2Type, VocabType } from 'types/VocabType';
import { LearnFlashCard } from './LearnFlashCard';
import { CompleteFlashCard } from './CompleteFlashCard';

const initInfoProgress: InfoProgressType = { know: 0, unknow: 0, progress: 0, total: 0, subTotal: 0 };

export const FlashCardPage = () => {
   const { id } = useParams();
   const [flashCardInfo, setFlashCardInfo] = useState<FlashCardResponse | null>(null);

   const { current: flashCardList } = useRef<Stack<VocabType>>(new Stack<VocabType>());
   const { current: flashCardDoneList } = useRef<Stack<Vocab2Type>>(new Stack<Vocab2Type>());
   const [infoProgress, setInfoProgress] = useState<InfoProgressType>(initInfoProgress);

   const [flipped, setFlipped] = useState(false);

   const [isCompleteFC, setIsCompleteFC] = useState(false);


   useEffect(() => {
      const fetchFlashCard = async () => {
         const res = await getFlashCardAPI(id);
         if (res.status === 200) {
            setFlashCardInfo(res.data);
            flashCardList.fromArray(res?.data?.vocabList);

            setInfoProgress({ ...initInfoProgress, total: res.data.vocabList.length, subTotal: res.data.vocabList.length });
         }
      };
      if (id) {
         fetchFlashCard();
      }
   }, [id]);

   const handleClickReset = () => {
      flashCardList.reset();
      flashCardDoneList.reset();
      flashCardList.fromArray(flashCardInfo?.vocabList || []);
      setInfoProgress({...initInfoProgress, total: flashCardInfo?.vocabList?.length || 0, subTotal: flashCardInfo?.vocabList?.length || 0});
      setFlipped(false);
   };


   return (
      <div>
         <Button
            className="flex items-center gap-1 w-fit cursor-pointer hover:underline transition-all group border-none"
            onClick={() => {
               window.history.back();
            }}
         >
            <LeftOutlined className="size-3 group-hover:-translate-x-1 transition-all" />
            <span>Quay lại</span>
         </Button>

         <Divider />

         {isCompleteFC ? <CompleteFlashCard flashCardDoneList={flashCardDoneList} flashCardList={flashCardList} setIsCompleteFC={setIsCompleteFC} infoProgress={infoProgress} setInfoProgress={setInfoProgress} handleClickReset={handleClickReset} /> : <LearnFlashCard flashCardInfo={flashCardInfo} flashCardList={flashCardList} flashCardDoneList={flashCardDoneList} setIsCompleteFC={setIsCompleteFC} infoProgress={infoProgress} setInfoProgress={setInfoProgress} flipped={flipped} setFlipped={setFlipped} handleClickReset={handleClickReset} />}
         
         
      </div>
   );
};
