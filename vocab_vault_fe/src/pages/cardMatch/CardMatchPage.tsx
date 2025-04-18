import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, message } from "antd";
import { getCardMatchAPI } from 'apis/cardMatchAPI';
import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router';
import { CardMatchType } from 'types/cardMatchType';
import { VocabType } from 'types/VocabType';
import { capitalizeFirstLetter, PATH_CONSTANTS } from 'utils';
import { CompleteCardMatch } from './CompleteCardMatch';
import { LearnCardMatch } from "./LearnCardMatch";


export const CardMatchPage = () => {

	const [data, setData] = useState<CardMatchType[]>([]);
	const { id } = useParams();
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		const fetchCardMatch = async () => {
			const res = await getCardMatchAPI(id);
			if (res.status === 200) {
				let formatData: CardMatchType[] = [];
				
				res.data?.vocabList?.forEach((item: VocabType) => {
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
			if (res.status === 422) {
				message.error(res.message);
				window.location.href = PATH_CONSTANTS.DECK_DETAIL.replace(':id', id ? id.toString() : '0');
			}
		}
		if (id) {
			fetchCardMatch();
		}
	}, [id])

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
				data={data}
				countRef={countRef}
				setIsComplete={setIsComplete}
			/>}
		</div>
	)
}
