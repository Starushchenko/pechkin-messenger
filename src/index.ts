import {Router} from './utils/router/router';
import {ROUTES} from './constants/constants';

import AuthPage from './pages/auth/auth';
import RegisterPage from './pages/register/register';
import ChatsPage from './pages/chats/chats';
import ChatPage from './pages/chat/chat';
import ChangeSettings from './pages/change-settings/change-settings';
import ChangePassword from './pages/change-password/change-password';
import ProfilePage from './pages/profile/profile';
import Page500 from './pages/error-500/error-500';
import Page404 from './pages/error-404/error-404';
import LinksPage from './pages/links/links';

const router = new Router('#app', ROUTES.ERROR_404)

router
  .use(ROUTES.AUTH, AuthPage)
  .use(ROUTES.REGISTER, RegisterPage)
  .use(ROUTES.CHATS, ChatsPage)
  .use(ROUTES.CHAT, ChatPage)
  .use(ROUTES.CHANGE_SETTINGS, ChangeSettings)
  .use(ROUTES.CHANGE_PASSWORD, ChangePassword)
  .use(ROUTES.PROFILE, ProfilePage)
  .use(ROUTES.ERROR_500, Page500)
  .use(ROUTES.ERROR_404, Page404)
  .use(ROUTES.HOME, ChatsPage)
  .use(ROUTES.LINKS, LinksPage)
  .start()
