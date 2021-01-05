import userReducer from './userReducer.js'
import commentReducer from './commentReducer.js'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    userReducer,
    commentReducer
})

export default rootReducer
