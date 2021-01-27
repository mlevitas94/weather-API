const defaultState = {
    searchQuery: '',
    searchedLocations: [],
    setLocation: null,
    recents : null
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
        case 'SET_SELECTED':
            return {
                ...state,
                setLocation: action.payload
            }
            case 'SET_RECENTS':
                return {
                    ...state,
                    recents: action.payload
                }
        default: return state
    }
}

export default reducer