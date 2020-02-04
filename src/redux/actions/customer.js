export const getCustomerBarcode = (payload) => {
    return {
        type: 'GET_CUSTOMER_BY_CODE',
        payload
    }
}

export const onChangeBarcode = (payload) => {
    return {
        type: 'ON_CHANGE_BARCODE',
        payload
    }
}


export const onChangePhone = (payload) => {
    return {
        type: 'ON_CHANGE_PHONE',
        payload
    }
}

export const onChangeScanCustomer = (payload) => {
    return {
        type: 'ON_CHANGE_SCAN_CUSTOMER',
        payload
    }
}


export const getCustomerPhone = (payload) => {
    return {
        type: 'GET_CUSTOMER_BY_PHONE',
        payload
    }
}

export const collectPoint = (payload) => {
    return {
        type: 'COLLECT_POINT',
        payload
    }
}

export const collectPointSuccess = (payload) => {
    return {
        type: 'COLLECT_POINT_SUCCESS',
        payload
    }
}


export const checkSearchPhone = (payload) => {
    return {
        type: 'CHECK_SEARCH_PHONE',
        payload
    }
}

export const createCustomer = (payload) => {
    return {
        type: 'CREATE_CUSTOMER',
        payload
    }
}

export const getDistrict = (payload) => {
    return {
        type: 'GET_DISTRICT',
        payload
    }
}

export const getWards = (payload) => {
    return {
        type: 'GET_WARDS',
        payload
    }
}

export const getStreet = (payload) => {
    return {
        type: 'GET_STREET',
        payload
    }
}

export const getOrderList = (payload) => {
    return {
        type: 'GET_ORDER_LIST',
        payload
    }
}

export const detailOrder = (payload) => {
    return {
        type: 'DETAIL_ORDER',
        payload
    }
}

export const chooseCity = (payload) => {
    return {
        type: 'CHOOSE_CITY',
        payload
    }
}

export const chooseDistrict = (payload) => {
    return {
        type: 'CHOOSE_DISTRICT',
        payload
    }
}

export const chooseWards = (payload) => {
    return {
        type: 'CHOOSE_WARDS',
        payload
    }
}

export const chooseStreet = (payload) => {
    return {
        type: 'CHOOSE_STREET',
        payload
    }
}

export const chooseArea = (payload) => {
    return {
        type: 'CHOOSE_AREA',
        payload
    }
}

export const getArea = (payload) => {
    return {
        type: 'GET_AREA',
        payload
    }
}

export const setDataOrderList = (payload) => {
    return {
        type: 'GET_ORDER_LIST_SUCCESS',
        payload
    }
}

export const scanPromotion = (payload) => {
    return {
        type: 'SCAN_PROMOTION',
        payload
    }
}

export const useVouncher = (payload) => {
    return {
        type: 'USE_VOUNCHER',
        payload
    }
}

export const submitOrder = (payload) => {
    return {
        type: 'SUBMIT_ORDER',
        payload
    }
}

export const resetSubmitOrder = () => {
    return {
        type: 'SUBMIT_ORDER_SUCCESS',
        payload : false
    }
}

export const searchOrderList = (payload) => {
    return {
        type: 'SEARCH_ORDER_LIST',
        payload
    }
}
export const searchOrderListHistory = (payload) => {
    return {
        type: 'SEARCH_ORDER_LIST_HISTORY',
        payload
    }
}

export const detailOrderHistory = (payload) => {
    return {
        type: 'DETAIL_ORDER_HISTORY',
        payload
    }
}





