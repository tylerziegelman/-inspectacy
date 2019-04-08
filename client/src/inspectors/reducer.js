import {GET_INSPECTORS} from './actions'
import {GET_PROFILE} from './actions'


const initialState = {
   
    inspectors: [],
    inspectorsLoaded: false,
    skills: [],
    
}

export default function(state = initialState, action) {
    const { type,data } = action
    switch(type) {
        case GET_INSPECTORS:
            return{...state, inspectors: data, inspectorsLoaded: true}
        case GET_PROFILE:
            return{...state, skills: data}
        default:
            return state
    }
}