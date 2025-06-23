import { Button, Form, Input, message } from 'antd';
import { forgotPasswordAPI } from 'apis';
import ICON from 'assets/icon.svg';
import { Link } from 'react-router-dom';
import { PATH_CONSTANTS } from 'utils';

type ForgotPasswordType = {
   email: string;
};

export const ForgotPasswordPage = () => {
   const [form] = Form.useForm<ForgotPasswordType>();
   const handleForgotPassword = async (data: ForgotPasswordType) => {
      const res = await forgotPasswordAPI(data);
      if (res.status === 200) {
         form.resetFields();
         message?.success(res.data);
      } else {
         message?.error(res.message);
      }
   };
   return (
      <div>
         <div className="flex items-center justify-center bg-background h-screen overflow-hidden">
            <div className="w-[500px]  bg-white rounded-lg flex flex-col items-center p-10">
               <Link to={PATH_CONSTANTS.HOME}>
                  <img src={ICON} alt="icon" className="size-24" />
               </Link>
               <p className="font-bold uppercase text-2xl">Khôi phục mật khẩu</p>
               <Form
                  form={form}
                  name="verify-form"
                  onFinish={handleForgotPassword}
                  layout="vertical"
                  className="mt-10 w-full"
               >
                  <Form.Item
                     name="email"
                     rules={[
                        {
                           type: 'email',
                           required: true,
                           message: 'Vui lòng nhập email',
                        },
                     ]}
                  >
                     <Input size="large" placeholder="example@gmail.com" />
                  </Form.Item>

                  <Form.Item>
                     <Button block={true} type="primary" htmlType="submit" className="py-5 mt-1 text-base">
                        Gửi
                     </Button>
                  </Form.Item>
               </Form>
               <Link to={PATH_CONSTANTS.SIGN_IN} className="text-primary text-sm">
                  Trở lại đăng nhập
               </Link>
            </div>
         </div>
      </div>
   );
};
