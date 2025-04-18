import { LoadingOutlined } from '@ant-design/icons';
import { Button, Divider, Progress, Tooltip, Typography } from 'antd';
import { Stack } from 'collections';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { AiFillSound } from 'react-icons/ai';
import { GrRevert } from 'react-icons/gr';
import { IoCheckmarkSharp, IoClose } from 'react-icons/io5';
import { MdOutlineShuffle } from 'react-icons/md';
import { RiResetLeftFill } from 'react-icons/ri';
import { FlashCardResponse, InfoProgressType } from 'types';
import { TypeOfVocab, Vocab2Type, VocabType } from 'types/VocabType';
import { capitalizeFirstLetter, handleClickAudio } from 'utils';
const { Text } = Typography;



type Props = {
   flashCardInfo: FlashCardResponse | null,
   flashCardList: Stack<VocabType>,
   flashCardDoneList: Stack<Vocab2Type>,
   infoProgress: InfoProgressType,
   flipped: boolean
   
   setInfoProgress: (value: InfoProgressType) => void,
   setIsCompleteFC: (value: boolean) => void,
   setFlipped: (value: boolean) => void,
   handleClickReset: () => void,
}


export const LearnFlashCard: React.FC<Props> = ({flashCardDoneList, flashCardInfo, flashCardList, setIsCompleteFC, infoProgress, setInfoProgress, setFlipped, flipped, handleClickReset}) => {
   
   const [loadingAudio, setLoadingAudio] = useState(false);
   const [_, setShuffle] = useState(false);

   const handleClickNext = (type: TypeOfVocab) => {
      if (type === TypeOfVocab.KNOW) {
         setInfoProgress({
            ...infoProgress,
            know: infoProgress.know + 1,
            progress: infoProgress.progress + 1,
         });
         const word = flashCardList.pop();
         if (word) {
            const data: Vocab2Type = { vocab: word, type: TypeOfVocab.KNOW };
            flashCardDoneList.push(data);
         }
      } else {
         setInfoProgress({ ...infoProgress, unknow: infoProgress.unknow + 1, progress: infoProgress.progress + 1 });
         const word = flashCardList.pop();
         if (word) {
            const data: Vocab2Type = { vocab: word, type: TypeOfVocab.UNKNOW };
            flashCardDoneList.push(data);
         }
      }
      if (flashCardDoneList.size() === infoProgress.subTotal) {
         setIsCompleteFC(true);
      } 
      setFlipped(false);
   };

   const handleClickUndo = () => {
      const wordUndo = flashCardDoneList.pop();
      if (wordUndo) {
         flashCardList.push(wordUndo.vocab);
         if (wordUndo.type === TypeOfVocab.KNOW) {
            setInfoProgress({
               ...infoProgress,
               know: infoProgress.know - 1,
               progress: infoProgress.progress - 1,
            });
         } else {
            setInfoProgress({ ...infoProgress, unknow: infoProgress.unknow - 1, progress: infoProgress.progress - 1 });
         }
      }
   };

   const handleClickShuffle = () => {
      flashCardList.shuffle();
      setShuffle((prev) => !prev);
   };

  return (
    <><Text ellipsis={{ tooltip: flashCardInfo?.title }} className="text-3xl font-bold px-2">
            Thẻ ghi nhớ: {flashCardInfo?.title}
         </Text>

         <div className="px-20 grid grid-cols-3 my-10">
            <div className="flex flex-col items-center justify-center col-span-2 w-full">
               <div className="relative w-[100%] h-56 perspective-1000" onClick={() => setFlipped(!flipped)}>
                  <div className="cursor-pointer">
                     <motion.div
                        className="absolute w-full h-full bg-white shadow-[0px_0px_6px_1px_rgba(0,_0,_0,_0.1)] rounded-xl flex justify-center items-center text-lg font-semibold text-gray-800 text-center"
                        animate={{ rotateY: flipped ? 180 : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ backfaceVisibility: 'hidden' }}
                     >
                        <div className="absolute top-3 right-3">
                           <div className="w-fit p-1">
                              {loadingAudio ? (
                                 <LoadingOutlined />
                              ) : (
                                 <AiFillSound
                                    className="text-gray-500 cursor-pointer"
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       handleClickAudio(flashCardList.peek()?.origin, setLoadingAudio);
                                    }}
                                 />
                              )}
                           </div>
                        </div>

                        <div>
                           <p>
                              {capitalizeFirstLetter(flashCardList.peek()?.origin)} (
                              {flashCardList.peek()?.partsOfSpeech})
                           </p>
                           <p>{flashCardList.peek()?.ipa}</p>
                        </div>
                     </motion.div>

                     <motion.div
                        className="absolute w-full h-full bg-blue-500 shadow-[0px_0px_6px_1px_rgba(0,_0,_0,_0.1)] rounded-xl flex justify-center items-center font-semibold text-white px-3 overflow-auto text-lg"
                        animate={{ rotateY: flipped ? 0 : -180 }}
                        transition={{ duration: 0.5 }}
                        style={{ backfaceVisibility: 'hidden' }}
                     >
                        <div className="text-center">
                           <p>{capitalizeFirstLetter(flashCardList.peek()?.define)}</p>
                           {flashCardList.peek()?.examples?.length &&
                              flashCardList
                                 .peek()
                                 ?.examples?.slice(0, 2)
                                 ?.map((example, index) => (
                                    <>
                                       <p>
                                          {index + 1}. {example.en}
                                       </p>
                                       <p className="italic">{example.vi}</p>
                                    </>
                                 ))}
                        </div>
                     </motion.div>
                  </div>
               </div>
               <div className="my-10 flex items-center justify-between gap-10">
                  <Tooltip title="Đang học">
                     <div
                        className="text-red-600 bg-red-100 border-2 border-red-500 text-3xl px-8 py-2 rounded-full cursor-pointer  transition-all hover:opacity-80"
                        onClick={() => handleClickNext(TypeOfVocab.UNKNOW)}
                     >
                        <IoClose />
                     </div>
                  </Tooltip>
                  <Tooltip title="Đã biết">
                     <div
                        className="text-green-600 bg-green-100 border-2 border-green-500 text-3xl px-8 py-2 rounded-full cursor-pointer  transition-all hover:opacity-80"
                        onClick={() => handleClickNext(TypeOfVocab.KNOW)}
                     >
                        <IoCheckmarkSharp />
                     </div>
                  </Tooltip>
               </div>
            </div>
            <div className="border border-gray-200 rounded-lg ml-20 p-5 col-span-1 w-[300px] h-fit">
               <p className="text-center uppercase font-bold text-lg">Thông tin</p>
               <Divider className="my-2" />
               <div className="flex items-center justify-between text-sm font-medium mt-5">
                  <p className="text-orange-500 flex items-center gap-2">
                     Chưa biết:{' '}
                     <span className="font-bold px-2 rounded-xl border border-orange-500">{infoProgress?.unknow}</span>
                  </p>
                  <p className="text-green-600">
                     Đã biết:{' '}
                     <span className="font-bold px-2 rounded-xl border border-green-600">{infoProgress?.know}</span>
                  </p>
               </div>
               <div className="mt-4">
                  <Progress
                     percent={(infoProgress.progress / (infoProgress.subTotal || 1)) * 100}
                     type="line"
                     format={() => `${infoProgress.progress} / ${infoProgress.subTotal}`}
                  />
               </div>
               <Divider />
               <div className="mt-4 flex items-center justify-center gap-3">
                  <Tooltip title="Đặt lại">
                     <Button className="rounded-full " onClick={handleClickReset}>
                        <RiResetLeftFill />
                     </Button>
                  </Tooltip>
                  <Tooltip title="Hoàn tác">
                     <Button
                        className="rounded-full"
                        onClick={handleClickUndo}
                        disabled={flashCardDoneList.peek() ? false : true}
                     >
                        <GrRevert />
                     </Button>
                  </Tooltip>
                  <Tooltip title="Trộn thẻ">
                     <Button className="rounded-full" onClick={handleClickShuffle}>
                        <MdOutlineShuffle />
                     </Button>
                  </Tooltip>
               </div>
            </div>
         </div></>
  )
}
