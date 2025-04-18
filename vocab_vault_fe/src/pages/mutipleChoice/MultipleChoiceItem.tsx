import { AnswerType, MultipleChoiceType, ResultAnswerType } from "types";
import { capitalizeFirstLetter } from "utils";

type Props = {
  question: MultipleChoiceType,
  index: number,
  totalLength: number,
  selectAnswers: ResultAnswerType[],
  results?: ResultAnswerType[],
  type: 'LEARN' | 'RESULT',

  setSelectAnswers?: (data: any) => void;
}

export const MultipleChoiceItem: React.FC<Props> = ({ question, index, totalLength, selectAnswers, type, results, setSelectAnswers }) => {

  const handleClickAnswer = (answerId: number) => {
    const formatSelectAnswers = selectAnswers.map((selectAnswer: ResultAnswerType) => {
      if (selectAnswer.questionId === question?.id) {
        return {
          questionId: question?.id,
          answerId: answerId
        }
      }
      return selectAnswer;
    })
    if (setSelectAnswers) setSelectAnswers(formatSelectAnswers);
  }

  return (
    <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-[776px] min-h-[468px] rounded-3xl p-10 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <span className="font-semibold text-lg text-gray-700">Thuật ngữ</span>
          <span className="text-base text-gray-500">{index + 1}/{totalLength}</span>
        </div>
        <p className="text-3xl font-semibold w-full">{capitalizeFirstLetter(question?.term)}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {question?.answers?.map((answer: AnswerType) => {
          const selectedAnswerId = selectAnswers?.find(
            (item: ResultAnswerType) => item?.questionId === question?.id
          )?.answerId;

          const correctAnswerId = results?.find(
            (item: ResultAnswerType) => item?.questionId === question?.id
          )?.answerId;

          return (<div key={answer?.id} className={`p-4 font-normal text-lg rounded-xl border border-gray-200 ${type === "LEARN" && 'cursor-pointer hover:border-primary'}  transition-all ${type === "LEARN" && selectedAnswerId === answer?.id && 'border-primary bg-primary text-white'} ${type === "RESULT" && correctAnswerId === answer?.id && 'border-green-700 bg-green-600 text-white'} ${type === "RESULT" && selectedAnswerId !== correctAnswerId && selectedAnswerId === answer?.id && 'border-red-700 bg-red-600 text-white'}`} onClick={() => handleClickAnswer(answer?.id)}>{answer?.answer}</div>)
        })}
      </div>
    </div>
  )
}
