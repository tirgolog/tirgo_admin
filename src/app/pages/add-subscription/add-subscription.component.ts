import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
   selector: 'app-add-subscription',
   templateUrl: './add-subscription.component.html',
   styleUrls: ['./add-subscription.component.scss'],
   host: { "id": "main" }
})
export class AddSubscriptionComponent {
   getFile(e: any, el: any) {
      el.value = e.files[0].name
   }
   data = {
      id: 0,
      name: '',
      value: '',
      duration: '',
   }
   constructor(
      @Inject(MAT_DIALOG_DATA) public dataDialog: any,
      public dialog: MatDialog,
      private authService: AuthService,
      private toastr: ToastrService,
      public helper: HelperService) {
      if (this.dataDialog) {
         this.data.id = this.dataDialog.id;
         this.data.name = this.dataDialog.name;
         this.data.value = this.dataDialog.value;
         this.data.duration = this.dataDialog.duration;
         console.log(this.data)
      }
   }
   close() {
      this.dialog.closeAll()
   }
   async addSubscrtiption() {
      if (!this.data.name || !this.data.value || !this.data.duration) {
         await this.helper.openDialogConfirm('Ошибка', 'Не все поля заполнены корректно', 1)
      } else {
         const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить данный тип подписка?', 2)
         if (confirm) {
            if (this.data.id == 0) {
               const res = await this.authService.addTypeSubscription(this.data).toPromise();
               if (res.status) {
                  this.toastr.success('Тип подписка успешно добавлен')
                  this.dialog.closeAll();
               } else {
                  this.toastr.error(res.error)
               }
            } else {
               const res = await this.authService.EditTypeSubscription(this.data, this.data.id).toPromise();
               if (res.status) {
                  this.toastr.success('Тип подписка успешно редактировать')
                  this.dialog.closeAll();
               } else {
                  this.toastr.error(res.error)
               }
            }

         }
      }
   }
}
