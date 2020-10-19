import { combineReducers } from 'redux';
import tasksReducer from '../containers/dashboard/reducer'
export default combineReducers({
    tasks: tasksReducer
})