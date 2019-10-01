import test from 'ava';
import StickyQuery from '../src/sticky-query';
import { getValidLinks, getSampleData } from './helpers/utils';

test.before((t) => {
    let { div, links } = getSampleData();

    new StickyQuery.init();

    t.context = {
        markup: div.innerHTML,
        links,
        validLinks: getValidLinks(links),
    };
});

test('Data Attributes are Added', (t) => {
    let context = t.context;

    t.is(context.validLinks.length, 2);
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
