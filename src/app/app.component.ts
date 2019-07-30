import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { startWith, delay } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Route } from './shared/constants';
import { User } from './auth/auth.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

export interface IMenuItem {
  label: string
  route: string
  icon: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menus: IMenuItem[];
  loading: boolean;
  isLoggedIn: boolean
  currentUser: User
  @BlockUI() blockUi: NgBlockUI

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.checkLogin();
    this.setMenuItems();
  }

  checkLogin() {
    this.authService.loggedIn$.pipe(
      startWith(this.authService.isLoggedIn()),
      delay(0)
    ).subscribe(value => {
      this.isLoggedIn = value
      this.currentUser = value ? this.authService.currentUser : null
    })
  }

  logout() {
    this.blockUi.start('Logging Out...')
    this.authService.invalidate().subscribe((res) => {
      this.blockUi.stop()
      if (res.success) {
        this.isLoggedIn = false;
        this.authService.removeUser();
        this.router.navigate(['/login']);
      }
    }, () => this.blockUi.stop());
  }

  private setMenuItems() {
    this.menus = [
      { label: 'Dashboard', route: Route.dashboard, icon: 'fa fa-dashboard fa-lg' },
      { label: 'Product', route: Route.product, icon: 'fa fa-tag fa-lg text-warning' },
      { label: 'Settings', route: Route.settings, icon: 'fa fa-cogs fa-lg text-primary' },
      { label: 'Users', route: Route.users, icon: 'fa fa-users fa-lg text-danger' },
      { label: 'Roles', route: Route.roles, icon: 'fa fa-cubes fa-lg text-success' }
    ];
  }
}
