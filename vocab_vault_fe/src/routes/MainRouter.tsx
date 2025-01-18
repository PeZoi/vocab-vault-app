import { MainLayout } from 'components';
import { AboutPage, DeckDetailPage, DeckPage, HomePage } from 'pages';
import { ForgotPasswordPage, ResetPasswordPage, SignInPage, SignUpPage, SocialSignInCallback } from 'pages/auth';
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
      {
         path: PATH_CONSTANTS.FORGOT_PASSWORD,
         element: <ForgotPasswordPage />,
      },
      {
         path: PATH_CONSTANTS.RESET_PASSWORD,
         element: <ResetPasswordPage />,
      },
      {
         path: PATH_CONSTANTS.GOOGLE_CALLBACK,
         element: <SocialSignInCallback />,
      },
   ]);
   return <RouterProvider router={router} />;
}
