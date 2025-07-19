import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router';
import { useGetCardMatchQuery } from 'redux/api';
import { PATH_CONSTANTS } from 'utils';
import { CompleteCardMatch } from './CompleteCardMatch';
import { LearnCardMatch } from "./LearnCardMatch";

export const CardMatchPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isComplete, setIsComplete] = useState(false);

	const { data: cardMatchData, isLoading: loading, error, refetch } = useGetCardMatchQuery(
		{ id: id ?? '' },
		{ refetchOnMountOrArgChange: true }
	);

	useEffect(() => {
		if (error) {
				message?.error(error as any);
				navigate(PATH_CONSTANTS.HOME);
		}
	}, [error]);

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
			
			{isComplete ? <CompleteCardMatch count={countRef.current} setIsComplete={setIsComplete} refetch={refetch} /> : <LearnCardMatch
				data={cardMatchData || null}
				countRef={countRef}
				setIsComplete={setIsComplete}
			/>}
		</div>
	)
}
