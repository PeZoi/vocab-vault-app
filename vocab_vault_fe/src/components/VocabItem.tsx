import { CloseOutlined, SoundFilled } from '@ant-design/icons';
import { Button, Divider, Popconfirm, Typography } from 'antd';
import { FaRegEdit } from 'react-icons/fa';
const { Paragraph } = Typography;

export const VocabItem = () => {
   return (
      <div className="bg-background border border-gray-300 rounded-md p-5 text-lg">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 font-bold">
               <span className="text-primary">Begin</span>
               <span className="text-textSecondary">/bɪˈɡɪn/</span>
               <span className="cursor-pointer hover:opacity-80 select-none">
                  <SoundFilled className="text-gray-700" />
               </span>
            </div>
            <div className="flex flex-row-reverse items-center gap-3">
               <Popconfirm
                  title="Xoá từ vựng"
                  description="Bạn có chắc xoá từ 'Begin' chứ?"
                  onConfirm={() => {}}
                  onCancel={() => {}}
                  okText="Đồng ý"
                  cancelText="Huỷ"
               >
                  <Button danger>
                     <CloseOutlined />
                  </Button>
               </Popconfirm>
               <Button>
                  <FaRegEdit />
               </Button>
            </div>
         </div>
         <p className="text-lg font-bold ">(Verb)</p>
         <p className="text-lg font-bold ">
            Định nghĩa: <span className="italic font-normal ml-1"> Bắt đầu, khởi đầu</span>
         </p>
         <Divider className="my-2" />
         <div className="text-lg mt-2">
            <p className="text-lg font-bold ">Ví dụ:</p>
            <div className="flex flex-col gap-1">
               <p className="font-bold text-textPrimary">1. The meeting will begin at 2 pm.</p>
               <p className="italic text-textSecondary">Cuộc họp sẽ bắt đầu lúc 2 giờ chiều.</p>
               <p className="font-bold text-textPrimary">2. Let's begin the game!</p>
               <p className="italic text-textSecondary">Hãy bắt đầu trò chơi!</p>
            </div>
         </div>
         <Divider className="my-2" />
         <Paragraph
            ellipsis={{
               rows: 5,
               tooltip:
                  'Từ begin có dạng quá khứ là began và quá khứ phân từ là begun. Lưu ý sự khác biệt giữa begin (bắt đầu một hành động) và start (bắt đầu một thiết bị, máy móc). Begin thường được dùng trong ngữ cảnh trang trọng hơn start.',
            }}
            className=" text-lg"
         >
            <span className="font-bold">Ghi chú:</span>
            <span className="italic ml-2">
               Từ begin có dạng quá khứ là began và quá khứ phân từ là begun. Lưu ý sự khác biệt giữa begin (bắt đầu một
               hành động) và start (bắt đầu một thiết bị, máy móc). Begin thường được dùng trong ngữ cảnh trang trọng
               hơn start.
            </span>
         </Paragraph>
      </div>
   );
};
