import { createAction, props } from '@ngrx/store'
import { Role } from 'src/app/auth/auth.model'

export const loadRole = createAction('[Role] Load')

export const loadRoleSuccess = createAction(
  '[Role] Load Success',
  props<{ roles: Role[] }>()
)

export const loadClaims = createAction('[Claims] Load')

export const loadClaimsSuccess = createAction(
  '[Claims] Load Success',
  props<{ claims: [] }>()
)
