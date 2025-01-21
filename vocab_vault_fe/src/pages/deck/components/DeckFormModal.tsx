import { QuestionCircleOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Checkbox, Divider, Form, Input, message, Modal, Tooltip } from 'antd';
import { createDeckAPI, updateDeckAPI } from 'apis';
import { useEffect, useState } from 'react';
import { DeckRequestType, DeckResponseType } from 'types';

type Props = {
   open: boolean;
   setOpen: (value: boolean) => void;

   rerender: boolean;
   setRerender: (value: boolean) => void;

   // MODE: EDIT
   isEdit?: boolean;
   deck?: DeckResponseType;
};

export const DeckFormModal: React.FC<Props> = ({ open, setOpen, rerender, setRerender, isEdit = false, deck }) => {
   const [confirmLoading, setConfirmLoading] = useState(false);
   const [form] = Form.useForm<DeckRequestType>();

   useEffect(() => {
      if (isEdit && deck) {
         form.setFieldsValue(deck);
      }
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
      const res = isEdit ? await updateDeckAPI(deck?.id, values) : await createDeckAPI(values);

      if (res.status === 201 || res.status === 200) {
         message.success(`${isEdit ? 'Cập nhật' : 'Tạo'} thành công`);
         setOpen(false);
         setRerender(!rerender);
      } else {
         message.error(`${isEdit ? 'Cập nhật' : 'Tạo'} thất bại`);
      }
      setConfirmLoading(false);
   };

   const onFinishFailed: FormProps<DeckRequestType>['onFinishFailed'] = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

   return (
      <Modal
         title={`${isEdit ? 'Chỉnh sửa' : 'Tạo'} bộ đề`}
         open={open}
         onOk={handleOk}
         confirmLoading={confirmLoading}
         onCancel={handleCancel}
         cancelText="Huỷ"
         okText={`${isEdit ? 'Cập nhật' : 'Tạo'}`}
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

               <div className="flex items-center">
                  <Form.Item<DeckRequestType> name="isPublic" valuePropName="checked" className="m-0">
                     <Checkbox>Công khai</Checkbox>
                  </Form.Item>
                  <Tooltip title="Mọi người đều có thể xem bộ đề của bạn">
                     <QuestionCircleOutlined className=" cursor-pointer" />
                  </Tooltip>
               </div>
            </Form>
         </div>
      </Modal>
   );
};
