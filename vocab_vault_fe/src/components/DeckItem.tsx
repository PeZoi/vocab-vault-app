import { CopyOutlined } from '@ant-design/icons';
import { Avatar, Tooltip, Typography } from 'antd';
import { FLAG_ENGLAND_SVG } from 'assets';
import { MdOutlinePublic } from 'react-icons/md';
const { Text, Paragraph } = Typography;

export function DeckItem() {
   return (
      <div className="p-3 border rounded-md h-48 bg-background hover:-translate-y-2 hover:text-black cursor-pointer transition-all ease-linear select-none">
         <Text ellipsis={{ tooltip: 'Tiêu đề' }} className="text-lg font-bold">
            Tiêu đề
         </Text>
         <div className="flex items-center gap-2 my-1">
            <CopyOutlined />
            <span className="text-base">5 từ</span>
         </div>
         <Paragraph ellipsis={{ rows: 2, tooltip: 'Tiêu đề' }} className="italic">
            Không có mô tả
         </Paragraph>
         <div className="flex items-center gap-2">
            <span>Ngôn ngữ:</span>
            <img src={FLAG_ENGLAND_SVG} alt="flag england" className="size-6" />
         </div>
         <div className="mt-1 flex items-center gap-3">
            <Avatar
               src={'https://images-cdn.openxcell.com/wp-content/uploads/2024/07/25085005/reactjs-inner.svg'}
               size={'large'}
            />
            <div>
               <p className="text-base">Viễn Đông</p>
               <p className="flex items-center gap-1 text-textSecondary">
                  <MdOutlinePublic />
                  <Tooltip title="prompt text">
                     <span>1 ngày trước</span>
                  </Tooltip>
               </p>
            </div>
         </div>
      </div>
   );
}
