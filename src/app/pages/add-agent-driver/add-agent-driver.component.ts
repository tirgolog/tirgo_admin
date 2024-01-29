import { Component, OnInit } from '@angular/core';
import { HelperService } from "../../services/helper.service";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { ListService } from "../../services/list.service";
import { MatDialog } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";

@Component({
   selector: 'app-add-agent-driver',
   templateUrl: './add-agent-driver.component.html',
   styleUrls: ['./add-agent-driver.component.scss'],
   host: { "id": "main" },
})
export class AddAgentDriverComponent implements OnInit {
   dataUser = {
      name: '',
      phone: '',
      email: '',
      country: 'Узбекистан',
      city: 'Ташкент',
      birthday: new Date(),
      type: 0,
      agent_id: 0,
      subscription_id: 0,
   };
   dataCar = {
      userid: 0,
      type: 0,
      maxweight: 21000,
      name: '',
      description: '',
      adr: false,
      cubature: '96',
      state_number: ''
   };
   dial_code: string = '';
   count_number: string = '7';
   loading: boolean = false;
   public citiesSelected: FormControl = new FormControl();
   public selectTechnicalRoomFilterCtrl: FormControl = new FormControl();
   findList: any[] | undefined = [];
   viewText = false;
   cityInfo: any[] = []
   subscription: any[] = []
   constructor(
      public helper: HelperService,
      private toastr: ToastrService,
      private authService: AuthService,
      public dialog: MatDialog,
      public listService: ListService,
   ) {
      this.dataUser.agent_id = this.authService.currentUser.id
   }
   getFile(e: any, el: any) {
      el.value = e.files[0].name
   }

   ngOnInit(): void {
      this.getAllSubcription()
   }
   async getAllSubcription() {
      this.subscription = await this.listService.getAllSubscription().toPromise()
   }
   nextStep() {
   }
   onDate(event: any): void {
      this.dataUser.birthday = event;
   }
   async addUser() {
      if (!this.dataUser.name || !this.dataUser.phone || !this.dataUser.email || !this.dataUser.country || !this.dataUser.city || !this.dataUser.birthday || !this.dataUser.type || !this.dataUser.agent_id || !this.dataUser.subscription_id) {
         await this.helper.openDialogConfirm('Ошибка', 'Не все поля заполнены корректно', 1)
      } else {
         const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить данного пользователя?', 2)
         if (confirm) {
            this.cityInfo = this.citiesSelected.value;
            this.dataUser.phone = this.dataUser.phone.includes(this.dial_code) ? this.dataUser.phone : this.dial_code + '' + this.dataUser.phone
            await this.authService.addUser(this.dataUser, this.cityInfo).subscribe(res => {
               if (res.status) {
                  this.toastr.success('Пользователь успешно добавлен')
                  this.dialog.closeAll();
                  this.loading = false;
               } else {
                  this.toastr.error(res.error)
                  this.loading = false;
               }
            });

         }
      }
   }

   onChange(event: any) {
      this.dataUser.subscription_id = event.value;
    }
   getActualPrefix() {
      const phoneInfo = this.authService.phones.filter(e => e.code === this.citiesSelected.value.country_iso_code)
      this.dial_code = phoneInfo[0]?.dial_code
      return phoneInfo[0]?.dial_code
   }
   getActualMask() {
      const phoneInfo = this.authService.phones.filter(e => e.code === this.citiesSelected.value.country_iso_code)
      return phoneInfo[0]?.mask
   }
   selectAdr(ev: any) {
      this.dataCar.adr = ev.checked
   }

   async findCity(ev: any) {
      const findText = ev.target.value.toString().trim().toLowerCase();
      if (findText.length >= 2) {
         this.viewText = true;
         this.findList = await this.authService.findCity(findText).toPromise();
      } else {
         this.viewText = false;
         this.findList = [];
      }
   }
}
