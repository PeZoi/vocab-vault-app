import { MainLayout } from 'components';
import { AboutPage, CardMatchPage, CheckParaGraphPage, DeckDetailPage, DeckPage, FlashCardPage, ForgotPasswordPage, HomePage, MultipleChoicePage, ResetPasswordPage, SignInPage, SignUpPage, SocialSignInCallback } from 'pages';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { PATH_CONSTANTS } from 'utils';

export function MainRouter() {
   const router = createBrowserRouter([
      {
         path: PATH_CONSTANTS.HOME,
         element: <MainLayout />, // MainLayout chỉ khai báo 1 lần ở đây
         children: [
            {
               index: true,
               element: <HomePage />,
            },
            {
               path: PATH_CONSTANTS.ABOUT,
               element: <AboutPage />,
            },
            {
               path: PATH_CONSTANTS.DECKS,
               element: <DeckPage />,
            },
            {
               path: PATH_CONSTANTS.DECK_DETAIL,
               element: <DeckDetailPage />,
            },
            {
               path: PATH_CONSTANTS.FLASH_CARD,
               element: <FlashCardPage />,
            },
            {
               path: PATH_CONSTANTS.CARD_MATCH,
               element: <CardMatchPage />,
            },
            {
               path: PATH_CONSTANTS.MUTIPLE_CHOICE,
               element: <MultipleChoicePage />,
            },
            {
               path: PATH_CONSTANTS.CHECK_PAGARAPH,
               element: <CheckParaGraphPage />,
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
