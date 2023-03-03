import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SiteMap from '../utils/sitemap';
import sitemap from '../utils/sitemap';
import Landing from './pages/Landing';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import TeacherHome from './pages/TeacherHome';
import TeacherEvent from './pages/TeacherEvent';
import TeacherManagement from './pages/TeacherManagement';
import { RoleBaseProtectedRoute } from './routes';
import { ConstantRoles } from '../utils/constants';
import ParentHomePage from './pages/ParentHome';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate='%s - ParTe'
        defaultTitle='ParTe'
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name='description' content='ParTe' />
        <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
        <link rel='preconnect' href={process.env.REACT_APP_API_URL} />
      </Helmet>
      <Routes>
        <Route path={SiteMap.landing.link} element={<Landing />} />
        <Route path={SiteMap.register.link} element={<Register />} />
        <Route
          path={SiteMap.teacherHome.link}
          element={
            <RoleBaseProtectedRoute
              unAuthenticatedRedirectTo={sitemap.login.link}
              role={ConstantRoles.TEACHER}
              unAuthorizedRedirectTo={sitemap.landing.link}
            >
              <TeacherHome />
            </RoleBaseProtectedRoute>
          }
        />
        <Route path={SiteMap.teacherEvent.link} element={<TeacherEvent />} />
        <Route path={SiteMap.teacherManagement.link} element={<TeacherManagement />} />
        <Route path={SiteMap.login.link} element={<Login />} />
        <Route
          path={SiteMap.parentHome.link}
          element={
            <RoleBaseProtectedRoute
              unAuthenticatedRedirectTo={sitemap.login.link}
              role={ConstantRoles.PARENT}
              unAuthorizedRedirectTo={sitemap.landing.link}
            >
              <ParentHomePage />
            </RoleBaseProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
