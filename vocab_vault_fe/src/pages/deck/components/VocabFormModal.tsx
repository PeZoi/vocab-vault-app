import { CloseOutlined, QuestionCircleOutlined, RedoOutlined } from '@ant-design/icons';
import type { AutoCompleteProps, FormProps } from 'antd';
import { AutoComplete, Button, Card, Divider, Form, Input, message, Modal, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { generateWordAPI, suggestEnAPI, suggestViAPI } from 'apis';
import { createVocabAPI, updateVocabAPI } from 'apis/vocabAPI';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { LuBrain } from 'react-icons/lu';
import { VocabType } from 'types';
import { convertToJSON } from 'utils';

type Props = {
   deckId?: string;
   open: boolean;
   setOpen: (value: boolean) => void;

   rerender: boolean;
   setRerender: (value: boolean) => void;

   // MODE: EDIT
   isEdit?: boolean;
   vocab?: VocabType;
};

export const VocabFormModal: React.FC<Props> = ({
   open,
   setOpen,
   deckId = '',
   rerender,
   setRerender,
   isEdit,
   vocab,
}) => {
   const [confirmLoading, setConfirmLoading] = useState(false);
   const [generateLoading, setGenerateLoading] = useState(false);
   const [form] = Form.useForm<VocabType>();

   const [originRecommends, setOriginRecommends] = useState<AutoCompleteProps['options']>([]);
   const [defineRecommends, setDefineRecommends] = useState<AutoCompleteProps['options']>([]);

   useEffect(() => {
      if (isEdit && vocab) {
         form.setFieldsValue(vocab);
      }

      setOriginRecommends([]);
      setDefineRecommends([]);
      return () => {
         form.resetFields();
      };
   }, [open]);

   // ===== HANDLE MODAL =====
   const handleOk = () => {
      form.submit();
   };

   const handleCancel = () => {
      setOpen(false);
   };

   // ===== HANDLE FORM =====
   const onFinish: FormProps<VocabType>['onFinish'] = async (values) => {
      setConfirmLoading(true);
      const payload: VocabType = { ...values, deckId: deckId, id: vocab?.id };
      const res = isEdit ? await updateVocabAPI(vocab?.id, payload) : await createVocabAPI(payload);
      if (res.status === 201 || res.status === 200) {
         setOpen(false);
         setRerender(!rerender);
         message.success(`${isEdit ? 'Cập nhật' : 'Thêm'} từ vựng thành công`);
      } else {
         message.error('Có lỗi xảy ra');
      }
      setConfirmLoading(false);
   };

   const generateVocab = async () => {
      setGenerateLoading(true);
      let dataCurr = form.getFieldsValue();
      const payload = dataCurr.origin + (dataCurr.define ? ` (${dataCurr.define})` : '');
      const res = await generateWordAPI(payload);

      if (res.status === 200) {
         const responseData: VocabType = convertToJSON(res.data?.candidates?.[0]?.content?.parts?.[0]?.text);
         dataCurr = {
            ...dataCurr,
            define: dataCurr.define || responseData.define,
            ipa: responseData.ipa,
            level: responseData.level,
            note: responseData.note,
            partsOfSpeech: responseData.partsOfSpeech,
            examples: [...(responseData.examples || [])],
         };
         form.setFieldsValue(dataCurr);
         message.success('AI gợi ý thành công');
      } else {
         message.error('Có lỗi xảy ra');
      }
      setGenerateLoading(false);
   };

   const handleSearchOrigin = useCallback(
      debounce(async (searchText: string) => {
         if (!searchText) {
            setOriginRecommends([]);
            return;
         }

         let results;
         const res = await suggestEnAPI(searchText);

         if (res.status === 200) {
            results = res.data?.map((word: any) => {
               return { value: word?.name };
            });
         }
         
         setOriginRecommends(results);
      }, 500),
      [],
   );

   const handleSuggestDefine = useCallback(
      debounce(async (searchText: string = form.getFieldsValue().define || '') => {
         const originDataForm = form.getFieldsValue()?.origin;

         if (!originDataForm) {
            setDefineRecommends([]);
            return;
         }

         let results;
         const res = await suggestViAPI(originDataForm, searchText);

         if (res.status === 200) {
            results = res.data?.responses?.[0]?.data?.suggestions?.suggestions?.map((word: any) => {
               return { value: word?.text };
            });
         }

         setDefineRecommends(results);
      }, 500),
      [],
   );

   return (
      <Modal
         title={`${isEdit ? 'Sửa' : 'Thêm'} từ vựng`}
         open={open}
         onOk={handleOk}
         confirmLoading={confirmLoading}
         onCancel={handleCancel}
         cancelText="Huỷ"
         okText={`${isEdit ? 'Cập nhật' : 'Tạo'}`}
         className="min-w-[70%]"
      >
         <div className="pb-2">
            <Divider className="my-3" />
            <Form form={form} name="dynamic_form_complex" autoComplete="off" layout="vertical" onFinish={onFinish}>
               <Card
                  className="shadow-md"
                  size="small"
                  extra={
                     <div className="flex items-center gap-5">
                        <Tooltip title="Reset">
                           <span className="cursor-pointer" onClick={() => form.resetFields()}>
                              <RedoOutlined />
                           </span>
                        </Tooltip>

                        <Tooltip title="Chỉ cần điền thuật ngữ sau đó nhấn nút cho A.I tự generate các trường còn lại">
                           <QuestionCircleOutlined className=" cursor-pointer" />
                        </Tooltip>
                        <Button
                           className="text-primary border border-primary bg-bgPrimaryHover"
                           onClick={() => generateVocab()}
                           loading={generateLoading}
                        >
                           <Tooltip title="Nhấn vào để A.I định nghĩa">
                              <LuBrain />
                           </Tooltip>
                        </Button>
                     </div>
                  }
               >
                  <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
                     <Form.Item
                        label="Thuật ngữ"
                        name={'origin'}
                        rules={[{ required: true, message: 'Thuật ngữ không đươc để trống' }]}
                     >
                        <AutoComplete
                           options={originRecommends}
                           onSearch={handleSearchOrigin}
                           placeholder="VD: Apple"
                        />
                     </Form.Item>
                     <Form.Item
                        label="Định nghĩa"
                        name={'define'}
                        rules={[{ required: true, message: 'Định nghĩa không đươc để trống' }]}
                     >
                        <AutoComplete
                           options={defineRecommends}
                           onClick={() => handleSuggestDefine()}
                           onSearch={handleSuggestDefine}
                           placeholder="VD: Trái táo"
                        />
                     </Form.Item>
                  </div>
                  <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-5">
                     <Form.Item label="Loại từ" name={'partsOfSpeech'}>
                        <Input placeholder="VD: Noun" />
                     </Form.Item>
                     <Form.Item label="Phiên âm" name={'ipa'}>
                        <Input placeholder="VD: /ˈæp.əl/" />
                     </Form.Item>
                     <Form.Item label="Cấp độ của từ vựng" name={'level'}>
                        <Input placeholder="VD: A1, A2, ..." />
                     </Form.Item>
                  </div>

                  <Form.Item label="Ghi chú (Các tips giúp nhớ từ này lâu hơn)" name={'note'}>
                     <TextArea placeholder="Trái táo là một quả táo ..." allowClear rows={3} />
                  </Form.Item>

                  {/* Nest Form.List */}
                  <Form.Item label="Ví dụ:">
                     <Form.List name={'examples'}>
                        {(subFields, subOpt) => {
                           return (
                              <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                 {subFields.map((subField) => (
                                    <>
                                       <div className="w-full flex gap-2" key={subField.key}>
                                          <div className="flex flex-col gap-2 flex-1 w-full">
                                             <div className="flex items-center gap-3">
                                                <span className="text-nowrap">Câu tiếng anh:</span>
                                                <Form.Item
                                                   name={[subField.name, 'en']}
                                                   className="w-full m-0"
                                                   rules={[{ required: true, message: 'Không đươc để trống' }]}
                                                >
                                                   <Input placeholder="This is a apple" />
                                                </Form.Item>
                                             </div>
                                             <div className="flex items-center gap-3">
                                                <span className="text-nowrap">Câu tiếng việt:</span>
                                                <Form.Item
                                                   name={[subField.name, 'vi']}
                                                   className="w-full m-0"
                                                   rules={[{ required: true, message: 'Không đươc để trống' }]}
                                                >
                                                   <Input placeholder="Đây là trái táo" />
                                                </Form.Item>
                                             </div>
                                          </div>
                                          <div className="w-fit">
                                             <CloseOutlined
                                                onClick={() => {
                                                   subOpt.remove(subField.name);
                                                }}
                                             />
                                          </div>
                                       </div>
                                       <Divider className="my-0" />
                                    </>
                                 ))}
                                 <Button type="dashed" onClick={() => subOpt.add()} block>
                                    + Thêm ví dụ
                                 </Button>
                              </div>
                           );
                        }}
                     </Form.List>
                  </Form.Item>
               </Card>
            </Form>
         </div>
      </Modal>
   );
};
