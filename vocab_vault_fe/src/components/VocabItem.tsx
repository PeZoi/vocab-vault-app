import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Divider, message, Popconfirm, Typography } from 'antd';
import { deleteVocabAPI } from 'apis/vocabAPI';
import { VocabFormModal } from 'pages';
import React, { useState } from 'react';
import { AiFillSound } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { VocabType } from 'types/VocabType';
import { capitalizeFirstLetter, handleClickAudio } from 'utils';
const { Paragraph } = Typography;

type Props = {
   vocab: VocabType;
   rerender: boolean;
   isShorten?: boolean;
   setRerender: (value: boolean) => void;
};

export const VocabItem: React.FC<Props> = ({ vocab, rerender, setRerender, isShorten = false }) => {
   const [openVocabModal, setOpenVocabModal] = useState(false);
   const [loadingAudio, setLoadingAudio] = useState(false);
   const handleDelete = async () => {
      const res = await deleteVocabAPI(vocab.id);
      if (res.status === 200) {
         setRerender(!rerender);
         message.success(res.data);
      } else {
         message.error(res.data);
      }
   };
   return (
      <div className="bg-background border border-gray-300 rounded-md p-5 text-lg">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 font-bold">
               <span className="text-primary">{capitalizeFirstLetter(vocab.origin)}</span>
               <span className="text-textSecondary text-sm">{vocab.ipa}</span>
               <span className="cursor-pointer hover:opacity-80 select-none">
                  {loadingAudio ? (
                     <LoadingOutlined />
                  ) : (
                     <AiFillSound
                        className="text-gray-500 cursor-pointer"
                        onClick={(e) => {
                           e.stopPropagation();
                           handleClickAudio(vocab.origin, setLoadingAudio);
                        }}
                     />
                  )}
               </span>
            </div>
            <div className="flex flex-row-reverse items-center gap-3">
               <Popconfirm
                  title="Xoá từ vựng"
                  description={`Bạn có chắc xoá từ ${capitalizeFirstLetter(vocab.origin)} chứ?`}
                  onConfirm={handleDelete}
                  okText="Đồng ý"
                  cancelText="Huỷ"
               >
                  <Button danger>
                     <CloseOutlined />
                  </Button>
               </Popconfirm>
               <Button onClick={() => setOpenVocabModal(true)}>
                  <FaRegEdit />
               </Button>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <span>Loại từ: </span>
            <span className="text-lg font-bold">{vocab.partsOfSpeech}</span>
            <span>|</span>
            <span>Cấp độ:</span>
            <span className="text-lg font-bold">{vocab.level}</span>
         </div>
         <p className="text-lg font-bold ">
            Định nghĩa: <span className="italic font-normal ml-1">{capitalizeFirstLetter(vocab?.define)}</span>
         </p>
         {!isShorten &&  (<><Divider className="my-2" />
         <div className="text-lg mt-2">
            <p className="text-lg font-bold ">Ví dụ:</p>
            <div className="flex flex-col gap-1">
               {vocab?.examples?.map((example, index) => (
                  <div key={example.id}>
                     <p className="font-bold text-textPrimary">
                        {index + 1}. {example.en}
                     </p>
                     <p className="italic text-textSecondary">{example.vi}</p>
                  </div>
               ))}
            </div>
         </div>
         <Divider className="my-2" />
         <Paragraph
            ellipsis={{
               rows: 5,
               tooltip: `${vocab.note}`,
            }}
            className=" text-lg"
         >
            <span className="font-bold">Ghi chú:</span>
            <span className="italic ml-2">{vocab.note}</span>
         </Paragraph></>)}

         <VocabFormModal
            open={openVocabModal}
            setOpen={setOpenVocabModal}
            rerender={rerender}
            setRerender={setRerender}
            isEdit={true}
            vocab={vocab}
         />
      </div>
   );
};
