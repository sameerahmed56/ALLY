import {NEW_NOTIFICATION } from './actions'

export const reducer = (state = { offAttendanceState: [] ,newNotification:{count:0}}, action) => {
    // initialState
    let newState = {}
    switch (action.type) {

        case NEW_NOTIFICATION:
            newState = {
                ...state,
                newNotification: {
                    ...action.payload
                }
            }
            return newState

        default:
            return state
    }

}




