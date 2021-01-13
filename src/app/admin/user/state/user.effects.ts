import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { BlockUI, NgBlockUI } from 'ng-block-ui'
import { finalize, map, mergeMap } from 'rxjs/operators'
import { UserService } from '../user.service'
import * as userActions from './user.actions'

@Injectable()
export class UserEffects {
  @BlockUI() blockUi: NgBlockUI

  constructor(private userService: UserService, private actions$: Actions) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUser),
      mergeMap(() => {
        this.blockUi.start('Loading...')
        return this.userService.fetch().pipe(
          map((users) => userActions.loadUserSuccess({ users })),
          finalize(() => this.blockUi.stop())
        )
      })
    )
  )
}
