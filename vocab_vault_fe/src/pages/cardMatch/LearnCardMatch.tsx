import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ConfirmStartCardMatch } from './ConfirmStartCardMatch';

type Props = {
  data: any[];
  countRef: React.MutableRefObject<number>;
  setIsComplete: (isComplete: boolean) => void;
}

export const LearnCardMatch = ({
  data,
  countRef,
  setIsComplete,
}: Props) => {
  const [arrMatch, setArrMatch] = useState<any[]>([]);
	const [matchingCards, setMatchingCards] = useState<number[]>([]);
	const [cardClickFirst, setCardClickFirst] = useState<number | null>(null);
	const [cardClickSecond, setCardClickSecond] = useState<number | null>(null);

  const [isStart, setIsStart] = useState(false);

	const [count, setCount] = useState(0);

	useEffect(() => {
		if (cardClickFirst !== null && cardClickSecond !== null) {
			handelMatch();
		}
	}, [cardClickSecond]);

  

  useEffect(() => {
    countRef.current = 0;
    const intervalId = setInterval(() => {
      countRef.current++;
      setCount(countRef.current);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  
	const handleClickCard = (index: number) => {
		if (cardClickFirst === index) {
			setCardClickFirst(null);
			setCardClickSecond(null);
			return;
		}

		if (cardClickFirst === null) {
			setCardClickFirst(() => index);
		} else {
			setCardClickSecond(() => index);
		}
	};

	const handelMatch = () => {
		if (cardClickFirst === null || cardClickSecond === null) return;

		const isMatch = data[cardClickFirst].idMatch === data[cardClickSecond].idMatch;
		if (isMatch) {
			setMatchingCards([cardClickFirst, cardClickSecond]);

			setTimeout(() => {
				setArrMatch((prev) => [...prev, cardClickFirst, cardClickSecond]);
				setMatchingCards([]);

        if(arrMatch.length === 10) {
          setIsComplete(true);
        }
			}, 600);
		} else {
      countRef.current += 2;
      setCount(countRef.current);
    }

		setCardClickFirst(null);
		setCardClickSecond(null);
	}

  if(!isStart) {
    return <ConfirmStartCardMatch setIsStart={setIsStart} />
  }

  return (
    <>
      <div className="text-center text-lg font-bold"><span className="rounded-full bg-gray-50 ring-2 ring-[#bdbcbc] px-4 py-1">{count}s</span></div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-10 mx-4 sm:mx-10 md:mx-20 mt-8 sm:mt-12">
        {data.map((item: any, index: number) => (
          <motion.div
            key={item.word}
            className={`flex items-center justify-center rounded-md p-4 w-80 h-40 ring-2 ring-[#bdbcbc] cursor-pointer hover:border-
              ${cardClickFirst === index || cardClickSecond === index ? 'border-4 border-primary bg-primary text-white' : ''}
              ${arrMatch.includes(index) ? 'invisible' : ''}`}
            onClick={() => handleClickCard(index)}
            animate={matchingCards.includes(index) ? { scale: [1, 1.2, 0] } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-lg font-medium text-center">{item.word}</span>
          </motion.div>
        ))}
      </div>
			</>
  )
}
