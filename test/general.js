import test from 'ava';
import StickyQuery from '../src/sticky-query';
import { getValidLinks, getSampleData } from './helpers/utils';
import config from './_config';

test.before((t) => {
    let { div, links } = getSampleData();

    new StickyQuery.init({
    });

    t.context = {
        div,
        markup: div.innerHTML,
        links,
        validLinks: getValidLinks(links),
    };
});

test('Data Attributes are Added', (t) => {
    let { validLinks } = t.context;

    t.is(validLinks.length, 2);
});

test('Correct query string is added', (t) => {
    let { validLinks } = t.context;

    t.true(validLinks.every((link) => link.href.includes(config.queryString)));
});

test('Links have expected URL parameters', (t) => {
    let { validLinks } = t.context;

    t.plan(validLinks.length);

    validLinks.forEach((link) => {
        let test = [
            link.href.includes('test-param=1'),
            link.href.includes('another-test=2'),
        ].every(Boolean);

        t.true(test);
    });
});

test('Hashed links maintain hash', (t) => {
    let { validLinks } = t.context;

    let link = validLinks.find((link) => link.dataset.test);

    if (!link) t.fail();

    t.true(link.href.includes('#has-hash'));
});

test('Destroying works', (t) => {
    let { div, links } = t.context;

    console.log('BEFORE DESTROY');
    links.forEach((l) => console.log(l.href));

    StickyQuery.destroy();

    let newLinks = [...div.querySelectorAll('a')];

    console.log('AFTER DESTROY');
    newLinks.forEach((l) => console.log(l.href));

    t.true(newLinks.every((link) => !link.href.includes(config.queryString) || link.href.includes(window.location.href)));
});
