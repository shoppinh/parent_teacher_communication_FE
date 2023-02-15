import 'core-js/es/promise';

if ('fetch' in window) {
    import('./App')
} else {
    import('./polyfill').then(() => {
        import('./App')
    })
}