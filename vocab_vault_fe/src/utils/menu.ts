import {
   FolderOpenOutlined,
   HomeOutlined,
   QuestionCircleOutlined
} from '@ant-design/icons';
import React from 'react';
import { PATH_CONSTANTS } from './pathConstanst';
import { FaRegCircleCheck } from 'react-icons/fa6';


// key === path
export const MENU_HOME =
   [
      {
         key: PATH_CONSTANTS.HOME,
         icon: React.createElement(HomeOutlined),
         label: "Trang chủ",
         isLogin: false,
      },
      {
         key: PATH_CONSTANTS.DECKS,
         icon: React.createElement(FolderOpenOutlined),
         label: 'Bộ từ vựng của tôi',
         isLogin: true,
      },
      {
         key: PATH_CONSTANTS.CHECK_PAGARAPH,
         icon: React.createElement(FaRegCircleCheck),
         label: 'Kiểm tra đoạn văn',
         isLogin: false,
      },
      {
         key: PATH_CONSTANTS.ABOUT,
         icon: React.createElement(QuestionCircleOutlined),
         label: 'Về chúng tôi',
         isLogin: false,
      },
   ]
