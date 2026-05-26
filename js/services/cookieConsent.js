window.addEventListener('DOMContentLoaded', () => {
    const   cookieStorage = {
                getItem: (key) => {
                    const cookies = document.cookie.split(';')
                                                    .map(cookie => cookie.split('='))
                                                    .reduce((acc, [key, value]) => ({...acc, [key.trim()] : value}), {});
                    return cookies[key];
                },

                setItem: (key, value) => {
                    document.cookie = `${key}=${value};expires=Sun, 16 July 3567 06-23-41 GTM`;
                }
            },
            storageType = cookieStorage;
            consentPropertyType = 'site_consent',
            popup = document.querySelector('.popup'),
            btnConfirm = document.querySelector('[data-confirm]'),
            btnCancel = document.querySelector('[data-cancel]'),
            hasConsented = () => storageType.getItem(consentPropertyType) === 'true' ? true : false,
            toggleStorage = (prop) => storageType.setItem(consentPropertyType, prop);
            

    if (hasConsented()) {
        console.log("Loading...");
    } else {
        popup.classList.add('popup_active');
    }

    btnConfirm.addEventListener('click', () => {
        toggleStorage(true);
        popup.classList.remove('popup_active');
        console.log("Loading...");
    })

    btnCancel.addEventListener('click', () => {
        toggleStorage(false);
        popup.classList.remove('popup_active');
        console.log("Canceled...");
    })

})
