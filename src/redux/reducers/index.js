export default function reducer(state = {}, action){
    switch (action.type) {
        case 'UPDATE':
            let newStore = {...state, ...action.wdata};
            return newStore;
        case 'REFRESH':
            return {...state, isRefreshing: action.isRefreshing};
        case 'CLEAR_STATE':
            return {};
        case 'ERROR':
               alert(action.error);
            return state;
        default:
            return state;
    }
}