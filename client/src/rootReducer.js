import {combineReducers} from 'redux'
import inspectors from './inspectors/reducer'
import user from './user/reducer'
import image from './Image/reducer'

const rootReducer = combineReducers({
    inspectors,
    user,
    image
})

export default rootReducer