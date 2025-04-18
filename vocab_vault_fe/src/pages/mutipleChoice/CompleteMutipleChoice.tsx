import { Button, Divider, FloatButton, Modal, Progress } from 'antd';
import { AnimatePresence, motion } from "framer-motion";
import { useScrollPosition } from 'hooks';
import React, { useEffect, useState } from 'react';
import Confetti from "react-confetti";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { BiSolidArrowToTop } from 'react-icons/bi';
import { PiCards } from 'react-icons/pi';
import { Link, useParams } from 'react-router-dom';
import { MultipleChoiceType, ResultAnswerType } from 'types';
import { PATH_CONSTANTS } from 'utils';
import { MultipleChoiceItem } from './MultipleChoiceItem';

type Props = {
  selectAnswers: ResultAnswerType[],
  questions: MultipleChoiceType[],
  results: ResultAnswerType[],

  handleReset: () => void
}

type InfoResultMultipleChoice = {
  correctCount: number,
  incorrectCount: number,
  progress: number,
}

export const CompleteMutipleChoice: React.FC<Props> = ({handleReset, questions, selectAnswers, results}) => {
  const {id} = useParams();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infoResult, setInfoResult] = useState<InfoResultMultipleChoice | null>(null);
  const [isHiddenQuestionList, setIsHiddenQuestionList] = useState(true);
  const scrollY = useScrollPosition();

  useEffect(() => {
    setShowConfetti(true);
		setTimeout(() => setShowConfetti(false), 5000);
    handleScrollToTop();
    handleCalculateInfoResult();
  }, [])

  const handleScrollToTop = (isSmooth: boolean = false) => {
    window.scrollTo({ top: 0, behavior: isSmooth ? "smooth" : "auto" });
  }

  const handleCalculateInfoResult = () => {
    let correctCount = 0;
    let incorrectCount = 0;

    selectAnswers.forEach((answer: ResultAnswerType) => {
      const result = results.find((result: ResultAnswerType) => result.questionId === answer.questionId);
      if (result?.answerId === answer.answerId) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    setInfoResult({
      correctCount,
      incorrectCount,
      progress: (correctCount / (correctCount + incorrectCount)) * 100
    })
  }

  const handleClickQuestion = (index: number) => {
    const question = document.getElementById(`question-${index}`);
    if (question) {
      question.scrollIntoView({ behavior: 'smooth', block: "center" });
    }
  }

  return (
    <AnimatePresence>
        <div className='w-[1024px] mx-auto'>
        {showConfetti && <Confetti gravity={0.8} className='w-full h-screen' />}
          <h3 className='text-4xl font-bold mt-10 mb-24 text-center'>Chúc mừng bạn đã hoàn thành bài trắc nghiệm 🎉 🎉</h3>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <h4 className='text-xl font-bold text-[#586380] mb-5'>Kết quả bài kiểm tra</h4>
              <div className='flex items-center gap-10'>
                <Progress type="dashboard" percent={Math.round(infoResult?.progress || 0)} gapDegree={30} strokeWidth={12} />
                <div className='flex flex-col gap-4'>
                  <div className='h-8 w-80 flex items-center justify-between rounded-2xl text-base py-2 px-4 bg-[#DEFAF0] text-[#18AE79] font-semibold'>
                    <span>Đúng:</span>
                    <span>{infoResult?.correctCount}</span>
                  </div>
                  <div className='h-8 w-80 flex items-center justify-between rounded-2xl text-base py-2 px-4 bg-[#FFEAD8] text-[#CC4E00] font-semibold'>
                    <span>Sai:</span>
                    <span>{infoResult?.incorrectCount}</span>
                  </div>
                </div>
              </div>
            </div>
    
            <div className='flex flex-col'>
              <h4 className='text-xl font-bold text-[#586380] mb-5'>Bước tiếp theo</h4>
              <div className='flex flex-col gap-4'>
                <Button type="primary" className='w-[440px] h-16 round rounded-lg font-semibold text-base' onClick={() => setIsModalOpen(true)}>Hoạt động khác</Button>
                <div className='text-center w-[440px] h-10 flex items-center justify-center' onClick={handleReset}>
                  <span className='mx-auto cursor-pointer font-semibold text-base hover:opacity-80'>Bắt đầu lại bài trắc nghiệm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <Divider className='my-20' />
  
        <div className="flex relative mx-20">
          <div className='min-w-[10px]'>
            <div className="sticky top-5 w-fit">
              <Button className="round-full" onClick={() => setIsHiddenQuestionList(!isHiddenQuestionList)}>{isHiddenQuestionList ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}</Button>
                {
                  isHiddenQuestionList ? (
                    <motion.div initial={{ transform: 'translateX(-10%)', opacity: 0 }} animate={{ transform: 'translateX(0)', opacity: 1 }} exit={{ transform: 'translateX(-10%)', opacity: 0 }}  className="border border-gray-200 rounded-lg p-5 col-span-1 h-fit mt-5">
                      <p className="text-center uppercase font-bold text-lg">Danh sách câu hỏi</p>
                      <Divider className="my-2" />
                      <div className="grid gap-3 grid-cols-5" >
                        {selectAnswers.map((question: ResultAnswerType, index: number) => { 
                          const correctAnswerId = results?.find(
                            (item: ResultAnswerType) => item?.questionId === question?.questionId
                          )?.answerId;
                          return (
                            <Button key={index} onClick={() => handleClickQuestion(index)} className={`cursor-pointer ${question.answerId === correctAnswerId ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`}>{index + 1}</Button>
                          )
                        })}
                      </div>
                    </motion.div>
                  ) : null
                }
            </div>
          </div>
  
          <div className="flex-1">
            <div className="flex flex-col justify-center items-center gap-10">
              {questions?.map((question: MultipleChoiceType, index: number) => <div id={`question-${index}`} key={`question-${index}`}><MultipleChoiceItem question={question} index={index} totalLength={questions?.length} selectAnswers={selectAnswers} results={results} type='RESULT' /></div>)}
            </div>
          </div>
        </div>

        {
          scrollY > 700 && (
            <FloatButton onClick={() => handleScrollToTop(true)} icon={<BiSolidArrowToTop size={18} />} />
          )
        }
  
  			<Modal title="Hoạt động ôn tập khác" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
  				<Divider  />
  				<div className='flex items-center justify-between py-10 px-10'>
            <Link to={PATH_CONSTANTS.FLASH_CARD.replace(':id', id ? id?.toString() : '0')}>
              <Button className="size-32 flex flex-col">
                  <PiCards style={{ fontSize: '24px' }} />
                  <p>Thẻ ghi nhớ</p>
              </Button>
            </Link>
  					<Link to={PATH_CONSTANTS.CARD_MATCH.replace(':id', id ? id?.toString() : '0')}>
  						<Button className="size-32 flex flex-col">
  								<PiCards style={{ fontSize: '24px' }} />
  								<p>Ghép thẻ</p>
  						</Button>
  					</Link>
  				</div>
  			</Modal>
    </AnimatePresence>
  )
}
