import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import ICON from 'assets/icon.svg';
import { Link } from 'react-router-dom';
import { PATH_CONSTANTS } from 'utils';

type SignUpType = {
   fullName: string;
   email: string;
   password: string;
};

export const SignUpPage = () => {
   const handleSignUp = (value: SignUpType) => {
      console.log(value);
   };

   return (
      <div className="flex items-center justify-center bg-background h-screen overflow-hidden">
         <div className="w-[500px] h-[600px] bg-white rounded-lg flex flex-col items-center p-10">
            <Link to={PATH_CONSTANTS.HOME}>
               <img src={ICON} alt="icon" className="size-24" />
            </Link>
            <p className="font-bold uppercase text-2xl">ĐĂNG KÝ</p>
            <p className="mt-2 text-sm text-gray-600">Chào mừng bạn đến với Vocab Vault</p>
            <p className="text-sm text-gray-600">Nơi dành cho những người muốn lưu trữ từ vựng tiếng anh</p>

            <Form name="normal_login" onFinish={handleSignUp} layout="vertical" className="mt-10 w-full">
               <Form.Item
                  name="fullName"
                  rules={[
                     {
                        required: true,
                        message: 'Vui lòng nhập họ và tên',
                     },
                  ]}
               >
                  <Input prefix={<UserOutlined />} placeholder="Họ và tên" size="large" />
               </Form.Item>
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
               <Form.Item>
                  <Button block={true} type="primary" htmlType="submit" className="py-5 mt-1 text-base">
                     Đăng ký
                  </Button>
                  <div className="mt-2 flex justify-center">
                     <Link to={PATH_CONSTANTS.SIGN_IN} className="text-primary">
                        Bạn đã có tài khoản - Đăng nhập ngay
                     </Link>
                  </div>
               </Form.Item>
            </Form>
         </div>
      </div>
   );
};
