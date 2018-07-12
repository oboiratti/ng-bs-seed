import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { startWith, delay } from "rxjs/operators";
import { AuthService } from './auth/auth.service';

interface IMenuItem {
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
  username: string;
  email: string;
  loading: boolean;
  @ViewChild('sidebar') sidebar: ElementRef
  @ViewChild('content') content: ElementRef
  @ViewChild('overlay') overlay: ElementRef
  show: boolean
  isLoggedIn: boolean

  constructor(private router: Router, 
    private authService: AuthService, 
    private renderer: Renderer2, 
    private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.checkLogin();
    this.setMenuItems();
    this.setUsername();
  }

  toggle() {
    this.show = !this.show
    if (this.show) {
      this.renderer.addClass(this.sidebar.nativeElement, 'toggle');
      this.renderer.addClass(this.content.nativeElement, 'toggle');
      // this.renderer.addClass(this.overlay.nativeElement, 'toggle');
    } else {
      this.renderer.removeClass(this.sidebar.nativeElement, 'toggle');
      this.renderer.removeClass(this.content.nativeElement, 'toggle');
      // this.renderer.removeClass(this.overlay.nativeElement, 'toggle');
    }
  }

  checkLogin() {
    this.authService.loggedIn$.pipe(
      startWith(this.authService.isLoggedIn()),
      delay(0)
    ).subscribe(value => {
      this.isLoggedIn = value
      console.log(value);
      
    })
  }

  setUsername() {
    let user = this.authService.currentUser;
    if (user) {
      this.username = user.name;
      this.email = user.email
    }
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
      { label: "Users", route: "/users", icon: "fa fa-users fa-lg text-danger" },
      { label: "Roles", route: "/roles", icon: "fa fa-cubes fa-lg text-success" }
    ];
  }
}
