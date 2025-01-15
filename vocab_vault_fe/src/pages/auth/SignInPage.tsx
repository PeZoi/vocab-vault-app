import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import ICON from 'assets/icon.svg';
import { Link } from 'react-router-dom';
import { PATH_CONSTANTS } from 'utils';

type SignInType = {
   email: string;
   password: string;
};

export const SignInPage = () => {
   const handleSignIn = (value: SignInType) => {
      console.log(value);
   };

   return (
      <div className="flex items-center justify-center bg-background h-screen overflow-hidden">
         <div className="w-[500px] h-[600px] bg-white rounded-lg flex flex-col items-center p-10">
            <Link to={PATH_CONSTANTS.HOME}>
               <img src={ICON} alt="icon" className="size-24" />
            </Link>
            <p className="font-bold uppercase text-2xl">ĐĂNG NHẬP</p>
            <p className="mt-2 text-sm text-gray-600">Chào mừng bạn đến với Vocab Vault</p>
            <p className="text-sm text-gray-600">Nơi dành cho những người muốn lưu trữ từ vựng tiếng anh</p>

            <Form name="normal_login" onFinish={handleSignIn} layout="vertical" className="mt-10 w-full">
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
                  <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
               </Form.Item>
               <Form.Item
                  name="password"
                  rules={[
                     {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu',
                     },
                  ]}
               >
                  <Input.Password prefix={<LockOutlined />} type="password" placeholder="Mật khẩu" size="large" />
               </Form.Item>
               <Form.Item className="my-0">
                  <Link to="" className="text-primary">
                     Quên mật khẩu?
                  </Link>
               </Form.Item>
               <Form.Item>
                  <Button block={true} type="primary" htmlType="submit" className="py-5 mt-1 text-base">
                     Đăng nhập
                  </Button>
                  <div className="mt-2 flex justify-center">
                     <div>
                        <span className="mr-1">Bạn chưa có tài khoản?</span>{' '}
                        <Link to={PATH_CONSTANTS.SIGN_UP} className="text-primary">
                           Đăng ký ngay
                        </Link>
                     </div>
                  </div>
               </Form.Item>
            </Form>
         </div>
      </div>
   );
};
