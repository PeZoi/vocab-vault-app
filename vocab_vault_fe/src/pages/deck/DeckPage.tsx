import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Empty, Typography } from 'antd';
import { DeckItem } from 'components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH_CONSTANTS } from 'utils';
import { DeckFormModal } from './components';

export function DeckPage() {
   const [open, setOpen] = useState(false);

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
         <h2 className="text-2xl uppercase font-bold">Bộ từ vựng của tôi (7)</h2>
         <Divider />
         <div>
            <Button type="dashed" className="size-32 flex flex-col" onClick={showModal}>
               <PlusCircleOutlined style={{ fontSize: '24px' }} />
               <p>Tạo mới</p>
            </Button>
         </div>
         <Divider />
         <div className="grid grid-cols-5 gap-5">
            {Array(10)
               .fill(false)
               .map((_, index) => (
                  <Link to={PATH_CONSTANTS.DECK_DETAIL.replace(':id', index.toString())}>
                     <DeckItem key={index} />
                  </Link>
               ))}
         </div>

         <DeckFormModal open={open} setOpen={setOpen} />
      </div>
   );
}
