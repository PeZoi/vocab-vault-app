import { Avatar, Button, Dropdown, Layout, MenuProps } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import ICON from 'assets/icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router';
import { logOutAPI } from 'apis';
import { logout } from 'pages/auth';
import { PATH_CONSTANTS } from 'utils';
import { Link } from 'react-router-dom';
const { Header: Headerr } = Layout;

export const Header: React.FC = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const items: MenuProps['items'] = [
      {
         key: '1',
         label: (
            <p className="flex items-center gap-3">
               <CgProfile />
               <span>Thông tin cá nhân</span>
            </p>
         ),
         onClick: () => {
            navigate(PATH_CONSTANTS.PROFILE);
         },
      },
      {
         key: '2',
         label: (
            <p className="flex items-center gap-3 text-red-500">
               <LogoutOutlined />
               <span>Đăng xuất</span>
            </p>
         ),
         onClick: async () => {
            await logOutAPI();
            dispatch(logout());
         },
      },
   ];
   const { user } = useSelector((state: any) => state.auth);
   return (
      <Headerr className="bg-white px-0 flex items-center">
         <div className="flex items-center justify-between flex-1 px-5">
            <img src={ICON} alt="icon" className="size-20" />
            {user ? (
               <>
                  <Dropdown menu={{ items }} placement="bottomRight" className="cursor-pointer">
                     <Avatar src={<img src={user?.avatar} alt="avatar" />} />
                  </Dropdown>
               </>
            ) : (
               <div className="flex gap-2">
                  <Link to={PATH_CONSTANTS.SIGN_UP} className="w-fit h-fit">
                     <Button>Đăng ký</Button>
                  </Link>
                  <Link to={PATH_CONSTANTS.SIGN_IN}>
                     <Button className="bg-primary border border-primary text-white">Đăng nhập</Button>
                  </Link>
               </div>
            )}
         </div>
      </Headerr>
   );
};
