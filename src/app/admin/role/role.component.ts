import { Component, OnInit } from '@angular/core';
import { RoleService } from './role.service';
import { Role } from '../../auth/auth.model';
import { MessageDialog, Toast } from '../../shared/message_helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roles$: Observable<Role[]>;
  showForm: boolean;
  permissions: any[] = [];
  role = <Role>{};
  checkAll: boolean;
  title = 'Add New Role';
  @BlockUI() blockForm: NgBlockUI;

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    this.fetchRoles();
    this.fetchPermissions();
    this.title = 'Add New Role';
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.title = 'Add New Role';
    this.showForm = false;
    this.role = <Role>{};
    this.permissions.forEach((perm) => {
      perm.checked = false;
    });
    this.checkAll = false
  }

  selectRow(role: Role) {
    this.title = 'Edit Role';
    this.role = role;
    const perms = role.permissions.split(', ');
    this.permissions.forEach((perm) => {
      perm.checked = false;
      perm.checked = perms.includes(perm.name)
    });

    this.checkAll = perms.length === this.permissions.length
    this.showForm = true;
  }

  selectOne(perm, event) {
    let cnt = 0;
    this.permissions.find(obj => obj.name === perm.name).checked = event.target.checked;

    this.permissions.map((p) => {
      if (p.checked) { cnt++; }
    });

    this.checkAll = cnt === this.permissions.length
  }

  selectAll(event) {
    this.permissions.map((perm) => {
      perm.checked = event.target.checked
    });
    this.checkAll = true;
  }

  save() {
    this.role.permissions = this.permissions.filter(perm => perm.checked)
      .reduce((acc, elm, index, array) => {
        return (index < array.length - 1) ? acc += `${elm.name}, ` : acc += `${elm.name}`
      }, '')

    if (!this.role.name) {
      MessageDialog.error('Please enter the name of the role to be created');
      return;
    }

    if (this.role.permissions === '') {
      MessageDialog.error('Role must have at least one permission');
      return;
    }

    this.blockForm.start('Saving...')
    this.roleService.save(this.role).subscribe(() => {
      this.blockForm.stop();
      // if (res.success) {
        this.closeForm();
        this.fetchRoles();
        Toast.success('Role updated successfully')
      // }
    }, () => this.blockForm.stop());
  }

  remove(id: number) {
    MessageDialog.confirm('Delete Role', 'Are you sure you want to delete this role').then((confirm) => {
      if (confirm.value) {
        this.blockForm.start('Deleting')
        this.roleService.destroy(id).subscribe((res) => {
          this.blockForm.stop();
          // if (res.success) {
            this.closeForm();
            this.fetchRoles();
            this.role = <Role>{};
            Toast.success('Role deleted successfully')
          // }
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

  private fetchPermissions() {
    this.roleService.permissions().subscribe((res) => {
      // if (res.success) {
      this.permissions = res;
      // }
    })
  }
}
