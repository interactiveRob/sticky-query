import test from 'ava';
import StickyQuery from '../src/sticky-query';

test.beforeEach((t) => {
    let div = document.createElement('div');

    div.innerHTML = `
        <div class="load-over">
            <a href="https://gewgle.com#roshna">Gewgle.com</a>
            <a href="https://google.com">Google.com</a>
            <a href="#about-us">Google.com</a>
            <a class="my-ignore" href="https://yahoo.com">Yahoo.com</a>
        </div>
    `;

    document.querySelector('body').appendChild(div);

    new StickyQuery.init();

    t.context = {
        markup: div,
        links: [...div.querySelectorAll('a')],
    };
});

test('Data Attributes are Added', (t) => {
    let { links } = t.context;
    let validLinks = links.filter((l) => l.hasAttribute('data-sticky-query'));
    let invalidLinks = links.filter((l) => l.classList.contains('my-ignore'));

    console.log(window.location);

    t.is(validLinks.length, 3);
    t.is(invalidLinks.length, 1);
});
