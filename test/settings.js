import test from 'ava';
import StickyQuery from '../src/sticky-query';
import { getValidLinks, getSampleData } from './helpers/utils';

test('Will not apply to these links by default', (t) => {
    let { links } = getSampleData(`
        <!-- Internal anchor links -->
        <a href="#about-us">About us</a>
        
        <!-- JavaScript dummy links -->
        <a href="javascript:;">Sign up</a>
        
        <!-- Links that already include a query string -->
        <a href="https://google.com/?utm_content=example">Go to google</a>
        
        <!-- Links with the class "sticky-query-ignore" -->
        <a class="sticky-query-ignore" href="/about-us">About us</a>
    `);

    let validLinks = getValidLinks(links);

    t.is(validLinks.length, 0);
});

test('Correct link count for `excludeCustom`', (t) => {
    let { links } = getSampleData();

    new StickyQuery.init({
        excludeCustom: '.my-ignore',
    });

    let validLinks = getValidLinks(links);

    t.is(validLinks.length, 1);
});

test('Correct link count for `limitAllowedKeys`', (t) => {
    let { links } = getSampleData();

    new StickyQuery.init({
        allowedKeys: 'test-param, final-test',
    });

    let validLinks = getValidLinks(links);

    t.plan(validLinks.length);

    validLinks.forEach((link) => {
        let test = [
            link.href.includes('test-param=1'),
            !link.href.includes('another-test=2'),
            link.href.includes('final-test=3'),
        ].every(Boolean);

        t.true(test);
    });
});

test('Correct link count for `excludeHasQuery`', (t) => {
    let { links, div } = getSampleData();

    new StickyQuery.init({
        excludeHasQuery: true,
    });

    let validLinks = getValidLinks(links);

    t.is(validLinks.length, 2);
});
