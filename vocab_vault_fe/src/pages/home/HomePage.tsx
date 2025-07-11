import { Divider, Skeleton } from 'antd';
import { DeckItem } from 'components';
import { useSEO } from 'hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllPublicDecksQuery } from 'redux/api/deckApi';
import { DeckResponseType } from 'types';
import { PATH_CONSTANTS, generateWebsiteStructuredData } from 'utils';

export function HomePage() {
   const [searchTerm, setSearchTerm] = useState('');
   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

   const { data: decks, isLoading } = useGetAllPublicDecksQuery();

   // SEO optimization for home page
   useSEO({
      title: 'Vocab Vault',
      description: 'Khám phá hàng ngàn bộ từ vựng và thành thạo từ mới với flashcard tương tác, trò chơi ghép thẻ và bài kiểm tra. Bắt đầu học từ vựng hiệu quả ngay hôm nay!',
      keywords: 'học từ vựng, flashcard, bộ từ vựng, học tiếng anh, thẻ học tập, trò chơi từ vựng, nền tảng giáo dục',
      url: 'https://vocab-vault.site',
      type: 'website',
      structuredData: generateWebsiteStructuredData()
   });

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
               aria-label="Tìm kiếm bộ từ vựng"
            />
            <select
               className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               value={sortOrder}
               onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
               aria-label="Thứ tự sắp xếp"
            >
               <option value="desc">Mới nhất</option>
               <option value="asc">Cũ nhất</option>
            </select>
         </div>

         {/* Main content with semantic HTML */}
         <main>
            <section aria-label="Bộ Từ Vựng">
               <h2 className="sr-only">Các Bộ Từ Vựng Có Sẵn</h2>
               <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5">
                  {isLoading && Array.from({ length: 13 }).map((_, index) => (
                     <Skeleton.Node key={index} active className='min-w-full min-h-[200px]' />
                  ))}
                  {decks && filteredAndSortedDecks.map((deck: DeckResponseType) => (
                     <Link 
                        key={deck.id}
                        to={PATH_CONSTANTS.DECK_DETAIL.replace(':id', deck.id ? deck.id?.toString() : '0')}
                        aria-label={`Học bộ từ vựng ${deck.title}`}
                     >
                        <DeckItem deck={deck} />
                     </Link>
                  ))}
               </div>
            </section>
         </main>

         <Divider />

         {/* SEO content section */}
         <section className="mt-12 prose max-w-none bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
            <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
               Tại Sao Chọn Vocab Vault Để Học Từ Vựng ?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100">
                  <div className="flex items-center mb-4">
                     <span className="text-3xl text-blue-500 mr-4">🎮</span>
                     <h3 className="text-2xl font-bold text-blue-700">Chế Độ Học Tương Tác</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                     Thành thạo từ vựng thông qua nhiều phương pháp học tập đa dạng và thú vị. Từ flashcard sinh động đến trò chơi ghép thẻ hấp dẫn, bài kiểm tra trắc nghiệm và bài tập đọc hiểu chuyên sâu.
                  </p>
                  <p className="text-gray-600 italic">
                     "Học tập chưa bao giờ thú vị đến thế với các hoạt động tương tác đa dạng!"
                  </p>
               </div>

               <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
                  <div className="flex items-center mb-4">
                     <span className="text-3xl text-purple-500 mr-4">✨</span>
                     <h3 className="text-2xl font-bold text-purple-700">Bộ Từ Vựng Tùy Chỉnh</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                     Tạo và tùy chỉnh bộ từ vựng theo sở thích và mục tiêu của riêng bạn. Với công nghệ lặp lại ngắt quãng thông minh, việc học từ vựng trở nên hiệu quả và phù hợp với từng cá nhân.
                  </p>
                  <p className="text-gray-600 italic">
                     "Tự do điều chỉnh lộ trình học tập theo đúng nhịp độ của bạn!"
                  </p>
               </div>

               <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-green-100">
                  <div className="flex items-center mb-4">
                     <span className="text-3xl text-green-500 mr-4">📊</span>
                     <h3 className="text-2xl font-bold text-green-700">Theo Dõi Tiến Độ</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                     Theo dõi hành trình học tập của bạn với hệ thống phân tích chi tiết và trực quan. Xem được điểm mạnh, điểm yếu và xu hướng học tập qua thời gian với các biểu đồ và thống kê chuyên sâu.
                  </p>
                  <p className="text-gray-600 italic">
                     "Dữ liệu chi tiết giúp bạn học tập hiệu quả hơn mỗi ngày!"
                  </p>
               </div>

               <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-100">
                  <div className="flex items-center mb-4">
                     <span className="text-3xl text-orange-500 mr-4">🌍</span>
                     <h3 className="text-2xl font-bold text-orange-700">Bộ Từ Cộng Đồng</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                     Khám phá kho tàng từ vựng đa dạng được đóng góp bởi cộng đồng người học toàn cầu. Từ các chủ đề cơ bản đến chuyên ngành, từ cấp độ sơ cấp đến nâng cao, tất cả đều có sẵn để bạn khám phá.
                  </p>
                  <p className="text-gray-600 italic">
                     "Học hỏi từ cộng đồng và chia sẻ kiến thức với mọi người!"
                  </p>
               </div>
            </div>
         </section>
      </div>
   );
}
