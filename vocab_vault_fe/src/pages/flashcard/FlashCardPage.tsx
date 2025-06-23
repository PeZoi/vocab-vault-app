import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, message } from 'antd';
import { Stack } from 'collections';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetFlashCardQuery } from 'redux/api';
import { InfoProgressType, Vocab2Type, VocabType } from 'types';
import { PATH_CONSTANTS } from 'utils';
import { CompleteFlashCard, FlashCardLoading, LearnFlashCard } from './components';

const initInfoProgress: InfoProgressType = { know: 0, unknow: 0, progress: 0, total: 0, subTotal: 0 };

export const FlashCardPage = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   const {
      data: flashCardInfo,
      isLoading: loading,
      error,
   } = useGetFlashCardQuery({ id: id ?? '' });

   const { current: flashCardList } = useRef<Stack<VocabType>>(new Stack<VocabType>());
   const { current: flashCardDoneList } = useRef<Stack<Vocab2Type>>(new Stack<Vocab2Type>());
   const [infoProgress, setInfoProgress] = useState<InfoProgressType>(initInfoProgress);

   const [flipped, setFlipped] = useState(false);
   const [isCompleteFC, setIsCompleteFC] = useState(false);

   useEffect(() => {
      if (flashCardInfo) {
         flashCardList.fromArray(flashCardInfo?.vocabList || []);
         setInfoProgress({
            ...initInfoProgress,
            total: flashCardInfo?.vocabList?.length || 0,
            subTotal: flashCardInfo?.vocabList?.length || 0,
         });
      }
   }, [flashCardInfo]);

   useEffect(() => {
      if (error) {
         message?.error(error as any);
         navigate(PATH_CONSTANTS.HOME);
      }
   }, [error]);

   const handleClickReset = () => {
      flashCardList.reset();
      flashCardDoneList.reset();
      flashCardList.fromArray(flashCardInfo?.vocabList || []);
      setInfoProgress({
         ...initInfoProgress,
         total: flashCardInfo?.vocabList?.length || 0,
         subTotal: flashCardInfo?.vocabList?.length || 0,
      });
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
         {loading && <FlashCardLoading />}

         {flashCardInfo &&
            (isCompleteFC ? (
               <CompleteFlashCard
                  flashCardDoneList={flashCardDoneList}
                  flashCardList={flashCardList}
                  setIsCompleteFC={setIsCompleteFC}
                  infoProgress={infoProgress}
                  setInfoProgress={setInfoProgress}
                  handleClickReset={handleClickReset}
               />
            ) : (
               <LearnFlashCard
                  flashCardInfo={flashCardInfo}
                  flashCardList={flashCardList}
                  flashCardDoneList={flashCardDoneList}
                  setIsCompleteFC={setIsCompleteFC}
                  infoProgress={infoProgress}
                  setInfoProgress={setInfoProgress}
                  flipped={flipped}
                  setFlipped={setFlipped}
                  handleClickReset={handleClickReset}
               />
            ))}
      </div>
   );
};
