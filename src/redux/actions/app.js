export const changeLanguage = (language) => {
    return {
        type: 'CHANGE_LANGUAGE',
        language
    }
}
export function loadingApp() {
    return {
        type: 'LOADING_ROOT',
    }
}

export function stopLoadingApp() {
    return {
        type: 'STOP_LOADING_ROOT',
    }
}

export const showKeyBoard = () => {
    return {
        type: 'SHOW_KEYBOARD',
    }
}

export const hideKeyBoard = () => {
    return {
        type: 'HIDE_KEYBOARD',
    }
}