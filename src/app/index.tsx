import React from 'react';
import { FontStyle, GlobalStyle } from '../styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { CustomIconStyle } from '../styles/font-styles';
import SiteMap from '../utils/sitemap';
import { RoleBaseProtectedRoute } from './routes';
import { ConstantRoles } from '../utils/constants';

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
        {/*<Route path={SiteMap.landing.link} element={<LandingPage/>}/>*/}
        {/*<Route path={SiteMap.login.link} element={<LoginPage/>}/>*/}
        {/*<Route path={SiteMap.register.link} element={<RegisterPage/>}/>*/}
        {/*<Route path={SiteMap.teacherHome.link} element={<TeacherHomePage/>}/>*/}
        {/*<Route path={SiteMap.adminHome.link} element={<AdminHomePage/>}/>*/}
        <Route
          path={SiteMap.parentHome.link}
          element={
            <RoleBaseProtectedRoute
              unAuthenticatedRedirectTo={SiteMap.login.link}
              role={ConstantRoles.PARENT}
              unAuthorizedRedirectTo={SiteMap.landing.link}
            >
              <></>
            </RoleBaseProtectedRoute>
          }
        ></Route>
      </Routes>
      <GlobalStyle />
      <FontStyle />
      <CustomIconStyle />
    </BrowserRouter>
  );
}
