import { message } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { getProfileAPI } from 'apis';
import { updateInformationUser } from 'pages/auth';
import { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MainRouter } from 'routes';

export const MessageContext = createContext<null | MessageInstance>(null);

function App() {
   const [messageApi, contextHolder] = message.useMessage();
   const { accessToken } = useSelector((state: any) => state.auth);
   const dispatch = useDispatch();

   useEffect(() => {
      const fetchGetProfile = async () => {
         const res = await getProfileAPI();

         if (res.status === 200) {
            dispatch(updateInformationUser(res.data));
         }
      };

      if (accessToken) {
         fetchGetProfile();
      }
   }, [accessToken]);

   return (
      <>
         {contextHolder}
         <MessageContext.Provider value={messageApi}>
            <MainRouter />
         </MessageContext.Provider>
      </>
   );
}
export default App;
