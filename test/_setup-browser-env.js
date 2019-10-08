import browserEnv from 'browser-env';
import config from './_config';

browserEnv(['window', 'document'], {
    url: `https://localhost/${config.queryString}`,
});
