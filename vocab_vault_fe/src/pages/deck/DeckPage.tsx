import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Empty, Typography } from 'antd';
import { getAllMyDeckAPI } from 'apis';
import { DeckItem } from 'components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DeckResponseType } from 'types';
import { PATH_CONSTANTS } from 'utils';
import { DeckFormModal } from './components';

export function DeckPage() {
   const [open, setOpen] = useState(false);
   const [myDecks, setMyDecks] = useState<DeckResponseType[]>([]);
   const [rerender, setRerender] = useState(false);
   useEffect(() => {
      const fetchMyDecks = async () => {
         const res = await getAllMyDeckAPI();
         if (res.status === 200) {
            setMyDecks(res.data);
         }
      };
      fetchMyDecks();
   }, [rerender]);

   const showModal = () => {
      setOpen(true);
   };

   // Component EmptyDeck (When user haven't created a deck yet)
   const EmptyDeck = () => {
      return (
         <div className="my-20">
            <Empty description={<Typography.Text>Bạn chưa có bộ từ vựng nào</Typography.Text>}>
               <Button type="primary" onClick={showModal}>
                  Tạo ngay
               </Button>
            </Empty>
         </div>
      );
   };

   return (
      <div>
         <h2 className="text-2xl uppercase font-bold">Bộ từ vựng của tôi ({myDecks.length})</h2>
         <Divider />
         {myDecks.length === 0 ? (
            <div className="flex items-center justify-center">
               <EmptyDeck />
            </div>
         ) : (
            <>
               <div>
                  <Button type="dashed" className="size-32 flex flex-col" onClick={showModal}>
                     <PlusCircleOutlined style={{ fontSize: '24px' }} />
                     <p>Tạo mới</p>
                  </Button>
               </div>
               <Divider />
               <div className="grid grid-cols-5 gap-5">
                  {myDecks.map((deck) => (
                     <Link to={PATH_CONSTANTS.DECK_DETAIL.replace(':id', deck.id ? deck.id?.toString() : '0')}>
                        <DeckItem key={deck.id} deck={deck} />
                     </Link>
                  ))}
               </div>
            </>
         )}

         <DeckFormModal open={open} setOpen={setOpen} rerender={rerender} setRerender={setRerender} />
      </div>
   );
}
