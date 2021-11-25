import { Action, createStore } from 'redux'
import type { Reducer } from 'react'

export interface ReduxState {
  count: number
}

const initialState: ReduxState = {
  count: 0
}

export interface CountAction extends Action {
    type: 'INCREMENT' |  'DECREMENT',
    payload: any,
}

const countReducer: Reducer<any, any> = (state: ReduxState, action: CountAction) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state;
    }
}

const store = createStore(countReducer, initialState)

export default store
