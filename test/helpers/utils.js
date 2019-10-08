export let getValidLinks = (links) =>
    links.filter((l) => l.hasAttribute('data-sticky-query'));

export let getSampleData = (html = false) => {
    let div = document.createElement('div');

    div.innerHTML =
        html ||
        `
            <div>
                <a data-test="true" href="https://gewgle.com#has-hash">Gewgle.com</a>
                <a href="https://google.com?google=1#has-hash">Google.com</a>
                <a href="#about-us">Google.com</a>
                <a class="my-ignore" href="https://yahoo.com">Yahoo.com</a>
            </div>
        `;

    document.querySelector('body').appendChild(div);

    let links = [...div.querySelectorAll('a')];

    return {
        div,
        links,
    };
};
