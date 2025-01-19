import { CopyOutlined } from '@ant-design/icons';
import { Avatar, Tooltip, Typography } from 'antd';
import { FLAG_ENGLAND_SVG } from 'assets';
import { FaLock } from 'react-icons/fa';
import { MdOutlinePublic } from 'react-icons/md';
import { DeckResponseType } from 'types';
import { convertAroundTime, convertStringDate } from 'utils';
const { Text, Paragraph } = Typography;

type Props = {
   deck: DeckResponseType;
};

export const DeckItem: React.FC<Props> = ({ deck }) => {
   return (
      <div className="p-3 border rounded-md h-full bg-background hover:-translate-y-2 hover:text-black cursor-pointer transition-all ease-linear select-none">
         <Text ellipsis={{ tooltip: deck.title }} className="text-lg font-bold">
            {deck.title}
         </Text>
         <div className="flex items-center gap-2 my-1">
            <CopyOutlined />
            <span className="text-base">5 từ</span>
         </div>
         <Paragraph ellipsis={{ rows: 2, tooltip: deck.description }} className="italic min-h-11">
            {deck.description}
         </Paragraph>
         <div className="flex items-center gap-2">
            <span>Ngôn ngữ:</span>
            <img src={FLAG_ENGLAND_SVG} alt="flag england" className="size-6" />
         </div>
         <div className="mt-1 flex items-center gap-3">
            <Avatar src={deck.user.avatar} size={'large'} />
            <div>
               <p className="text-base">{deck.user.fullName}</p>
               <p className="flex items-center gap-1 text-textSecondary">
                  {deck.isPublic ? <MdOutlinePublic /> : <FaLock />}
                  <Tooltip title={convertStringDate(deck.createAt)}>
                     <span>{convertAroundTime(deck.createAt)}</span>
                  </Tooltip>
               </p>
            </div>
         </div>
      </div>
   );
};
