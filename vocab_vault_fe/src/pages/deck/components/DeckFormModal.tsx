import type { FormProps } from 'antd';
import { Checkbox, Divider, Form, Input, Modal, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

type DeckType = {
   title?: string;
   description?: string;
   isPublic?: boolean;
};

type Props = {
   open: boolean;
   setOpen: (value: boolean) => void;
};

export const DeckFormModal: React.FC<Props> = ({ open, setOpen }) => {
   const [confirmLoading, setConfirmLoading] = useState(false);
   const [form] = Form.useForm<DeckType>();

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
   const onFinish: FormProps<DeckType>['onFinish'] = (values) => {
      setConfirmLoading(true);
      setTimeout(() => {
         setOpen(false);
         setConfirmLoading(false);
         console.log('Success:', values);
      }, 2000);
   };

   const onFinishFailed: FormProps<DeckType>['onFinishFailed'] = (errorInfo) => {
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
               <Form.Item<DeckType>
                  label="Tên bộ đề"
                  name="title"
                  rules={[{ required: true, message: 'Vui lòng nhập tên bộ đề' }]}
               >
                  <Input placeholder="VD: Từ vựng TOEIC" />
               </Form.Item>

               <Form.Item<DeckType> label="Mô tả" name="description">
                  <Input.TextArea
                     placeholder="VD: Đây là bộ đề từ vựng cơ bản cho TOEIC"
                     rows={3}
                     showCount
                     maxLength={80}
                  />
               </Form.Item>

               <Form.Item<DeckType> name="isPublic">
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
