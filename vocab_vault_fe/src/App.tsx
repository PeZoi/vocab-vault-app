import { getProfileAPI } from 'apis';
import { updateInformationUser } from 'pages/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MainRouter } from 'routes';

function App() {
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
         <MainRouter />
      </>
   );
}
export default App;
