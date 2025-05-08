import { getAllDeckPublicAPI } from 'apis';
import { DeckItem } from 'components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DeckResponseType } from 'types';
import { PATH_CONSTANTS } from 'utils';

export function HomePage() {
   const [decks, setDecks] = useState<DeckResponseType[]>([]);

   useEffect(() => {
      const fetchGetAllDecks = async () => {
         const res = await getAllDeckPublicAPI();
         if (res.status === 200) {
            setDecks(res.data);
         }
      };
      fetchGetAllDecks();
   }, []);

   return (
      <div>
         <div className="grid grid-cols-5 gap-5">
            {decks.map((deck) => (
               <Link to={PATH_CONSTANTS.DECK_DETAIL.replace(':id', deck.id ? deck.id?.toString() : '0')}>
                  <DeckItem key={deck.id} deck={deck} />
               </Link>
            ))}
         </div>
      </div>
   );
}
