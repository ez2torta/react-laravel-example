const initialState = {
    user: {},
    isAdmin: false,
    loginStatus: 'complete'
}

const authReducer = function (state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_STATUS':
            return Object.assign({}, state, {
                loginStatus: action.status
            })
        case 'USER_DATA_RECEIVE':
            return Object.assign({}, state, {
                user: action.payload
            })
        default:
            return state
    }
}

export default authReducer