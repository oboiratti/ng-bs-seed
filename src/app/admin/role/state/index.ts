import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromRoles from './role.reducer'
import * as fromRoot from '../../../app.state'

export interface State extends fromRoot.State {
  roleState: fromRoles.RoleState
}

export const selectRoleState = createFeatureSelector<fromRoles.RoleState>(
  fromRoles.roleFeatureKey
)

export const getRoles = createSelector(
  selectRoleState,
  (state: fromRoles.RoleState) => state.roles
)

export const getClaims = createSelector(
  selectRoleState,
  (state: fromRoles.RoleState) => state.claims
)
