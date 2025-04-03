import { Button, Divider, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import Confetti from "react-confetti";
import { PATH_CONSTANTS } from 'utils';
import { Link, useParams } from 'react-router-dom';
import { PiCards } from 'react-icons/pi';
import { GiChoice } from 'react-icons/gi';

const MESSAGES_MAP: Record<number, string[]> = {
  10: [
    "Bạn là một bậc thầy ghép thẻ! 🏆",
    "Bạn thật nhạy bén! 🚀",
    "Bạn thật tinh mắt và tài giỏi đấy! 🎯"
  ],
  30: [
    "Bạn đang có tiến bộ, tiếp tục cố gắng nhé! 💪",
    "Bạn đã đi được một chặng đường dài! 🚀"
  ],
  60: [
    "Bạn hơi chậm so với mọi người đó, hãy thử lại nào! ⏳",
    "Kiên trì là chìa khóa thành công! Hãy thử lại nào! 🔑",
    "Bạn có thể làm tốt hơn nữa! Hãy thử lại nhé! 💡"
  ]
};

type Props = {
  count: number;
  setIsComplete: (value: boolean) => void;
}

export const CompleteCardMatch: React.FC<Props> = ({count, setIsComplete}) => {

  const {id} = useParams();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [message, setMessagge] = useState('');

  useEffect(() => {
		setShowConfetti(true);
		setTimeout(() => setShowConfetti(false), 5000);

    let selectedMessages: string[] = [];

    if (count <= 10) {
      selectedMessages = MESSAGES_MAP[10];
    } else if (count <= 30) {
      selectedMessages = MESSAGES_MAP[30];
    } else {
      selectedMessages = MESSAGES_MAP[60];
    }

    if (selectedMessages.length > 0) {
      const randomMessages = selectedMessages
        .sort(() => Math.random() - 0.5);
      setMessagge(randomMessages[0]); 
    }
	}, [])

  const handleReset = () => {
    setIsComplete(false);
    count = 0;
  }
  
  return (
      <div className='w-[1024px] mx-auto'>
        {showConfetti && <Confetti gravity={0.8}  />}
        <h3 className='text-3xl font-bold mt-10 mb-10 text-center text-amber-500'>{message}</h3>
        <h3 className='text-2xl font-bold mt-10 mb-10 text-center'>Chúc mừng bạn đã hoàn thành ghép thẻ 🎉 🎉</h3>
        <p className="text-center text-xl font-semibold">Bạn đã hoàn thành trong vòng <span className='font-bold text-amber-500'>{count}</span> giây</p>
        <div className='flex items-center justify-center mt-10'>
          <div className='flex flex-col gap-4'>
            <Button type="primary" className='w-[440px] h-16 round rounded-lg font-semibold text-base' onClick={() => setIsModalOpen(true)}>Hoạt động khác</Button>
            <div className='text-center w-[440px] h-10 flex items-center justify-center' onClick={handleReset}>
              <span className='mx-auto cursor-pointer font-semibold text-base hover:opacity-80'>Bắt đầu lại ghép thẻ</span>
            </div>
          </div>
        </div>

        <Modal title="Hoạt động ôn tập khác" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
          <Divider />
          <div className='flex items-center justify-between py-10 px-10'>
            <Link to={PATH_CONSTANTS.FLASH_CARD.replace(':id', id ? id?.toString() : '0')}>
              <Button className="size-32 flex flex-col">
                  <PiCards style={{ fontSize: '24px' }} />
                  <p>Thẻ ghi nhớ</p>
              </Button>
            </Link>
            <Button className="size-32 flex flex-col">
              <GiChoice style={{ fontSize: '24px' }} />
              <p>Trắc nghiệm</p>
            </Button>
          </div>
        </Modal>
    </div>
  )
}
