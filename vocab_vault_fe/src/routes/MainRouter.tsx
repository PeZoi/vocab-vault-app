import { MainLayout } from 'components';
import { AboutPage, DeckPage, HomePage } from 'pages';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { PATH_CONSTANTS } from 'utils';

export function MainRouter() {
   const router = createBrowserRouter([
      {
         path: PATH_CONSTANTS.HOME,
         element: <MainLayout />, // MainLayout chỉ khai báo 1 lần ở đây
         children: [
            {
               index: true, // Tương đương với path: '/'
               element: <HomePage />, // Trang chủ
            },
            {
               path: PATH_CONSTANTS.ABOUT,
               element: <AboutPage />, // Trang về
            },
            {
               path: PATH_CONSTANTS.DECKS,
               element: <DeckPage />, // Trang decks
            },
         ],
      },
   ]);
   return <RouterProvider router={router} />;
}
