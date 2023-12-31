import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { documentActions } from 'src/assets/scripts/document.actions';
import { spollers } from 'src/assets/scripts/functions';
import { AuthService } from './services/auth.service';
import { HelperService } from './services/helper.service';
import { ListService } from './services/list.service';
import { SpollersService } from './services/spollers.service';
import { SocketService } from "./services/socket.service";
import { ToastrService } from "ngx-toastr";

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
   host: { "class": "wrapper" }
})

export class AppComponent {

   constructor(
      public authService: AuthService,
      private router: Router,
      public spoller: SpollersService,
      public helper: HelperService,
      private socketService: SocketService,
      private toastr: ToastrService,
      public listService: ListService
   ) { }
   title = 'admin-ui';
   logo = "/assets/img/logo.svg"
   async ngOnInit() {
      this.spoller.initSpollers()
      this.authService.checkToken();
      this.authService.authenticationState.subscribe(async res => {
         console.log(res)
         if (res) {
            await this.checkSession();
            this.authService.globalLoading = false;
         } else {
           this.router.navigate(['auth']);
         }
      })
   }

   async checkSession() {
      await this.authService.checkSession().toPromise().then(async (res) => {
         if (res) {
            this.authService.currentUser = res;
            this.authService.user_type = res.user_type;
            this.helper.roles = await this.listService.getAllRoles().toPromise()
            const index = this.helper.roles.findIndex(e => e.id === this.authService.currentUser?.role)
            this.authService.myrole = this.helper.roles[index]
            if (!this.authService.isAuthenticated()) {
               // @ts-ignore
               this.authService.authenticationState.next(true);
            }
            this.socketService.connect()
            //this.helper.partners = await this.listService.getPartners().toPromise()
            this.helper.typetruck = await this.listService.getTypeTruck().toPromise();
            this.helper.typecargo = await this.listService.getTypeCargo().toPromise();
            this.helper.admins = await this.listService.getAllAdmins().toPromise();
            this.helper.messages = await this.listService.getAllMessages().toPromise();
            this.helper.securetrans = await this.listService.getSecureTrans().toPromise();
            this.helper.transactions_type = await this.listService.getTransactionsType().toPromise();

            this.socketService.updateAllMessages().subscribe(async (res:any) => {
               this.helper.messages = await this.listService.getAllMessages().toPromise();
            })
            this.socketService.logOutUser().subscribe(async (res:number) => {
               if (res === this.authService.currentUser?.id){
                  this.authService.logout()
                  await this.router.navigate(['auth'], { replaceUrl: true })
               }
            })

            const orders = await this.listService.getAllOrders(0, 50, null, null, null, null, null, null, null, null, null, null, null).toPromise();
            if (orders.status) {
               this.helper.orders = orders.data;
               this.helper.orders_count = orders.data_count;
            }

            // const drivers = await this.listService.getAllDrivers(0, 50, null, null, null, null, null, null, null, null).toPromise();
            // if (drivers.status) {
            //    this.helper.drivers = drivers.data; 
            //    this.helper.drivers_count = drivers.data_count;
            // }

            const agent_drivers = await this.listService.getAllDriversAgent(0, 50, this.authService.currentUser.id).toPromise();
            if (agent_drivers.status) {
               this.helper.agent_drivers = agent_drivers.data; 
               this.helper.agent_drivers_count = agent_drivers.data_count;
            }

            const driversList = await this.listService.getAllDriversList(null, null, null, null, null, null, null).toPromise();
            if (driversList.status) {
               this.helper.driversList = driversList.data;
            }


            const users = await this.listService.getAllUsers(0, 50, null, null, null, null, null, null, null, true).toPromise();
            if (users.status) {
               this.helper.users = users.data;
               this.helper.users_count = users.data_count;
            }

            const deletedusers = await this.listService.getDeletedUsers(0, 100).toPromise();
            if (deletedusers.status) {
               this.helper.deletedusers = deletedusers.data;
               this.helper.deletedusers_count = deletedusers.data_count;
            }

            const activity = await this.listService.getActivityUsers(0, 100).toPromise();
            if (activity.status) {
               this.helper.activity = activity.data;
               this.helper.activity_count = activity.data_count;
            }
            this.authService.globalLoading = false;

            //this.getLocation();
         } else {
            await this.router.navigate(['auth']);
         }
      }).catch(async (err) => {
         console.log(err)
      });
   }

   ngAfterViewInit() {
      documentActions()
      this.spoller.initSpollers()
   }
   getLocation() {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position: any) => {
            if (position) {
               console.log("Latitude: " + position.coords.latitude +
                  "Longitude: " + position.coords.longitude);
               this.helper.lat = position.coords.latitude;
               this.helper.lng = position.coords.longitude;
               console.log(this.helper.lat);
               console.log(this.helper.lat);
            }
         },
            (error: any) => console.log(error));
      } else {
         alert("Geolocation is not supported by this browser.");
      }
   }

}
