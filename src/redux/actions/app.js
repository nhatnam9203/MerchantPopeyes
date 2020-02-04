export const changeLanguage = (language) => {
    return {
        type: 'CHANGE_LANGUAGE',
        language
    }
}

export const setTextError = (payload) => {
    return {
        type: 'SET_TEXT_ERROR',
        payload
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

export function loadingTask() {
    return {
        type: 'LOADING_TASK',
    }
}

export function stopLoadingTask() {
    return {
        type: 'STOP_LOADING_TASK',
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

export const handleBack = () => {
    return {
        type: 'HANDLE_BACK',
    }
}

