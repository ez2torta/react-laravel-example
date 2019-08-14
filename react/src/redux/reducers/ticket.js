const initialState = {
    tickets: [],
    ticketResult: false,
    users: [],
    isLoading: false,
    isLoadingTickets: false,
    isLoadingUsers: false
}

const ticketReducer = function (state = initialState, action) {
    switch (action.type) {
        case 'LIST_TICKET_REQUEST':
            return Object.assign({}, state, {
                tickets: [],
                isLoadingTickets: true
            })
        case 'LIST_TICKET_RESPONSE':
            return Object.assign({}, state, {
                tickets: action.payload,
                ticketResult: true,
                isLoadingTickets: false
            })
        case 'LIST_USERS_REQUEST':
            return Object.assign({}, state, {
                users: [],
                isLoadingUsers: true
            })
        case 'LIST_USERS_RESPONSE':
            return Object.assign({}, state, {
                users: action.payload,
                isLoadingUsers: false
            })
        default:
            return state
    }
}

export default ticketReducer