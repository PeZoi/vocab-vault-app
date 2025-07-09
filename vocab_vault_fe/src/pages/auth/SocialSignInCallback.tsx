import { message, Spin } from 'antd';
import { socialCallBackAPI } from 'apis';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PATH_CONSTANTS } from 'utils';
import { updateInformationUser, updateToken } from './authSlice';

export const SocialSignInCallback = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [searchParams] = useSearchParams();
   const code = searchParams.get('code') || '';
   const scope = searchParams.get('scope');
   const error = searchParams.get('error');
   let loginType = '';

   const handleCallbackGoogle = async () => {
      const res = await socialCallBackAPI({ loginType, code });
      if (res?.status === 200) {
         message?.success('Đăng nhập thành công');
         dispatch(updateInformationUser(res.data.user));
         dispatch(updateToken(res.data.accessToken));
         navigate(PATH_CONSTANTS.HOME);
      } else if (res.status === 409) {
         message?.error(res?.message);
         navigate(PATH_CONSTANTS.SIGN_IN);
      } else {
         message?.error('Có lỗi xảy ra!');
         navigate(PATH_CONSTANTS.SIGN_IN);
      }
   };

   useEffect(() => {
      if (error) {
         message?.error("Đăng nhập thất bại");
         navigate(PATH_CONSTANTS.SIGN_IN);
      }
      // HANDLE DETECT TO LOGIN TYPE (GOOGLE OR FACEBOOK)
      if (scope) {
         if (scope.includes('googleapis.com')) {
            loginType = 'GOOGLE';
            handleCallbackGoogle();
         } else if (scope.includes('facebook.com')) {
            loginType = 'FACEBOOK';
         } else {
            message?.error('Có lỗi xảy ra!');
            navigate(PATH_CONSTANTS.HOME);
         }
      }
   }, [searchParams]);
   return (
      <div className="h-screen flex items-center justify-center">
         <Spin size="large" />
      </div>
   );
};
