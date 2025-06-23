import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { signUpAPI, verifyAPI } from 'apis';
import ICON from 'assets/icon.svg';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpType } from 'types';
import { PATH_CONSTANTS } from 'utils';

type VerifyFormType = {
   verifyCode: string;
};

export const SignUpPage = () => {
   const navigate = useNavigate();
   const [isRegisted, setIsRegisted] = useState(false);
   const [emailRegisted, setEmailRegisted] = useState('');
   const handleSignUp = async (value: SignUpType) => {
      const res = await signUpAPI(value);
      if (res?.status === 201) {
         message?.success('Đăng ký thành công');
         setIsRegisted(true);
         setEmailRegisted(res.data?.email);
      } else {
         message?.error(res?.message);
      }
   };

   const handleVerifyAccount = async (value: VerifyFormType) => {
      const res = await verifyAPI({ email: emailRegisted, verifyCode: value.verifyCode });
      if (res.status === 200) {
         message?.success('Kích hoạt thành công');
         navigate(PATH_CONSTANTS.SIGN_IN);
      } else {
         message?.error(res?.message);
      }
   };

   return (
      <div className="flex items-center justify-center bg-background h-screen overflow-hidden">
         <div className="w-[500px]  bg-white rounded-lg flex flex-col items-center p-10">
            <Link to={PATH_CONSTANTS.HOME}>
               <img src={ICON} alt="icon" className="size-24" />
            </Link>
            {!isRegisted ? (
               <>
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
                           {
                              min: 8,
                              message: 'Tối thiểu phải 8 ký tự',
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
               </>
            ) : (
               <>
                  <p className="font-bold uppercase text-2xl">Kích hoạt tài khoản</p>
                  <p className="mt-2 text-sm text-gray-600">Chúng tôi đã gửi mã kích hoạt đến {emailRegisted}</p>
                  <Form name="verify-form" onFinish={handleVerifyAccount} layout="vertical" className="mt-10 w-full">
                     <Form.Item
                        name="verifyCode"
                        rules={[
                           {
                              required: true,
                              message: 'Vui lòng nhập otp',
                           },
                        ]}
                     >
                        <div className="flex justify-center">
                           <Input.OTP formatter={(str) => str.replace(/\D/g, '')} size="large" />
                        </div>
                     </Form.Item>

                     <Form.Item>
                        <Button block={true} type="primary" htmlType="submit" className="py-5 mt-1 text-base">
                           Kích hoạt
                        </Button>
                     </Form.Item>
                  </Form>
               </>
            )}
         </div>
      </div>
   );
};
