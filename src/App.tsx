import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';

// Use consistent styling
// import 'sanitize.css/sanitize.css';

import {App} from './app/loadable';

import {HelmetProvider} from 'react-helmet-async';

// import {configureAppStore} from 'store/configureStore';

import {ThemeProvider} from 'styles/theme/ThemeProvider';

// import reportWebVitals from 'reportWebVitals';

// Initialize languages
import './locales/i18n';
import {BrowserRouter} from "react-router-dom";
import store from 'store';
import {createRoot} from 'react-dom/client';

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Roboto', {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load(null, 5000).then(() => {
    document.body.classList.add('fontLoaded');
}).catch(() => {
});


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Provider store={store}>
    <ThemeProvider>
        <HelmetProvider>
            <React.StrictMode>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </React.StrictMode>
        </HelmetProvider>
    </ThemeProvider>
</Provider>);


// Hot reloadable translation json files
if (module.hot) {
    module.hot.accept(['./locales/i18n'], () => {
        // No need to render the App again because i18next works with the hooks
    });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();