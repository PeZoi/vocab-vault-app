import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { changePasswordAPI, resetPasswordAPI } from 'apis';
import ICON from 'assets/icon.svg';
import { useMessage } from 'hooks';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { PATH_CONSTANTS } from 'utils';

type FormType = {
   password: string;
   passwordConfirm: string;
};

export const ResetPasswordPage = () => {
   const [searchParams] = useSearchParams();
   const token = searchParams.get('token');
   const [loadingPage, setLoadingPage] = useState(true);
   const navigate = useNavigate();
   const message = useMessage();
   useEffect(() => {
      const handleCheckToken = async () => {
         if (token) {
            const res = await resetPasswordAPI({ token });
            if (res.status !== 200) {
               message?.error(res.data);
               navigate(PATH_CONSTANTS.FORGOT_PASSWORD);
            }
            setLoadingPage(false);
         }
      };

      handleCheckToken();
   }, [searchParams]);

   const handleResetPassword = async (value: FormType) => {
      console.log(value.password);
      console.log(value.passwordConfirm);

      if (value.password !== value.passwordConfirm) {
         message?.error('Mật khẩu không khớp');
         return;
      }
      if (token) {
         const res = await changePasswordAPI({ token, password: value.password });
         if (res.status === 200) {
            message?.success(res.data);
            navigate(PATH_CONSTANTS.SIGN_IN);
         } else {
            message?.error(res.message);
         }
      }
   };

   if (loadingPage) {
      return <></>;
   }

   return (
      <div>
         <div className="flex items-center justify-center bg-background h-screen overflow-hidden">
            <div className="w-[500px]  bg-white rounded-lg flex flex-col items-center p-10">
               <Link to={PATH_CONSTANTS.HOME}>
                  <img src={ICON} alt="icon" className="size-24" />
               </Link>
               <p className="font-bold uppercase text-2xl">Đổi mật khẩu mới</p>
               <Form name="verify-form" onFinish={handleResetPassword} layout="vertical" className="mt-10 w-full">
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
                     <Input.Password
                        prefix={<LockOutlined />}
                        type="passwordConfirm"
                        placeholder="Mật khẩu mới"
                        size="large"
                        spellCheck={false}
                     />
                  </Form.Item>
                  <Form.Item
                     name="passwordConfirm"
                     rules={[
                        {
                           required: true,
                           message: 'Vui lòng nhập lại mật khẩu',
                        },
                        {
                           min: 8,
                           message: 'Tối thiểu phải 8 ký tự',
                        },
                     ]}
                  >
                     <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        size="large"
                        spellCheck={false}
                     />
                  </Form.Item>

                  <Form.Item>
                     <Button block={true} type="primary" htmlType="submit" className="py-5 mt-1 text-base">
                        Đổi mật khẩu
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         </div>
      </div>
   );
};
