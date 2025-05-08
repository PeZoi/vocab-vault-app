import { MessageContext } from 'App';
import { useContext } from 'react';

export const useMessage = () => {
   const message = useContext(MessageContext);
   return message;
}
