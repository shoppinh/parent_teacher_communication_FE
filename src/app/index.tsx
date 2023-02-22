import React from 'react';
import { FontStyle, GlobalStyle } from '../styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { CustomIconStyle } from '../styles/font-styles';
import SiteMap from '../utils/sitemap';
import { RoleBaseProtectedRoute } from './routes';
import { ConstantRoles } from '../utils/constants';
import TeacherHomePage from './pages/TeacherHomePage';
import Login from './pages/Login';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

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
        {/* <meta http-equiv="Content-Security-Policy" content="default-src 'self' *.muangay-vn.com *.googletagmanager.com  *.google-analytics.com *.gstatic.com *.gravatar.com *.googleapis.com *.google.com data: gap: 'unsafe-inline' 'unsafe-eval'; base-uri 'self';"></meta> */}
      </Helmet>
      <Routes>
        {/*<Route*/}
        {/*  path={SiteMap.parentHome.link}*/}
        {/*  element={*/}
        {/*    <RoleBaseProtectedRoute*/}
        {/*      unAuthenticatedRedirectTo={SiteMap.landing.link}*/}
        {/*      role={ConstantRoles.PARENT}*/}
        {/*      unAuthorizedRedirectTo={SiteMap.login.link}*/}
        {/*    >*/}
        {/*      <TeacherHomePage />*/}
        {/*    </RoleBaseProtectedRoute>*/}
        {/*  }*/}
        {/*/>*/}
        <Route path={SiteMap.teacherHome.link} element={<TeacherHomePage />} />
        <Route path={SiteMap.login.link} element={<Login />} />
        <Route path={SiteMap.landing.link} element={<Landing />} />
        <Route path={SiteMap.register.link} element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
