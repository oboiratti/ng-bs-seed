import { createAction, props } from '@ngrx/store'
import { User } from 'src/app/auth/auth.model'

export const loadUser = createAction('[User Load]')

export const loadUserSuccess = createAction(
  '[User Load Success]',
  props<{ users: User[] }>()
)
