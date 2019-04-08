import {GET_USER} from './actions'


const initialState = {
    user: [],
}

export default function(state = initialState, action) {
    const { type,data } = action
    switch(type) {
        case GET_USER:
            return{...state, user: data}
        default:
            return state
    }
}