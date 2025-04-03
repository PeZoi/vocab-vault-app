import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider } from "antd";
import { useRef, useState } from "react";
import { LearnCardMatch } from "./LearnCardMatch";
import { CompleteCardMatch } from './CompleteCardMatch';


const dataCard = [
	{
		word: "Apple",
		id_match: 1,
	},
	{
		word: "Quả táo",
		id_match: 1,
	},
	{
		word: "Orange",
		id_match: 2,
	},
	{
		word: "Quả cam",
		id_match: 2,
	},
	{
		word: "Banana",
		id_match: 3,
	},
	{
		word: "Quả chuối",
		id_match: 3,
	},
	{
		word: "Grape",
		id_match: 4,
	},
	{
		word: "Quả nho",
		id_match: 4,
	},
	{
		word: "Strawberry",
		id_match: 5,
	},
	{
		word: "Quả dâu",
		id_match: 5,
	},
	{
		word: "Watermelon",
		id_match: 6,
	},
	{
		word: "Quả dưa hấu",
		id_match: 6,
	},
]

export const CardMatchPage = () => {

	const [data, setData] = useState<any[]>(dataCard.sort(() => Math.random() - 0.5));
	const [isComplete, setIsComplete] = useState(false);

	const countRef = useRef(0);
	
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
			
			{isComplete ? <CompleteCardMatch count={countRef.current} setIsComplete={setIsComplete} /> : <LearnCardMatch
				data={data}
				countRef={countRef}
				setIsComplete={setIsComplete}
			/>}
		</div>
	)
}
