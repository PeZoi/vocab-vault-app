import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, Modal, Progress } from 'antd';
import { Stack } from 'collections';
import React, { useEffect, useRef, useState } from 'react';
import Confetti from "react-confetti";
import { GiChoice } from 'react-icons/gi';
import { PiCards } from 'react-icons/pi';
import { Link, useParams } from 'react-router-dom';
import { InfoProgressType, TypeOfVocab, Vocab2Type, VocabType } from 'types';
import { PATH_CONSTANTS } from 'utils';

type Props = {
	flashCardList: Stack<VocabType>,
	flashCardDoneList: Stack<Vocab2Type>,
	infoProgress: InfoProgressType

	setIsCompleteFC: (value: boolean) => void;
	setInfoProgress: (value: InfoProgressType) => void;
	handleClickReset: () => void
}

export const CompleteFlashCard: React.FC<Props> = ({flashCardList, flashCardDoneList, setIsCompleteFC, setInfoProgress, infoProgress, handleClickReset}) => {

	const {id} = useParams();
	const {current: wordListUnknow} = useRef<number>(flashCardDoneList.toArray().filter(item => item.type === TypeOfVocab.UNKNOW).length);
  const [showConfetti, setShowConfetti] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		setShowConfetti(true);
		setTimeout(() => setShowConfetti(false), 5000);
	}, [])

	const handleClickReviseUnknow =() => {
		let listUnknow = flashCardDoneList.toArray().filter(item => item.type === TypeOfVocab.UNKNOW);
		flashCardList.fromArray(listUnknow.map(item => item.vocab));
		flashCardDoneList.reset();
		setInfoProgress({ ...infoProgress, unknow: 0, know: 0, progress: 0, subTotal: listUnknow.length });
		setIsCompleteFC(false);
	}

	const handleClickBack = () => {
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
		setIsCompleteFC(false);
	}

	const handleClickRest1 = () => {
		setIsCompleteFC(false);
		handleClickReset();
	}

	return (
		<div className='w-[1024px] mx-auto'>
			{showConfetti && <Confetti gravity={0.8} className='w-full h-full' />}
			<h3 className='text-4xl font-bold mt-10 mb-24 text-center'>Chúc mừng bạn đã hoàn thành Flash Card 🎉 🎉</h3>
			<div className='flex justify-between'>

				<div className='flex flex-col'>
					<h4 className='text-xl font-bold text-[#586380] mb-5'>Tiến trình học</h4>
					<div className='flex items-center gap-10'>
						<Progress type="dashboard" percent={Math.round((infoProgress.total - wordListUnknow) / infoProgress.total * 100)} gapDegree={30} strokeWidth={12} />
						<div className='flex flex-col gap-4'>
							<div className='h-8 w-80 flex items-center justify-between rounded-2xl text-base py-2 px-4 bg-[#DEFAF0] text-[#18AE79] font-semibold'>
								<span>Đã biết:</span>
								<span>{infoProgress.total - wordListUnknow}</span>
							</div>
							<div className='h-8 w-80 flex items-center justify-between rounded-2xl text-base py-2 px-4 bg-[#FFEAD8] text-[#CC4E00] font-semibold'>
								<span>Chưa biết:</span>
								<span>{wordListUnknow}</span>
							</div>
						</div>
					</div>
				</div>

				<div className='flex flex-col'>
					<h4 className='text-xl font-bold text-[#586380] mb-5'>Bước tiếp theo</h4>
					<div className='flex flex-col gap-4'>
						<Button type="primary" className='w-[440px] h-16 round rounded-lg font-semibold text-base' onClick={() => setIsModalOpen(true)}>Hoạt động khác</Button>
						{wordListUnknow > 0 && <Button className='w-[440px] h-16 round rounded-lg font-semibold text-base' onClick={handleClickReviseUnknow}>Xem lại {wordListUnknow} từ chưa biết</Button>}
						<div className='text-center w-[440px] h-10 flex items-center justify-center' onClick={handleClickRest1}>
							<span className='mx-auto cursor-pointer font-semibold text-base hover:opacity-80'>Bắt đầu lại Flash Card</span>
						</div>
					</div>
				</div>

				
			</div>
			
			<div className='flex items-center gap-2 mt-10 font-semibold text-base cursor-pointer w-fit' onClick={handleClickBack}>
				<LeftOutlined className="size-3" />
				<span className='text-[#586380]'>Quay lại câu hỏi cuối cùng</span>
			</div>

			<Modal title="Hoạt động ôn tập khác" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
				<Divider />
				<div className='flex items-center justify-between py-10 px-10'>
					<Link to={PATH_CONSTANTS.CARD_MATCH.replace(':id', id ? id?.toString() : '0')}>
						<Button className="size-32 flex flex-col">
								<PiCards style={{ fontSize: '24px' }} />
								<p>Ghép thẻ</p>
						</Button>
					</Link>
					<Link to={PATH_CONSTANTS.MUTIPLE_CHOICE.replace(':id', id ? id?.toString() : '0')}>
						<Button className="size-32 flex flex-col">
								<GiChoice style={{ fontSize: '24px' }} />
								<p>Trắc nghiệm</p>
						</Button>
					</Link> 
				</div>
			</Modal>
		</div>
	)
}
