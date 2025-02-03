import { CopyOutlined, DeleteOutlined, EditOutlined, LeftOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Empty, Popconfirm, Switch, Tooltip, Typography } from 'antd';
import { deleteDeckByIdAPI, getDeckByIdAPI } from 'apis';
import { FLAG_ENGLAND_SVG } from 'assets';
import { VocabItem } from 'components';
import { useMessage } from 'hooks';
import { useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { GiChoice } from 'react-icons/gi';
import { MdOutlinePublic } from 'react-icons/md';
import { PiCards, PiCardsThree } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { DeckResponseType } from 'types';
import { convertAroundTime, convertStringDate, PATH_CONSTANTS } from 'utils';
import { DeckFormModal, VocabFormModal } from './components';
const { Text, Paragraph } = Typography;

export const DeckDetailPage = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const message = useMessage();
   const { user } = useSelector((state: any) => state.auth);
   const [openVocabModal, setOpenVocabModal] = useState(false);
   const [openDeckModal, setOpenDeckModal] = useState(false);
   const [deck, setDeck] = useState<DeckResponseType>();
   const [rerender, setRerender] = useState(false);

   useEffect(() => {
      const fetchDeck = async () => {
         const res = await getDeckByIdAPI(id);
         if (res.status === 200) {
            setDeck(res.data);
         }
      };
      if (id) {
         fetchDeck();
      }
   }, [id, rerender]);

   const handleDelete = async () => {
      const res = await deleteDeckByIdAPI(id);
      if (res.status === 200) {
         message?.success(res.data);
         navigate(PATH_CONSTANTS.DECKS);
      } else {
         message?.error(res.data);
      }
   };

   const EmptyVocab = () => {
      return (
         <div className="my-20 mx-auto">
            <Empty description={<Typography.Text>Bạn chưa có từ vựng nào</Typography.Text>}>
               <Button type="primary" onClick={() => setOpenVocabModal(true)}>
                  Tạo ngay
               </Button>
            </Empty>
         </div>
      );
   };

   if (!deck) {
      return <></>;
   }

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

         <div className="flex flex-col gap-2">
            <div className="flex justify-between">
               <Text ellipsis={{ tooltip: deck?.title }} className="text-3xl font-bold">
                  Bộ từ vựng: {deck?.title}
               </Text>
               {deck?.user?.id == user?.id && (
                  <div className="flex gap-4">
                     <Button onClick={() => setOpenDeckModal(true)}>
                        <EditOutlined />
                     </Button>

                     <Popconfirm
                        title="Xoá bộ từ vựng"
                        description={`Bạn có chắc xoá bộ từ vựng '${deck?.title}' chứ?`}
                        onConfirm={handleDelete}
                        onCancel={() => {}}
                        okText="Đồng ý"
                        cancelText="Huỷ"
                     >
                        <Button danger>
                           <DeleteOutlined />
                        </Button>
                     </Popconfirm>
                  </div>
               )}
            </div>
            <Paragraph ellipsis={{ rows: 3, tooltip: deck?.description }} className="italic">
               {deck?.description?.trim() || 'Không có mô tả'}
            </Paragraph>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2 my-1">
                     <CopyOutlined />
                     <span className="text-base">{deck.vocabList?.length} từ</span>
                  </div>
                  <span>|</span>
                  <div className="flex items-center gap-2">
                     <span>Ngôn ngữ:</span>
                     <img src={FLAG_ENGLAND_SVG} alt="flag england" className="size-6" />
                  </div>
               </div>
               <div className="flex gap-3">
                  <Avatar src={deck?.user?.avatar} size={'large'} />
                  <div>
                     <p className="text-base">{deck?.user?.fullName}</p>
                     <p className="flex items-center gap-1 text-textSecondary">
                        {deck?.isPublic ? <MdOutlinePublic /> : <FaLock />}
                        <Tooltip title={convertStringDate(deck?.createAt)}>
                           <span>{convertAroundTime(deck?.createAt)}</span>
                        </Tooltip>
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <Divider />

         {(deck.user.id != user?.id && deck.vocabList.length !== 0) || deck.user.id == user?.id ? (
            <>
               <div className="my-2 grid grid-cols-2">
                  {deck?.user?.id == user?.id && (
                     <div>
                        <h4 className="mb-5 text-2xl font-bold">Hành động</h4>
                        <div className="flex items-center gap-5">
                           <Button className="size-32 flex flex-col" onClick={() => setOpenVocabModal(true)}>
                              <PlusCircleOutlined style={{ fontSize: '24px' }} />
                              <p>Thêm từ vựng</p>
                           </Button>
                        </div>
                     </div>
                  )}
                  {deck.vocabList.length > 0 && (
                     <div>
                        <h4 className="mb-5 text-2xl font-bold">Luyện tập</h4>
                        <div className="flex items-center gap-5">
                           <Link to={PATH_CONSTANTS.FLASH_CARD.replace(':id', deck.id ? deck.id?.toString() : '0')}>
                              <Button className="size-32 flex flex-col">
                                 <PiCardsThree style={{ fontSize: '24px' }} />
                                 <p>Thẻ ghi nhớ</p>
                              </Button>
                           </Link>
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
                  )}
               </div>

               <Divider />

               <div>
                  <h4 className="mb-5 text-2xl font-bold">Các từ vựng có trong bộ đề</h4>
                  {deck.vocabList.length > 0 ? (
                     <>
                        <Switch checkedChildren="Chi tiết" unCheckedChildren="Rút gọn" defaultChecked />
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 my-5">
                           {deck.vocabList.map((vocab) => (
                              <VocabItem key={vocab.id} vocab={vocab} rerender={rerender} setRerender={setRerender} />
                           ))}
                        </div>
                     </>
                  ) : (
                     <EmptyVocab />
                  )}
               </div>
            </>
         ) : (
            <div className="my-20 mx-auto">
               <Empty description={<Typography.Text>Bộ đề chưa có từ vựng nào</Typography.Text>}></Empty>
            </div>
         )}

         <VocabFormModal
            open={openVocabModal}
            setOpen={setOpenVocabModal}
            deckId={id}
            rerender={rerender}
            setRerender={setRerender}
         />
         <DeckFormModal
            open={openDeckModal}
            setOpen={setOpenDeckModal}
            rerender={rerender}
            setRerender={setRerender}
            isEdit={true}
            deck={deck}
         />
      </div>
   );
};
