import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
   login: string = ""
   password: string = ""
   error: boolean = false
   decoded: any
   constructor(
      private authService: AuthService,
      private router: Router,
      private toastr: ToastrService) { }

   ngOnInit() {
      if (this.authService.isAuthenticated()) {
         // this.router.navigate(['dashboard']);
      }
   }

   async getLogin() {
      const res = await this.authService.loginAdmin(this.login, this.password).toPromise();
      if (res.status) {
         this.decoded = jwtDecode(res.token);
         console.log(this.decoded?.user_type)
         if (this.decoded?.user_type == 4) {
            this.router.navigate(['agent-drivers']);
         } else {
            this.router.navigate(['dashboard']);
         }
         // console.log(decoded)
         await this.authService.brokerLogin().subscribe((res) => { })
         await this.authService.setJwt(res.token);
         // this.router.navigate(['/dashboard'])
         this.error = false
      } else {
         this.error = true
         this.toastr.error(res.error)
      }
   }
}
