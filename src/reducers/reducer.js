const defaultState = {
    searchQuery: '',
    searchedLocations: []
}

function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_LOCATIONS':
            return {
                ...state,
                searchedLocations: action.payload
            }
        case 'SET_QUERY':
            return {
                ...state,
                searchQuery: action.payload
            }
        default: return state
    }
}

export default reducer