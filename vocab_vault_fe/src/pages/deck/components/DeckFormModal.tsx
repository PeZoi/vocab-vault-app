import type { FormProps } from 'antd';
import { Checkbox, Divider, Form, Input, message, Modal, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { DeckRequestType } from 'types';
import { createDeckAPI } from 'apis';

type Props = {
   open: boolean;
   setOpen: (value: boolean) => void;

   rerender: boolean;
   setRerender: (value: boolean) => void;
};

export const DeckFormModal: React.FC<Props> = ({ open, setOpen, rerender, setRerender }) => {
   const [confirmLoading, setConfirmLoading] = useState(false);
   const [form] = Form.useForm<DeckRequestType>();

   useEffect(() => {
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
   const onFinish: FormProps<DeckRequestType>['onFinish'] = async (values) => {
      setConfirmLoading(true);
      const res = await createDeckAPI(values);
      if (res.status === 201) {
         message.success('Tạo thành công');
         setOpen(false);
         setRerender(!rerender);
      } else {
         message.error('Tạo thất bại');
      }
      setConfirmLoading(false);
   };

   const onFinishFailed: FormProps<DeckRequestType>['onFinishFailed'] = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

   return (
      <Modal
         title="Tạo bộ từ mới"
         open={open}
         onOk={handleOk}
         confirmLoading={confirmLoading}
         onCancel={handleCancel}
         cancelText="Huỷ"
         okText="Tạo"
      >
         <div className="pb-2">
            <Divider className="my-3" />
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
               <Form.Item<DeckRequestType>
                  label="Tên bộ đề"
                  name="title"
                  rules={[{ required: true, message: 'Vui lòng nhập tên bộ đề' }]}
               >
                  <Input placeholder="VD: Từ vựng TOEIC" />
               </Form.Item>

               <Form.Item<DeckRequestType> label="Mô tả" name="description">
                  <Input.TextArea
                     placeholder="VD: Đây là bộ đề từ vựng cơ bản cho TOEIC"
                     rows={3}
                     showCount
                     maxLength={80}
                  />
               </Form.Item>

               <Form.Item<DeckRequestType> name="isPublic" valuePropName="checked">
                  <div className="flex items-center">
                     <Checkbox>Công khai</Checkbox>
                     <Tooltip title="Mọi người đều có thể xem bộ đề của bạn">
                        <QuestionCircleOutlined className=" cursor-pointer" />
                     </Tooltip>
                  </div>
               </Form.Item>
            </Form>
         </div>
      </Modal>
   );
};
