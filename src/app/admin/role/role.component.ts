import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from './role.service';
import { Role } from '../../auth/auth.model';
import { MessageDialog, Toast } from '../../shared/message_helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit, OnDestroy {

  roles$: Observable<Role[]>;
  showForm: boolean;
  claims$: Observable<[]>;
  role = <Role>{};
  checkAll: boolean;
  title = 'Add New Role';
  @BlockUI() blockForm: NgBlockUI;
  unsubscribe$ = new Subject<void>()

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    this.fetchRoles();
    this.fetchClaims();
    this.title = 'Add New Role';
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.title = 'Add New Role';
    this.showForm = false;
    this.role = <Role>{};
  }

  selectRow(role: Role) {
    this.title = 'Edit Role';
    this.role = role;
    this.showForm = true;
  }

  save() {
    if (!this.role.name) {
      MessageDialog.error('Please enter the name of the role to be created');
      return;
    }

    if (!this.role.claims || this.role.claims.length <= 0) {
      MessageDialog.error('Role must have at least one permission');
      return;
    }

    this.blockForm.start('Saving...')
    this.roleService.save(this.role)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.blockForm.stop();
        this.closeForm();
        this.fetchRoles();
      }, () => this.blockForm.stop());
  }

  remove(id: string) {
    MessageDialog.confirm('Delete Role', 'Are you sure you want to delete this role').then((confirm) => {
      if (confirm.value) {
        this.blockForm.start('Deleting...')
        this.roleService.destroy(id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => {
            this.blockForm.stop();
            this.closeForm();
            this.fetchRoles();
            this.role = <Role>{};
          }, () => this.blockForm.stop());
      }
    }).catch(() => this.blockForm.stop());
  }

  private fetchRoles() {
    this.blockForm.start('Loading...')
    this.roles$ = this.roleService.fetch().pipe(
      finalize(() => this.blockForm.stop())
    )
  }

  private fetchClaims() {
    this.claims$ = this.roleService.claims()
  }
}
