import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { signInAPI, socialSignInAPI } from 'apis';
import ICON from 'assets/icon.svg';
import { useMessage } from 'hooks';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SignInType } from 'types';
import { PATH_CONSTANTS } from 'utils';
import { updateInformationUser, updateToken } from './authSlice';

export const SignInPage = () => {
   const message = useMessage();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleSignIn = async (value: SignInType) => {
      const res = await signInAPI(value);
      if (res?.status === 200) {
         message?.success('Đăng nhập thành công');

         dispatch(updateInformationUser(res.data.user));
         dispatch(updateToken(res.data.accessToken));
         navigate(PATH_CONSTANTS.HOME);
      } else {
         message?.error(res?.message);
      }
   };

   const handleClickGoogle = async () => {
      const res = await socialSignInAPI('GOOGLE');
      if (res.status !== 200) {
         message?.error('Có lỗi gì đó');
         return;
      }
      window.location.replace(res?.data);
   };

   return (
      <div className="flex items-center justify-center bg-background h-screen overflow-hidden">
         <div className="w-[500px] bg-white rounded-lg flex flex-col items-center p-10">
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
                  <Input prefix={<MailOutlined />} placeholder="Email" size="large" spellCheck={false} />
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
                  <Input.Password
                     prefix={<LockOutlined />}
                     type="password"
                     placeholder="Mật khẩu"
                     size="large"
                     spellCheck={false}
                  />
               </Form.Item>
               <Form.Item className="my-0">
                  <Link to={PATH_CONSTANTS.FORGOT_PASSWORD} className="text-primary">
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
            <div className="flex items-center justify-center">
               <Button className="size-12 p-0 rounded-full" onClick={handleClickGoogle}>
                  <img
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                     alt=""
                     className="size-6 object-cover"
                  />
               </Button>
            </div>
         </div>
      </div>
   );
};
