import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, InputNumber, message, Modal } from "antd";
import { getMultipleChoiceAPI, getResultMultipleChoiceAPI, getVocabTotalByDeckIdAPI, isUnlockMultipleChoiceAPI } from 'apis';
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { IoWarningOutline } from 'react-icons/io5';
import { useNavigate, useParams } from "react-router";
import { MultipleChoiceType, ResultAnswerType } from "types";
import { PATH_CONSTANTS } from 'utils';
import { CompleteMutipleChoice } from './CompleteMutipleChoice';
import { MultipleChoiceItem } from "./MultipleChoiceItem";

export const MultipleChoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectAnswers, setSelectAnswers] = useState<ResultAnswerType[]>([]);
  const [questions, setQuestions] = useState<MultipleChoiceType[]>([]);
  const [results, setResults] = useState<ResultAnswerType[]>([]);
  const [isModalOpen] = useState(true);
  const [isModalConfirmSubmitOpen, setIsModalConfirmSubmitOpen] = useState(false);
  const [isAllDoneAnswers, setIsAllDoneAnswers] = useState(false);
  const [confirmMultipleChoice, setConfirmMultipleChoice] = useState(false);
  const [isHiddenQuestionList, setIsHiddenQuestionList] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [totalQuestion, setTotalQuestion] = useState(20);
  const [selectNumberQuestion, setSelectNumberQuestion] = useState(0);

  useEffect(() => {
    const fetchCheckIsUnlock = async () => {
      const res = await isUnlockMultipleChoiceAPI(id);
      if (res.status === 200 && res.data === false) {
        window.location.href = PATH_CONSTANTS.DECK_DETAIL.replace(':id', id ? id.toString() : '0');
      }
    };

    const fetchGetVocabTotal = async () => {
      const res = await getVocabTotalByDeckIdAPI(id);
      if (res.status === 200) {
        setTotalQuestion(res.data);
        if (res.data < 20) {
          setSelectNumberQuestion(res.data);
        }
      }
    }

    if (id) {
      fetchCheckIsUnlock();
      fetchGetVocabTotal();
    }
  }, [id]);

  useEffect(() => {
    if(questions.length > 0) {
      initMyAnswers();
    }
  }, [questions])

  useEffect(() => {
    const isAllDoneAnswers = selectAnswers.every((answer: ResultAnswerType) => answer.answerId !== null);
    setIsAllDoneAnswers(isAllDoneAnswers);
  }, [selectAnswers])

  const fetchMultipleChoice = useCallback(async () => {
    const res = await getMultipleChoiceAPI(id, selectNumberQuestion);
    if (res.status === 200) {
      setQuestions(res.data);
    }
    if (res.status === 422) {
      message.error(res.message);
      navigate(PATH_CONSTANTS.DECK_DETAIL.replace(':id', id ? id?.toString() : '0'), {replace: true} );
    }
  }, [id, selectNumberQuestion])

  const initMyAnswers = () => {
    const myAnswers: ResultAnswerType[] = questions.map((data: MultipleChoiceType) => ({
      questionId: data.id,
      answerId: null
    }))

    setSelectAnswers(myAnswers);
  }

  const handleBack = () => {
    window.history.back();
  }

  const handleClickQuestion = (index: number) => {
    const question = document.getElementById(`question-${index}`);
    if (question) {
      question.scrollIntoView({ behavior: 'smooth', block: "center" });
    }
  }

  const handleSubmit = async () => {
    const res = await getResultMultipleChoiceAPI(questions.map((question: MultipleChoiceType) => question.id));
    if (res.status === 200) {
      setResults(res.data);
      setIsComplete(true);
    } else {
      message.error(res.message);
    }
  }

  const handleReset = () => {
    initMyAnswers();
    setIsModalConfirmSubmitOpen(false);
    setIsAllDoneAnswers(false);
    setConfirmMultipleChoice(false);
    setIsComplete(false);
  }

  const handleClickStart = () => {
    fetchMultipleChoice();
    setConfirmMultipleChoice(true);
  }

  const handleOnChangeNumberQuestion = (value: number | null) => {
    if (value === null || value > totalQuestion) {
      setSelectNumberQuestion(totalQuestion);
    } else {
      setSelectNumberQuestion(value);
    }
  }


  if (!confirmMultipleChoice) {
    return (<Modal title="Cấu hình bài trắc nghiệm" open={isModalOpen} onCancel={handleBack} footer={null}>
      <div className="flex items-center justify-between mt-5">
        <span className="text-base">Tổng số câu hỏi: </span>
        <div className='flex flex-col items-center'>
          <InputNumber min={1} max={totalQuestion} value={selectNumberQuestion} onChange={(value: number | null) => handleOnChangeNumberQuestion(value)} />
        <span className='text-xs text-gray-600 mt-1'>(Tối đa {totalQuestion} câu)</span>
      </div>
      </div>
      
      <Divider />
      <div className="flex flex-row-reverse gap-3">
        <Button className="px-2 py-1 font-medium bg-primary text-white" onClick={handleClickStart}>Bắt đầu</Button>
        <Button className="px-2 py-1 font-medium" onClick={handleBack}>Hủy</Button>
      </div>
			</Modal>)
  }

  if (isComplete) {
    return <CompleteMutipleChoice handleReset={handleReset} selectAnswers={selectAnswers} questions={questions} results={results} />
  }

  return (
    <AnimatePresence>
      <Button
        className="flex items-center gap-1 w-fit cursor-pointer hover:underline transition-all group border-none"
        onClick={handleBack}
      >
        <LeftOutlined className="size-3 group-hover:-translate-x-1 transition-all" />
        <span>Quay lại</span>
      </Button>

      <Divider />

      <div className="flex relative ">
        <div className='min-w-[10px]'>
          <div className="sticky top-5 w-fit">
            <Button className="round-full" onClick={() => setIsHiddenQuestionList(!isHiddenQuestionList)}>{isHiddenQuestionList ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}</Button>
              {
                isHiddenQuestionList ? (
                  <motion.div initial={{ transform: 'translateX(-10%)', opacity: 0 }} animate={{ transform: 'translateX(0)', opacity: 1 }} exit={{ transform: 'translateX(-10%)', opacity: 0 }}  className="border border-gray-200 rounded-lg p-5 col-span-1 h-fit mt-5">
                    <p className="text-center uppercase font-bold text-lg">Danh sách câu hỏi</p>
                    <Divider className="my-2" />
                    <div className="grid gap-3 grid-cols-5" >
                      {selectAnswers.map((question: ResultAnswerType, index: number) => (
                        <Button key={index} onClick={() => handleClickQuestion(index)} className={`cursor-pointer ${question.answerId ? 'bg-primary text-white' : ''}`}>{index + 1}</Button>
                      ))}
                    </div>
                  </motion.div>
                ) : null
              }
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col justify-center items-center gap-10">
            {questions?.map((question: MultipleChoiceType, index: number) => <div id={`question-${index}`} key={`question-${index}`}><MultipleChoiceItem question={question} index={index} totalLength={questions?.length} setSelectAnswers={setSelectAnswers} selectAnswers={selectAnswers} type='LEARN' /></div>)}
          </div>
    
          <div className="flex flex-col gap-7 my-10">
            <img src="https://assets.quizlet.com/_next/static/media/practice_test_icon.6198499f.svg" className="mx-auto" alt="" />
            <p className="text-center font-semibold text-3xl">Bạn có chắc chắn nộp bài chứ?</p>
            <Button type="primary" className="w-fit rounded-full px-7 py-6 text-white font-semibold text-lg mx-auto" onClick={() => {!isAllDoneAnswers ? setIsModalConfirmSubmitOpen(true) : handleSubmit()}}>Nộp bài</Button>
          </div>
        </div>

      </div>

      <Modal open={isModalConfirmSubmitOpen} onOk={handleSubmit} onCancel={() => setIsModalConfirmSubmitOpen(false)} okText="Nộp bài" cancelText="Xem lại" width={800}>
        <div className="flex flex-col gap-5 px-5 pt-5">
          <IoWarningOutline className="text-6xl mx-auto text-amber-500" />
          <p className="text-center font-semibold text-3xl">Có vẻ như bạn đã bỏ qua một số câu hỏi?</p>
          <p className="text-center text-lg">Bạn muốn xem lại các câu hỏi đã bỏ qua hay nộp bài kiểm tra ngay bây giờ?</p>
          <Divider/>
        </div>
      </Modal>
    </AnimatePresence>
  )
}
