import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {HelperService} from "../../services/helper.service";
import {AddTransactionsComponent} from "../../components/add-transactions/add-transactions.component";

@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.scss'],
   host: { "id": "main" }
})
export class UserComponent {
   user: any;
   constructor(
       @Inject(MAT_DIALOG_DATA) public data: any,
       public dialog: MatDialog,
       private authService: AuthService,
       private toastr: ToastrService,
       public helper: HelperService,
   ) {
   }
   async ngOnInit(){
      const res = await this.authService.getUserInfo(+this.data).toPromise();
      if (res.status) {
         this.user = res.data
      }
   }
   addMoney() {
      this.dialog.open(AddTransactionsComponent, {
         data:this.data
      });
   }
   async generPasswordMerchant(){
      const res = await this.authService.generPasswordMerchant(+this.data,this.user.name).toPromise();
      if (res.status) {
         this.user.merch_login = res.name;
         this.user.merch_password = res.code;
      }
   }
   async saveNewMerchantId(){
      const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить водителя вк данному мерчанту?', 2)
      if (confirm){
         const res = await this.authService.saveNewMerchantId(this.user.merch_id,this.user.id).toPromise();
         if (res.status) {
            this.toastr.success("Информация о пользователе изменена");
         } else {
            this.toastr.error(res.error)
         }
      }
   }
   goToColumn(id) {
      if (id){
         const dialogRef = this.dialog.open(UserComponent, {
            width: '90%',
            height: '80%',
            panelClass: 'custom-dialog-class',
            data: id
         });
      }else {
         this.toastr.error('Сначала нужно назначить мерчанта')
      }
   }
}
