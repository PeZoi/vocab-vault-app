import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { AutoCompleteProps, FormProps } from 'antd';
import { AutoComplete, Button, Card, Divider, Form, Input, Modal, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useCallback, useEffect, useState } from 'react';
import { LuBrain } from 'react-icons/lu';
import { debounce } from 'lodash';

type VocabType = {
   origin: string;
   define: string;
   typeOfWord: string;
   ipa: string;
   note: string;
   examples: [
      {
         en: string;
         vi: string;
      },
   ];
};

type FormType = {
   items: VocabType[];
};

type Props = {
   open: boolean;
   setOpen: (value: boolean) => void;
};

export const VocabFormModal: React.FC<Props> = ({ open, setOpen }) => {
   const [confirmLoading, setConfirmLoading] = useState(false);
   const [form] = Form.useForm<FormType>();

   const [originRecommends, setOriginRecommends] = useState<AutoCompleteProps['options']>([{ value: 'Apples' }]);
   const [defineRecommends, setDefineRecommends] = useState<AutoCompleteProps['options']>([{ value: 'Quả táo' }]);

   useEffect(() => {
      form.resetFields();
   }, [open]);

   // ===== HANDLE MODAL =====
   const handleOk = () => {
      form.submit();
   };

   const handleCancel = () => {
      setOpen(false);
   };

   // ===== HANDLE FORM =====
   const onFinish: FormProps<FormType>['onFinish'] = (values) => {
      setConfirmLoading(true);
      setTimeout(() => {
         setOpen(false);
         setConfirmLoading(false);
         console.log('Success:', values);
      }, 1000);
   };

   const onFinishFailed: FormProps<FormType>['onFinishFailed'] = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

   const generateVocab = (_index: number) => {
      const dataCurr = form.getFieldsValue();
      fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
         method: 'POST',
         body: JSON.stringify({
            generationConfig: {},
            safetySettings: [],
            contents: [
               {
                  role: 'user',
                  parts: [
                     {
                        text: `
                  Bạn là một chuyên gia ngôn ngữ có khả năng tạo flashcard chất lượng cao. Hãy tạo flashcard cho từ "${dataCurr?.items?.[_index].origin}" với ngôn ngữ english.
                  
                  Yêu cầu:
                  1. Phải cung cấp thông tin chính xác và đầy đủ
                  2. Ví dụ phải thực tế và dễ hiểu
                  3. Ghi chú phải hữu ích cho việc ghi nhớ
                  4. Định dạng JSON phải chính xác
                  
                  Trả về kết quả theo cấu trúc JSON sau và KHÔNG kèm theo bất kỳ giải thích nào:
                  
                  {
                  "origin": "", // Từ gốc bằng english
                  "define": "", // Định nghĩa bằng tiếng Việt, ngắn gọn và dễ hiểu
                  "typeOfWord": "", // Loại từ (danh từ, động từ, tính từ, etc.)
                  "ipa": "", // Phiên âm chuẩn IPA
                  "examples": [
                      {
                      "en": "", // Câu ví dụ bằng english
                      "vi": ""  // Dịch nghĩa tiếng Việt
                      },
                      {
                      "en": "",
                      "vi": ""
                      }
                  ],
                  "note": "" // Tips ghi nhớ, cách dùng đặc biệt, hoặc các lưu ý quan trọng bằng tiếng Việt. Các dấu nháy đôi "" thay bằng dấu ngoặc () để tránh lỗi JSON
                  }
                  `,
                     },
                  ],
               },
            ],
         }),
         headers: {
            'Content-Type': 'application/json',
            'x-goog-api-client': 'genai-js/0.21.0',
            'x-goog-api-key': 'AIzaSyCYRBsvnV6aNTaRahPnEO0DcskTypRX3uE',
         },
      })
         .then((res) => res.json())
         .then((data) => {
            const regex = /```json\s*(\{.*\})\s*```/s;
            let response = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            const match = response.match(regex);
            if (match && match[1]) {
               try {
                  response = JSON.parse(match[1]);
               } catch (e) {
                  console.log(e);
               }
            }
            const newDataArr = dataCurr?.items.map((item, index) => (index === _index ? response : item));
            dataCurr.items = newDataArr;
            form.setFieldsValue(dataCurr);
         })
         .catch((err) => {
            console.error('Error:', err);
         });
   };

   const handleSearchOrigin = useCallback(
      debounce((searchText: string) => {
         if (!searchText) {
            setOriginRecommends([]);
            return;
         }

         const results = [
            { value: 'Apple' },
            { value: 'Applesauce' },
            { value: 'Apricot' },
            { value: 'Banana' },
         ].filter((item) => item.value.toLowerCase().includes(searchText.toLowerCase()));

         setOriginRecommends(results);
      }, 500),
      [],
   );

   return (
      <Modal
         title="Thêm từ vựng"
         open={open}
         onOk={handleOk}
         confirmLoading={confirmLoading}
         onCancel={handleCancel}
         cancelText="Huỷ"
         okText="Tạo"
      >
         <div className="pb-2">
            <Divider className="my-3" />
            <Form
               form={form}
               name="dynamic_form_complex"
               autoComplete="off"
               initialValues={{
                  items: [{}],
               }}
               layout="vertical"
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
            >
               <Form.List name="items">
                  {(fields, { add, remove }) => (
                     <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                        {fields.map((field, index) => {
                           return (
                              <Card
                                 className="shadow-md"
                                 size="small"
                                 title={`NO. ${index + 1}`}
                                 key={field.key}
                                 extra={
                                    <div className="flex items-center gap-5">
                                       <Tooltip title="Chỉ cẩn điền thuật ngữ sau đó nhấn nút cho A.I tự generate các trường còn lại">
                                          <QuestionCircleOutlined className=" cursor-pointer" />
                                       </Tooltip>
                                       <Button
                                          className="text-primary border border-primary bg-bgPrimaryHover"
                                          onClick={() => generateVocab(index)}
                                       >
                                          <Tooltip title="Nhấn vào để A.I định nghĩa">
                                             <LuBrain />
                                          </Tooltip>
                                       </Button>
                                       <CloseOutlined
                                          onClick={() => {
                                             remove(field.name);
                                          }}
                                       />
                                    </div>
                                 }
                              >
                                 <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
                                    <Form.Item
                                       label="Thuật ngữ"
                                       name={[field.name, 'origin']}
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
                                       name={[field.name, 'define']}
                                       rules={[{ required: true, message: 'Định nghĩa không đươc để trống' }]}
                                    >
                                       <AutoComplete
                                          options={defineRecommends}
                                          // onSearch={(text) => setOptions(getPanelValue(text))}
                                          placeholder="VD: Trái táo"
                                       />
                                    </Form.Item>
                                 </div>
                                 <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
                                    <Form.Item
                                       label="Loại từ"
                                       name={[field.name, 'typeOfWord']}
                                       rules={[{ required: true, message: 'Loại từ không đươc để trống' }]}
                                    >
                                       <Input placeholder="VD: Noun" />
                                    </Form.Item>
                                    <Form.Item label="Phiên âm" name={[field.name, 'ipa']}>
                                       <Input placeholder="VD: /ˈæp.əl/" />
                                    </Form.Item>
                                 </div>

                                 <Form.Item
                                    label="Ghi chú (Các tips giúp nhớ từ này lâu hơn)"
                                    name={[field.name, 'note']}
                                 >
                                    <TextArea placeholder="Trái táo là một quả táo ..." allowClear rows={3} />
                                 </Form.Item>

                                 {/* Nest Form.List */}
                                 <Form.Item label="Ví dụ:">
                                    <Form.List name={[field.name, 'examples']}>
                                       {(subFields, subOpt) => {
                                          return (
                                             <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                                {subFields.map((subField) => (
                                                   <div className="flex items-center gap-5 w-full" key={subField.key}>
                                                      <Form.Item
                                                         label="Câu tiếng anh:"
                                                         name={[subField.name, 'en']}
                                                         className="w-full"
                                                      >
                                                         <Input placeholder="This is a apple" />
                                                      </Form.Item>
                                                      <Form.Item
                                                         label="Câu tiếng việt:"
                                                         name={[subField.name, 'vi']}
                                                         className="w-full"
                                                      >
                                                         <Input placeholder="Đây là trái táo" />
                                                      </Form.Item>
                                                      <CloseOutlined
                                                         onClick={() => {
                                                            subOpt.remove(subField.name);
                                                         }}
                                                      />
                                                   </div>
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
                           );
                        })}

                        <Button type="dashed" onClick={() => add()} block>
                           + Thêm từ
                        </Button>
                     </div>
                  )}
               </Form.List>
            </Form>
         </div>
      </Modal>
   );
};
