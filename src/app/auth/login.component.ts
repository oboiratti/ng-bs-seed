import { Component, OnInit } from '@angular/core';
import { LoginParams } from "./auth.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginParams = <LoginParams>{};
  loading: boolean;
  loginForm: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login(params: LoginParams) {
    this.loading = true;
    this.authService.authenticate(params).subscribe((res) => {
        this.loading = false;
        if (res.success) {
          this.authService.setUser(res.data);
          this.router.navigate(['/dashboard']);
        }
      }, err => {
        this.loading = false;
        this.loginForm.reset();
      });
  }
}
