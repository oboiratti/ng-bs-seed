import { Action, createReducer, on } from '@ngrx/store'
import { Role } from 'src/app/auth/auth.model'
import * as roleActions from './role.actions'

export const roleFeatureKey = 'role'

export interface RoleState {
  roles: Role[]
  claims: []
}

const initialState: RoleState = {
  roles: [],
  claims: [],
}

const roleReducer = createReducer(
  initialState,
  on(roleActions.loadRoleSuccess, (state, action) => ({
    ...state,
    roles: action.roles,
  })),
  on(roleActions.loadClaimsSuccess, (state, action) => ({
    ...state,
    claims: action.claims,
  }))
)

export function reducer(state: RoleState, action: Action) {
  return roleReducer(state, action)
}
