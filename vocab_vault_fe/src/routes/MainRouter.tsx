import { MainLayout } from 'components';
import { AboutPage, DeckDetailPage, DeckPage, HomePage } from 'pages';
import { SignInPage, SignUpPage } from 'pages/auth';
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
            {
               path: PATH_CONSTANTS.DECK_DETAIL,
               element: <DeckDetailPage />,
            },
         ],
      },
      {
         path: PATH_CONSTANTS.SIGN_IN,
         element: <SignInPage />,
      },
      {
         path: PATH_CONSTANTS.SIGN_UP,
         element: <SignUpPage />,
      },
   ]);
   return <RouterProvider router={router} />;
}
