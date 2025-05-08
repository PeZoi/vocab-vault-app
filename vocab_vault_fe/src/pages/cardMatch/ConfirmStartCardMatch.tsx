import { Button } from 'antd'

type Props = {
  setIsStart: (isStart: boolean) => void;
}

export const ConfirmStartCardMatch = ({ setIsStart }: Props) => {
  return (
    <div className='flex justify-center items-center flex-col gap-10 mt-32'>
      <img src="https://assets.quizlet.com/_next/static/media/match_hero.7d212a62.png" alt="" />
      <p className="text-3xl font-bold">Bạn sẵn sàng chưa?</p>
      <p className='max-w-[327px] text-center text-base'>Ghép thuật ngữ với định nghĩa của chúng nhanh nhất có thể. Cẩn thận! Ghép sai sẽ tốn thêm thời gian!</p>
      <Button type="primary" className='w-[380px] h-16 round rounded-lg font-semibold text-base' onClick={() => setIsStart(true)}>Bắt đầu</Button>
    </div>
  )
}
