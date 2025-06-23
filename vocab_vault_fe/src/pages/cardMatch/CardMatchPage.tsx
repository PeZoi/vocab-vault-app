import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router';
import { useGetCardMatchQuery } from 'redux/api';
import { CardMatchType, VocabType } from 'types';
import { capitalizeFirstLetter, PATH_CONSTANTS } from 'utils';
import { CompleteCardMatch } from './CompleteCardMatch';
import { LearnCardMatch } from "./LearnCardMatch";

export const CardMatchPage = () => {
	const [data, setData] = useState<CardMatchType[]>([]);
	const { id } = useParams();
	const navigate = useNavigate();
	const [isComplete, setIsComplete] = useState(false);

	const { data: cardMatchData, isLoading: loading, error } = useGetCardMatchQuery({ id: id ?? '' });

	useEffect(() => {
		if (error) {
				message?.error(error as any);
				navigate(PATH_CONSTANTS.HOME);
		}
	}, [error]);

	useEffect(() => {
		if (cardMatchData) {
			let formatData: CardMatchType[] = [];
			cardMatchData?.vocabList?.forEach((item: VocabType) => {
				formatData.push({
					word: capitalizeFirstLetter(item.origin),
					idMatch: item.id
				}, {
					word: capitalizeFirstLetter(item.define),
					idMatch: item.id
				});
			});
			setData(formatData.sort(() => Math.random() - 0.5));
		}
	}, [cardMatchData])

	const countRef = useRef(0);
	
	return (
		<div className='h-full'>
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
			
			{isComplete ? <CompleteCardMatch count={countRef.current} setIsComplete={setIsComplete} /> : <LearnCardMatch
				data={data || []}
				countRef={countRef}
				setIsComplete={setIsComplete}
			/>}
		</div>
	)
}
