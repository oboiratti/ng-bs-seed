import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { startWith, delay } from "rxjs/operators";
import { AuthService } from './auth/auth.service';
import { Route } from './shared/constants';
import { User } from './auth/auth.model';

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
      console.log(value);
      this.currentUser = value ? this.authService.currentUser : null
      
    })
  }

  logout() {
    this.loading = true;
    this.authService.invalidate().subscribe((res) => {
      this.loading = false;
      if (res.success) {
        this.isLoggedIn = false;
        this.authService.removeUser();
        this.router.navigate(['/login']);
      }
    });
  }

  private setMenuItems() {
    this.menus = [
      { label: "Dashboard", route: "/dashboard", icon: "fa fa-dashboard fa-lg" },
      { label: "Settings", route: "/settings", icon: "fa fa-cogs fa-lg text-primary" },
      // { label: "Admin", route: "/admin", icon: "fa fa-key fa-lg text-warning" },
      { label: "Users", route: Route.users, icon: "fa fa-users fa-lg text-danger" },
      { label: "Roles", route: Route.roles, icon: "fa fa-cubes fa-lg text-success" }
    ];
  }
}
