// Da highlight nos A's do menu lateral
const scrollSpy = () => {
    // faz highlight nos itens do menu lateral de acordo com a seção que está sendo visualizada
    // codigo anteriormente era usado pra diferentes secoes de texto, nao spa,
    // da pra remover algumas coisas e otimizar/encurtar
    const currentPosition = document.documentElement.scrollTop;
    document.querySelectorAll('.content-section').forEach((element) => {
        const elementTop = element.offsetTop - 180;
        const elementHeightInPx = window.getComputedStyle(element, null).getPropertyValue('height');
        let elementHeight;
        if (elementHeightInPx.includes('.')) {
            elementHeight = parseInt(elementHeightInPx.substring(0, elementHeightInPx.indexOf('.')), 10);
        } else {
            elementHeight = parseInt(elementHeightInPx.substring(0, elementHeightInPx.indexOf('p')), 10);
        }
        const elementBottom = elementTop + elementHeight;
        if (currentPosition > elementTop && currentPosition < elementBottom) {
            document.querySelectorAll('a[href^="content-section"]').forEach((element2) => {
                const linterElement = element2;
                linterElement.style.color = '#3c3c3c';
            });
            document.querySelector(`a[href="${element.id}"]`).style.color = '#42A5F5';
        }
    });
};

// Esconde nav, no-unsed-vars porque fiz com onClick, burrice
// eslint-disable-next-line no-unused-vars
const hideLeftNavAndExpandRightCol = (event) => {
    const leftColumn = document.querySelector('#left-column');
    const rightColumn = document.querySelector('#right-column');
    const nav = document.querySelector('nav');
    const arrow = document.querySelector('.fa-angle-double-left');

    leftColumn.classList.add('hideLeftColumn');
    leftColumn.classList.remove('showLeftColumn');

    rightColumn.classList.add('expandRightColumn');
    rightColumn.classList.remove('compressRightColumn');

    nav.classList.add('expandNav');
    nav.classList.remove('compressNav');

    arrow.classList.add('rotateArrow');
    arrow.classList.remove('resetArrow');

    event.currentTarget.setAttribute('onclick', 'showLeftNavAndCompressRightCol(event)');
};

// Mostra nav, no-unsed-vars porque fiz com onClick, burrice
// eslint-disable-next-line no-unused-vars
const showLeftNavAndCompressRightCol = (event) => {
    const leftColumn = document.querySelector('#left-column');
    const rightColumn = document.querySelector('#right-column');
    const nav = document.querySelector('nav');
    const arrow = document.querySelector('.fa-angle-double-left');

    leftColumn.classList.add('showLeftColumn');
    leftColumn.classList.remove('hideLeftColumn');

    rightColumn.classList.add('compressRightColumn');
    rightColumn.classList.remove('expandRightColumn');

    nav.classList.add('compressNav');
    nav.classList.remove('expandNav');

    arrow.classList.add('resetArrow');
    arrow.classList.remove('rotateArrow');

    event.currentTarget.setAttribute('onclick', 'hideLeftNavAndExpandRightCol(event)');
};

// Mostra input de busca de texto
const activateSearch = () => {
    const search = document.querySelector('#search');

    search.classList.remove('hideSearchInput');
    search.classList.add('showSearchInput');

    search.focus();
};

// Reseta o search pro seu estado normal
const deActivateSearch = () => {
    const search = document.querySelector('#search');

    search.classList.remove('showSearchInput');
    search.classList.add('hideSearchInput');
    setTimeout(() => {
        search.value = '';
    }, 400);
};

// Remove highlight dos textos encontrados
const removeAllHighlights = () => {
    const highlightSpans = document.querySelectorAll('.highlight');
    if (highlightSpans.length) {
        document.querySelectorAll('.highlight').forEach((element) => {
            const linterElement = element;
            linterElement.parentElement.innerHTML = element.parentElement.innerHTML.replace('<span class="highlight">', '').replace('</span>', '');
        });
    }
};

// Busca texto na pagina
const ctrlF = (event) => {
    let counter = 0;

    const stuffToSearch = event.currentTarget.value;


    const domAsArray = [document.querySelector('.content')];


    let elemToSearchInsideOf;

    if (stuffToSearch.length < 3) return;

/* eslint-disable */
    while (elemToSearchInsideOf = domAsArray.pop()) {
        if (!elemToSearchInsideOf.textContent.match(stuffToSearch)) continue;
        elemToSearchInsideOf.childNodes.forEach((element, index) => {
            switch (element.nodeType) {
            case Node.TEXT_NODE:
                if (element.textContent.match(stuffToSearch)) {
                    if (!counter) {
                        const topOfElement = elemToSearchInsideOf.offsetTop - 70;
                        window.scroll({
                            top: topOfElement,
                            behavior: 'smooth',
                        });
                        counter++;
                    }

                    elemToSearchInsideOf.innerHTML = elemToSearchInsideOf.innerHTML.replace(stuffToSearch, `<span class="highlight">${stuffToSearch}</span>`);
                }
                break;
            case Node.ELEMENT_NODE:
                domAsArray.push(element);
                break;
            }
        });
    }
/* eslint-enable */
};

// Navega como SPA
const navigation = async (path) => {
    // scroll até o topo da página
    window.scrollTo(0, 0);

    const html = await new Promise((resolve, reject) => {
        fetch('view/' + path + '.html').then((response) => {
            response.text().then(data => resolve(data));
        }).catch((error) => {
            reject(error);
        });
    });

    document.querySelector('#content').innerHTML = html;
};

const fixFooter = () => {
    if (document.querySelector('[id^=content-section]')) {
        document.querySelector('#footer').classList.remove('fixedFooter');
        return;
    }
    document.querySelector('#footer').classList.add('fixedFooter');
};

// // // DOM LISTENERS
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        document.querySelectorAll('.fa-search').forEach((element) => {
            element.addEventListener('click', () => {
                activateSearch();
            });
        });

        document.querySelector('#search').addEventListener('focusout', () => {
            deActivateSearch();
        });

        document.querySelector('#search').addEventListener('input', (event) => {
            removeAllHighlights();
            ctrlF(event);
        });

        document.querySelectorAll('.navigation').forEach((element) => {
            element.addEventListener('click', async (event) => {
                const path = event.target.getAttribute('href');

                event.preventDefault();

                await navigation(path).then(() => {
                    scrollSpy();
                    fixFooter();
                });
            });
        });
    }
};
