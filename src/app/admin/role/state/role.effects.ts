import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { BlockUI, NgBlockUI } from 'ng-block-ui'
import { finalize, map, mergeMap } from 'rxjs/operators'
import { RoleService } from '../role.service'
import * as roleActions from './role.actions'

@Injectable()
export class RoleEffects {
  @BlockUI() blockUi: NgBlockUI

  constructor(private actions$: Actions, private roleService: RoleService) {}

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(roleActions.loadRole),
      mergeMap(() => {
        this.blockUi.start('Loading...')
        return this.roleService.fetch().pipe(
          map((roles) => roleActions.loadRoleSuccess({ roles })),
          finalize(() => this.blockUi.stop())
        )
      })
    )
  )

  loadClaims$ = createEffect(() =>
    this.actions$.pipe(
      ofType(roleActions.loadClaims),
      mergeMap(() =>
        this.roleService
          .claims()
          .pipe(map((claims) => roleActions.loadClaimsSuccess({ claims })))
      )
    )
  )
}
