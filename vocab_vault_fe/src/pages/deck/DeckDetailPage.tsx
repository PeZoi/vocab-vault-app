import { DeleteOutlined, EditOutlined, LeftOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Popconfirm, Switch, Tooltip, Typography } from 'antd';
import { FLAG_ENGLAND_SVG } from 'assets';
import { VocabItem } from 'components';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { GiChoice } from 'react-icons/gi';
import { MdOutlinePublic } from 'react-icons/md';
import { PiCards, PiCardsThree } from 'react-icons/pi';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { PATH_CONSTANTS } from 'utils';
import { VocabFormModal } from './components';
const { Text, Paragraph } = Typography;

export const DeckDetailPage = () => {
   const { id } = useParams();
   const [open, setOpen] = useState(false);

   const showModal = () => {
      setOpen(true);
   };
   return (
      <div>
         <Link
            to={PATH_CONSTANTS.DECKS}
            className="flex items-center gap-1 w-fit cursor-pointer hover:underline transition-all group "
         >
            <LeftOutlined className="size-3 group-hover:-translate-x-1 transition-all" />
            <span>Quay lại</span>
         </Link>

         <Divider />

         <div className="flex flex-col gap-2">
            <div className="flex justify-between">
               <Text ellipsis={{ tooltip: 'Tiêu đề' }} className="text-3xl font-bold">
                  Bộ từ vựng: TOEIC 600+
               </Text>
               <div className="flex gap-4">
                  <Button>
                     <EditOutlined />
                  </Button>

                  <Popconfirm
                     title="Xoá bộ từ vựng"
                     description="Bạn có chắc xoá bộ từ vựng 'TOEIC 600+' chứ?"
                     onConfirm={() => {}}
                     onCancel={() => {}}
                     okText="Đồng ý"
                     cancelText="Huỷ"
                  >
                     <Button danger>
                        <DeleteOutlined />
                     </Button>
                  </Popconfirm>
               </div>
            </div>
            <Paragraph ellipsis={{ rows: 3, tooltip: 'Tiêu đề' }} className="italic">
               Không có mô tả
            </Paragraph>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <span>Ngôn ngữ:</span>
                  <img src={FLAG_ENGLAND_SVG} alt="flag england" className="size-6" />
               </div>
               <div className="flex gap-3">
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
         </div>

         <Divider />

         <div className="my-2 grid grid-cols-2">
            <div>
               <h4 className="mb-5 text-2xl font-bold">Hành động</h4>
               <div className="flex items-center gap-5">
                  <Button className="size-32 flex flex-col" onClick={showModal}>
                     <PlusCircleOutlined style={{ fontSize: '24px' }} />
                     <p>Thêm từ vựng</p>
                  </Button>
                  <Button className="size-32 flex flex-col">
                     <FaRegEdit style={{ fontSize: '24px' }} />
                     <p>Chỉnh sửa</p>
                  </Button>
               </div>
            </div>
            <div>
               <h4 className="mb-5 text-2xl font-bold">Luyện tập</h4>
               <div className="flex items-center gap-5">
                  <Button className="size-32 flex flex-col">
                     <PiCardsThree style={{ fontSize: '24px' }} />
                     <p>Thẻ ghi nhớ</p>
                  </Button>
                  <Button className="size-32 flex flex-col">
                     <PiCards style={{ fontSize: '24px' }} />
                     <p>Ghép thẻ</p>
                  </Button>
                  <Button className="size-32 flex flex-col">
                     <GiChoice style={{ fontSize: '24px' }} />
                     <p>Trắc nghiệm</p>
                  </Button>
               </div>
            </div>
         </div>

         <Divider />

         <div>
            <h4 className="mb-5 text-2xl font-bold">Các từ vựng có trong bộ đề</h4>
            <Switch checkedChildren="Chi tiết" unCheckedChildren="Rút gọn" defaultChecked />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 my-5">
               {Array(10)
                  .fill(false)
                  .map((_, index) => (
                     <VocabItem key={index} />
                  ))}
            </div>
         </div>

         <VocabFormModal open={open} setOpen={setOpen} />
      </div>
   );
};
