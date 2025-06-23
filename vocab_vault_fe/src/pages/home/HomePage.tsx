import { Skeleton } from 'antd';
import { DeckItem } from 'components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllPublicDecksQuery } from 'redux/api/deckApi';
import { DeckResponseType } from 'types';
import { PATH_CONSTANTS } from 'utils';

export function HomePage() {
   const [searchTerm, setSearchTerm] = useState('');
   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

   const { data: decks, isLoading } = useGetAllPublicDecksQuery();

   const filteredAndSortedDecks = (decks || [])
      .filter((deck: DeckResponseType) => 
         deck.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a: DeckResponseType, b: DeckResponseType) => {
         const dateA = new Date(a.createAt || 0).getTime();
         const dateB = new Date(b.createAt || 0).getTime();
         return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });

   return (
      <div className="p-4">
         <div className="mb-6 flex items-center gap-4">
            <input
               type="text"
               placeholder="Tìm kiếm bộ từ vựng theo tên..."
               className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
               className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               value={sortOrder}
               onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            >
               <option value="desc">Mới nhất</option>
               <option value="asc">Cũ nhất</option>
            </select>
         </div>
         <div className="grid grid-cols-5 gap-5">
            {isLoading && Array.from({ length: 13 }).map((_, index) => (
               <Skeleton.Node key={index} active className='min-w-full min-h-[200px]' />
            ))}
            {decks && filteredAndSortedDecks.map((deck: DeckResponseType) => (
               <Link 
                  key={deck.id}
                  to={PATH_CONSTANTS.DECK_DETAIL.replace(':id', deck.id ? deck.id?.toString() : '0')}
               >
                  <DeckItem deck={deck} />
               </Link>
            ))}
         </div>
      </div>
   );
}
