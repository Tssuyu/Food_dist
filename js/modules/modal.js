function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerID) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerID) clearInterval(modalTimerID);
    
}

let modalDisabled = false;

function disableModalByScroll() {
    modalDisabled = true;
}

function modal(triggerSelector, modalSelector, modalTimerID) {
    // Modal

    const   modalOpenBtns = document.querySelectorAll(triggerSelector),
            modalWindow = document.querySelector(modalSelector);

    modalOpenBtns.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerID));
    })

    modalWindow.addEventListener('click', (e) => {  
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            e.preventDefault();
            closeModal(modalSelector);
        }
    })

    function showModalAtScrollEnd() {
        if (!modalDisabled && window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerID);
            window.removeEventListener('scroll', showModalAtScrollEnd);
        }
    }

    window.addEventListener('scroll', showModalAtScrollEnd);
}

export default modal;
export {openModal, closeModal, disableModalByScroll};