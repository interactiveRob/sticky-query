import browserEnv from 'browser-env';

browserEnv(['window', 'document'], {
    url: 'https://localhost/?test-param=1&another-test=2&final-test=3',
});
