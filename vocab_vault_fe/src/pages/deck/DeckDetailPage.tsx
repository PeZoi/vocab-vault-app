import { CopyOutlined, DeleteOutlined, EditOutlined, LeftOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Empty, Input, message, Popconfirm, Switch, Tooltip, Typography } from 'antd';
import { FLAG_ENGLAND_SVG } from 'assets';
import { VocabItem } from 'components';
import { useSEO } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { GiChoice } from 'react-icons/gi';
import { MdOutlinePublic } from 'react-icons/md';
import { PiCards, PiCardsThree } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useIsUnlockCardMatchQuery } from 'redux/api/cardMatchApi';
import { useDeleteDeckMutation, useGetDeckByIdQuery } from 'redux/api/deckApi';
import { useIsUnlockMultipleChoiceQuery } from 'redux/api/multipleChoiceApi';
import { convertAroundTime, convertStringDate, PATH_CONSTANTS, generateEducationalContentStructuredData, generateBreadcrumbStructuredData } from 'utils';
import { DeckDetailLoading, DeckFormModal, VocabFormModal } from './components';
const { Text, Paragraph } = Typography;

export const DeckDetailPage = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const { user } = useSelector((state: any) => state.auth);
   const [openVocabModal, setOpenVocabModal] = useState(false);
   const [openDeckModal, setOpenDeckModal] = useState(false);
   const [isShorten, setIsShorten] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');

   const { data: deck, isLoading: deckLoading, error: deckError, refetch: refetchGetDeckById } = useGetDeckByIdQuery(id ?? '');
   const { data: isUnlockCardMatch, isLoading: cardMatchLoading, refetch: refetchUnlockCardMatch } = useIsUnlockCardMatchQuery(id ?? '');
   const { data: isUnlockMultipleChoice, isLoading: multipleChoiceLoading, refetch: refetchUnlockMutipleChoice} = useIsUnlockMultipleChoiceQuery(id ?? '');
   const [deleteDeck] = useDeleteDeckMutation();

   // SEO optimization for deck detail page
   useSEO({
      title: deck ? `${deck.title} - Bộ Từ Vựng | Vocab Vault` : 'Bộ Từ Vựng - Vocab Vault',
      description: deck 
         ? `Học từ vựng ${deck.title} với ${deck.vocabList?.length || 0} từ. Luyện tập với flashcard tương tác, trò chơi ghép thẻ và bài kiểm tra. ${deck.description || ''}`
         : 'Học từ vựng với flashcard tương tác, trò chơi và bài kiểm tra trên Vocab Vault.',
      keywords: deck 
         ? `${deck.title}, từ vựng, flashcard, ${deck.vocabList?.slice(0, 5).map(v => v.origin).join(', ')}, học tiếng anh`
         : 'từ vựng, flashcard, học ngôn ngữ',
      url: `https://vocab-vault.site/decks/${id}`,
      type: 'article',
      structuredData: deck ? {
         ...generateEducationalContentStructuredData(deck),
         ...generateBreadcrumbStructuredData([
            { name: 'Trang Chủ', url: 'https://vocab-vault.site' },
            { name: 'Bộ Từ Vựng', url: 'https://vocab-vault.site/decks' },
            { name: deck.title || 'Bộ Từ Vựng', url: `https://vocab-vault.site/decks/${id}` }
         ])
      } : undefined
   });

   const refetch = useCallback(() => {
      refetchGetDeckById();
      refetchUnlockCardMatch();
      refetchUnlockMutipleChoice();
   }, [refetchGetDeckById, refetchUnlockCardMatch, refetchUnlockMutipleChoice])

   useEffect(() => {
      if (deckError) {
         const error: any = deckError
         message?.error(error?.data?.message);
         navigate(PATH_CONSTANTS.HOME, {replace: true});
      }
   }, [deckError])

   const handleDelete = async () => {
      try {
         const res: any = await deleteDeck({id}).unwrap();
         message?.success(res);
         navigate(PATH_CONSTANTS.DECKS);
      } catch (error) {
         message?.error("Lỗi xoá bộ từ vựng");
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

   const filteredVocabs = deck?.vocabList.filter(vocab => 
      (vocab.origin?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       vocab.define?.toLowerCase().includes(searchTerm.toLowerCase())) ?? false
   );

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

         {deckLoading || cardMatchLoading || multipleChoiceLoading || !deck ? (
            <DeckDetailLoading />
         ) : (
            <>
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
                           <span className="text-base">{deck?.vocabList?.length} từ</span>
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
                              <Tooltip title={convertStringDate(deck?.createAt ?? '')}>
                                 <span>{convertAroundTime(deck?.createAt ?? '')}</span>
                              </Tooltip>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               <Divider />

               {(deck?.user?.id != user?.id && deck?.vocabList.length !== 0) || deck?.user?.id == user?.id ? (
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
                        {deck?.vocabList?.length && deck?.vocabList?.length > 0 && (
                           <div>
                              <h4 className="mb-5 text-2xl font-bold">Luyện tập</h4>
                              <div className="flex items-center gap-5">
                                 <Link to={PATH_CONSTANTS.FLASH_CARD.replace(':id', deck?.id ? deck?.id?.toString() : '0')}>
                                    <Button className="size-32 flex flex-col">
                                       <PiCardsThree style={{ fontSize: '24px' }} />
                                       <p>Thẻ ghi nhớ</p>
                                    </Button>
                                 </Link>
                                 <Link to={isUnlockCardMatch ? PATH_CONSTANTS.CARD_MATCH.replace(':id', deck?.id ? deck?.id?.toString() : '0') : '#'}>
                                    <Tooltip title={isUnlockCardMatch ? "" : "Bộ từ vựng cần ít nhất 6 từ để có thể mở khoá tính năng này"}>
                                       <Button className="size-32 flex flex-col" disabled={!isUnlockCardMatch}>
                                          <PiCards style={{ fontSize: '24px' }} />
                                          <p>Ghép thẻ</p>
                                       </Button>
                                    </Tooltip>
                                 </Link>
                                 <Link to={isUnlockMultipleChoice ? PATH_CONSTANTS.MUTIPLE_CHOICE.replace(':id', deck?.id ? deck?.id?.toString() : '0') : '#'}>
                                    <Tooltip title={isUnlockMultipleChoice ? "" : "Bộ từ vựng cần ít nhất 4 từ để có thể mở khoá tính năng này"}>
                                       <Button className="size-32 flex flex-col" disabled={!isUnlockMultipleChoice}>
                                          <GiChoice style={{ fontSize: '24px' }} />
                                          <p>Trắc nghiệm</p>
                                       </Button>
                                    </Tooltip>
                                 </Link> 
                              </div>
                           </div>
                        )}
                     </div>

                     <Divider />

                     <div>
                        <h4 className="mb-5 text-2xl font-bold">Các từ vựng có trong bộ đề</h4>
                        {deck?.vocabList?.length && deck?.vocabList?.length > 0 ? (
                           <>
                              <div className="flex items-center justify-between mb-4">
                                 <div className="flex-1 max-w-md">
                                    <Input 
                                       prefix={<SearchOutlined />} 
                                       placeholder="Tìm kiếm từ vựng..." 
                                       value={searchTerm}
                                       onChange={(e) => setSearchTerm(e.target.value)}
                                       allowClear
                                    />
                                 </div>
                                 <Switch checkedChildren="Chi tiết" unCheckedChildren="Rút gọn" defaultChecked onClick={() => setIsShorten((prev) => !prev)} />
                              </div>
                              {!isShorten ? (
                                 <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 my-5">
                                    {filteredVocabs?.map((vocab) => (
                                       <VocabItem key={vocab.id} vocab={vocab} refetch={refetch} hasPermissionModify={deck?.user?.id == user?.id} />
                                    ))}
                                 </div>
                              ) : (
                                 <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5 my-5">
                                    {filteredVocabs?.map((vocab) => (
                                       <VocabItem key={vocab.id} vocab={vocab} refetch={refetch} isShorten={isShorten} hasPermissionModify={deck?.user?.id == user?.id} />
                                    ))}
                                 </div>
                              )}
                              {filteredVocabs?.length === 0 && (
                                 <Empty description={<Typography.Text>Không tìm thấy từ vựng phù hợp</Typography.Text>} />
                              )}
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
                  refetch={refetch}
               />
               <DeckFormModal
                  open={openDeckModal}
                  setOpen={setOpenDeckModal}
                  isEdit={true}
                  deck={deck}
                  refetch={refetch}
               />
            </>
         )}

         
      </div>
   );
};
