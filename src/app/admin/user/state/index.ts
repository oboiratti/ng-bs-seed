import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromRoot from '../../../app.state'
import * as fromUser from './user.reducer'

export interface State extends fromRoot.State {}

export const selectUserState = createFeatureSelector<fromUser.UserState>(
  fromUser.userFeatureKey
)

export const getUsers = createSelector(
  selectUserState,
  (state: fromUser.UserState) => state.users
)
