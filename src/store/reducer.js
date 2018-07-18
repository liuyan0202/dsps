import { combineReducers } from 'redux'
import { PLAN_LIST } from './type'
function planList(state=[],action){
    if(action.type === PLAN_LIST){
        return action.payload
    }
    return state
}
export default combineReducers({
    planList
})