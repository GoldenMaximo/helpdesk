// const verifyIfTheresURLParam = () => {
//     // verifica se alguém entrou na página em busca de uma seção específica
//     const currentURL = window.location.href;
//     if (!currentURL.includes('#')) return;
//     const elementId = window.location.href.substr(window.location.href.indexOf('#'));
//     const topOfElement = document.querySelector(elementId).offsetTop - 70;
//     window.scroll({
//         top: topOfElement,
//         behavior: 'smooth',
//     });
// };

// const selectMenuItem = () => {
//     // adiciona scroll aos itens do menu
//     document.querySelectorAll('a[href^="#"]').forEach((element) => {
//         element.addEventListener('click', () => {
//             const href = element.getAttribute('href');
//             event.preventDefault();
//             const topOfElement = document.querySelector(href).offsetTop - 70;
//             window.scroll({
//                 top: topOfElement,
//                 behavior: 'smooth',
//             });
//         });
//     });
// };

// window.onscroll = () => {
//     scrollSpy();
// };
