import {SAVE_URL} from './actions'

const initialState = {
    url: ''
}

export default function(state = initialState, action) {
    const { type,data } = action
    switch(type) {
        case SAVE_URL:
            return{...state, url: data}
        default:
            return state
    }
}