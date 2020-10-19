import axios from 'axios'
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK,GET_DELETED_TASKS, GET_ALL_TASKS } from "../../utils/ActionTypes";
 
const tasks = (type,payload) => ({
    type,
    payload 
})
export const getAllTasks = (type) => dispatch => {
    let filter
     
        dispatch(tasks(GET_ALL_TASKS,''))
     
}
export const createTasks =  (data,taskId) => async dispatch => {
    let method,id
    if (taskId) {
        method = 'put'
        id = '/' + taskId
    } else {
        method = 'post'
        id = ''
    }
     
    if(id) {
        await dispatch(tasks(UPDATE_TASK,data))
    } else {
        await dispatch(tasks(CREATE_TASK,data))
    }
     
}
export const updateOnTask =  (type,item,taskId) => async dispatch => {
    let method,id,data
    if (type === 'DELETE') {
        method = 'delete'
        data = ''
    } else if (type === 'COMPLETE') {
        method = 'put'
        data = {
            ...item,
            isComplete: item.isComplete === 1 ? 0 : 1
        }
    } 
    
    if(type==="DELETE") {
        await dispatch(tasks(DELETE_TASK,item.id))
    } else {
        await dispatch(tasks(UPDATE_TASK,data))
    } 
     
}