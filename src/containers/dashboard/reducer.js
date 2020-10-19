import { GET_ALL_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from "../../utils/ActionTypes";

const initialState = {
    allTasks: [],
};


const tasksReducer = (state = initialState, action) => {
    let mutateState = []
    switch (action.type) {
        case GET_ALL_TASKS:
            return { ...state,
                allTasks: state.allTasks
            }
        case CREATE_TASK:
            if(state.allTasks.length>0)
            return { ...state,
                allTasks: [...state.allTasks,action.payload]
            }
            else 
            return { ...state,
                allTasks: [action.payload]
            }
        case UPDATE_TASK:
            mutateState = state.allTasks.filter((t,i)=>{
                if(t.id !== action.payload.id) {
                   return t
                }  
            })
            return { ...state,
                allTasks: [...mutateState,action.payload]
            }
        case DELETE_TASK:
            mutateState = state.allTasks.filter((t,i)=>{
                if(t.id !== action.payload) {
                    return t
                }  
            })
            return { ...state,
                allTasks: mutateState
            }
                        
        default:
            return state;
    }
};
export default tasksReducer;