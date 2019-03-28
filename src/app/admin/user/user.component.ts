import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { User, UserQuery, Role } from '../../auth/auth.model';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';
import { MessageDialog } from '../../shared/message_helper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loading: boolean;
  showForm: boolean;
  saving: boolean;
  deleting: boolean;

  users$: Observable<User[]>
  roles$: Observable<Role[]>;
  userForm: FormGroup;
  user: User;
  selectedUser: User;
  params: UserQuery;
  totalRecords: number;
  selectedFilter: any;
  title = 'Add New User';
  @BlockUI() blockForm: NgBlockUI;

  filters = [
    { label: 'Name', value: 'name', type: 'text' },
    { label: 'Email', value: 'email', type: 'text' },
    { label: 'Username', value: 'username', type: 'text' }
  ]

  constructor(private formBuilder: FormBuilder, private userService: UserService, private roleService: RoleService) {
    this.userForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')),
      phoneNumber: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0]+[0-9]{9}$')
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      passwordConfirmation: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    }, { validator: this.checkPasswords });
  }

  ngOnInit() {
    this.fetchUsers();
    this.fetchRoles();
    // this.params = <UserQuery>{ page: 0, size: 5, sortField: "id", sortOrder: -1 };
  }

  openForm() {
    this.showForm = true;
    // this.userForm.reset();
    this.userForm.get('username').enable();
  }

  closeForm() {
    this.title = 'Add New User';
    this.showForm = false;
    // this.closeBtn.nativeElement.click();
    this.userForm.reset();
  }

  checkPasswords(formGroup: FormGroup) {
    if (!formGroup.controls) { return null; }
    return formGroup.controls['password'].value === formGroup.controls['passwordConfirmation'].value ? null : { passwordMismatch: true }
  }

  selectRow(user: User) {
    this.userForm.patchValue(user);
    this.userForm.get('username').disable();
    this.userForm.get('password').setValidators(null)
    this.userForm.get('passwordConfirmation').setValidators(null)
    this.userForm.updateValueAndValidity()
    this.showForm = true;
  }

  save() {
    this.user = this.userForm.value;

    if (this.user.id) {
      delete this.user.password;
      delete this.user.passwordConfirmation;
    }

    this.blockForm.start('Saving...');
    this.saving = true;
    this.userService.save(this.user).subscribe((res) => {
      this.saving = false;
      this.blockForm.stop();
      this.closeForm()
      this.fetchUsers();
    }, err => {
      this.blockForm.stop();
      console.log('Error -> ' + err.message);
    });
  }

  remove(id: number) {
    MessageDialog.confirm('Delete User', 'Are you sure you want to delete this user').then((confirm) => {
      if (confirm.value) {
        this.blockForm.start('Deleting...');
        this.deleting = true;
        this.userService.destroy(id).subscribe((res) => {
          this.blockForm.stop();
          this.deleting = false;
          // if (res.success) {
          this.closeForm()
          this.fetchUsers();
          // }
        }, err => {
          this.blockForm.stop();
          console.log('Error -> ' + err.message);
        });
      }
    }).catch((err) => {
      this.blockForm.stop();
    });
  }

  fetchUsers() {
    this.blockForm.start('Loading...')
    this.users$ = this.userService.fetch().pipe(
      finalize(() => this.blockForm.stop())
    )
  }

  compareRoles(obj1: Role, obj2: Role): boolean {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  }

  get phoneNumber() { return this.userForm.get('phoneNumber') }

  private fetchRoles() {
    this.roles$ = this.roleService.fetch()
  }
}
