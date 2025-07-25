import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Divider, message, Popconfirm, Typography } from 'antd';
import { VocabFormModal } from 'pages';
import React, { useEffect, useState } from 'react';
import { AiFillSound } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { useDeleteVocabMutation, useGetSoundForWordQuery } from 'redux/api';
import { ExampleType, VocabType } from 'types';
import { capitalizeFirstLetter, handlePlayAudio } from 'utils';
const { Paragraph } = Typography;

type Props = {
   vocab: VocabType;
   isShorten?: boolean;
   hasPermissionModify?: boolean;
   refetch: () => void;
};

export const VocabItem: React.FC<Props> = ({ vocab, refetch, isShorten = false, hasPermissionModify }) => {
   const [openVocabModal, setOpenVocabModal] = useState(false);
   const [currentWord, setCurrentWord] = useState<string>('');

   const [deleteVocab] = useDeleteVocabMutation();
   const { data: audioData, isLoading: isLoadingAudio} = useGetSoundForWordQuery({ word: currentWord.toLowerCase() }, { skip: !currentWord.toLowerCase() });

   useEffect(() => {
      if (audioData) {
         handlePlayAudio(audioData);
      }
   }, [audioData])

   const handleDelete = async () => {
      try {
         const res: any = await deleteVocab({id: vocab.id}).unwrap();
         message.success(res);
         refetch();
      } catch (error) {
         message.error("Lỗi xoá từ vựng");
      }
   };
   return (
      <div className="bg-background border border-gray-300 rounded-md p-5 text-lg">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 font-bold">
               <span className="text-primary">{capitalizeFirstLetter(vocab.origin)}</span>
               <span className="text-textSecondary text-sm">{vocab.ipa}</span>
               <span className="cursor-pointer hover:opacity-80 select-none">
                  {isLoadingAudio ? (
                     <LoadingOutlined />
                  ) : (
                     <AiFillSound
                        className="text-gray-500 cursor-pointer"
                        onClick={(e) => {
                           e.stopPropagation();
                           setCurrentWord(vocab.origin || '');
                           if (vocab.origin === currentWord) {
                              handlePlayAudio(audioData);
                           }
                        }}
                     />
                  )}
               </span>
            </div>
            {hasPermissionModify && <div className="flex flex-row-reverse items-center gap-3">
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
            </div>}
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
               {vocab?.examples?.map((example: ExampleType, index: number) => (
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
            isEdit={true}
            vocab={vocab}
            refetch={refetch}
         />
      </div>
   );
};
