import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required,
    Validators.minLength(3)
    ]),
    lastname: new FormControl('', [Validators.required,
    Validators.minLength(3)
    ]),
    email: new FormControl('', [Validators.required,
    Validators.email
    ]),
    password: new FormControl('', [Validators.required,
    Validators.minLength(6),
    ]),
  });
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  durationInSeconds = 5;

  constructor(private authService: AuthService, public router: Router, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form.value.name, this.form.value.lastname, this.form.value.email, this.form.value.password).subscribe({
      next: (data) => {
        this.openSnackBar(data.message)
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['login'])
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.openSnackBar(err)
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, { duration: 5000 });
  }
}
