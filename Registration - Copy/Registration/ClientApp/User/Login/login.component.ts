﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../../_services/index';
import { User } from '../../_models/index';

@Component({   
    selector: 'login',
    templateUrl: 'login.component.html',
    providers: [AuthenticationService, AlertService]
    
})
export class LoginComponent implements OnInit {
    model: any= {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    login() {
        this.loading = true;
        debugger;
        console.log(this.model)
        this.authenticationService.login(this.model)
            .subscribe(
            data => {
                let userResult = data;
                if (userResult.status == true) {
                    this.loading = false;
                    this.model = {};                    
                    this.router.navigate(["home"]);
                }
                else {
                    this.alertService.error(userResult.message, true);
                    this.loading = false;
                }            
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }
}
