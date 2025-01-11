import {
   FolderOpenOutlined,
   HomeOutlined,
   QuestionCircleOutlined
} from '@ant-design/icons';
import React from 'react';
import { PATH_CONSTANTS } from './pathConstanst';


// key === path
export const MENU_HOME =
   [
      {
         key: PATH_CONSTANTS.HOME,
         icon: React.createElement(HomeOutlined),
         label: "Trang chủ",
      },
      {
         key: PATH_CONSTANTS.DECKS,
         icon: React.createElement(FolderOpenOutlined),
         label: 'Bộ từ vựng của bạn',
      },
      {
         key: PATH_CONSTANTS.ABOUT,
         icon: React.createElement(QuestionCircleOutlined),
         label: 'Về chúng tôi',
      },
   ]
