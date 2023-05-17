import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConstantRoles } from '../utils/constants';
import { default as SiteMap, default as sitemap } from '../utils/sitemap';
import AdminHome from './pages/AdminHome';
import AdminManagement from './pages/AdminManagement';
import Landing from './pages/Landing';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ParentEvent from './pages/ParentEvent';
import ParentHomePage from './pages/ParentHome';
import ParentManagement from './pages/ParentManagement';
import Register from './pages/Register';
import TeacherEvent from './pages/TeacherEvent';
import TeacherHome from './pages/TeacherHome';
import TeacherManagement from './pages/TeacherManagement';
import { RoleBaseProtectedRoute } from './routes';
import ForgotPassword from './pages/ForgotPassword';
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
        <Route path={SiteMap.forgotPassword.link} element={<ForgotPassword />} />
        <Route path={SiteMap.register.link} element={<Register />} />
        <Route path={SiteMap.login.link} element={<Login />} />
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
        <Route
          path={SiteMap.teacherEvent.link}
          element={
            <RoleBaseProtectedRoute
              unAuthenticatedRedirectTo={sitemap.login.link}
              role={ConstantRoles.TEACHER}
              unAuthorizedRedirectTo={sitemap.landing.link}
            >
              <TeacherEvent />
            </RoleBaseProtectedRoute>
          }
        />
        <Route
          path={SiteMap.teacherManagement.link}
          element={
            <RoleBaseProtectedRoute
              unAuthenticatedRedirectTo={sitemap.login.link}
              role={ConstantRoles.TEACHER}
              unAuthorizedRedirectTo={sitemap.landing.link}
            >
              <TeacherManagement />
            </RoleBaseProtectedRoute>
          }
        />
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
        <Route
          path={SiteMap.parentEvent.link}
          element={
            <RoleBaseProtectedRoute
              unAuthenticatedRedirectTo={sitemap.login.link}
              role={ConstantRoles.PARENT}
              unAuthorizedRedirectTo={sitemap.landing.link}
            >
              <ParentEvent />
            </RoleBaseProtectedRoute>
          }
        />
        <Route
          path={SiteMap.parentManagement.link}
          element={
            <RoleBaseProtectedRoute
              unAuthenticatedRedirectTo={sitemap.login.link}
              role={ConstantRoles.PARENT}
              unAuthorizedRedirectTo={sitemap.landing.link}
            >
              <ParentManagement />
            </RoleBaseProtectedRoute>
          }
        />

        <Route
          path={SiteMap.adminHome.link}
          element={
            <RoleBaseProtectedRoute
              unAuthenticatedRedirectTo={sitemap.login.link}
              role={ConstantRoles.SUPER_USER}
              unAuthorizedRedirectTo={sitemap.landing.link}
            >
              <AdminHome />
            </RoleBaseProtectedRoute>
          }
        />
        <Route
          path={SiteMap.adminEvent.link}
          element={
            <RoleBaseProtectedRoute
              unAuthenticatedRedirectTo={sitemap.login.link}
              role={ConstantRoles.SUPER_USER}
              unAuthorizedRedirectTo={sitemap.landing.link}
            >
              <TeacherEvent />
            </RoleBaseProtectedRoute>
          }
        />
        <Route
          path={SiteMap.adminManagement.link}
          element={
            <RoleBaseProtectedRoute
              unAuthenticatedRedirectTo={sitemap.login.link}
              role={ConstantRoles.SUPER_USER}
              unAuthorizedRedirectTo={sitemap.landing.link}
            >
              <AdminManagement />
            </RoleBaseProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
