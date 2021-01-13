import { Action, createReducer, on } from '@ngrx/store'
import { User } from 'src/app/auth/auth.model'
import * as userActions from './user.actions'

export const userFeatureKey = 'user'

export interface UserState {
  users: User[]
}

const initialState = {
  users: [],
}

const userReducer = createReducer(
  initialState,
  on(userActions.loadUserSuccess, (state, action) => ({
    ...state,
    users: action.users,
  }))
)

export function reducer(state: UserState, action: Action) {
  return userReducer(state, action)
}
