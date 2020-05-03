import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Validators, FormBuilder, FormGroup, FormControl, Form } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(public router: Router, private formBuilder: FormBuilder) { }
    public loginForm: FormGroup;
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userName: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
        if (this.loginForm.get('userName').value === 'admin') {
            localStorage.setItem('role', 'ADMIN');
            this.router.navigate(['/approve-request']);
        } else {
            localStorage.setItem('role', 'USER');
            this.router.navigate(['/createRequest']);
        }

    }
}
