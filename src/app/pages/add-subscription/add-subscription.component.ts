import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    name:'',
    value:'',
    duration:'',
 }
 constructor(
     public dialog: MatDialog,
     private authService: AuthService,
     private toastr: ToastrService,
     public helper: HelperService) {
 }
 close(){
    this.dialog.closeAll()
 }
 async addSubscrtiption(){
    const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить данный тип подписка?', 2)
    if (confirm){
       const res = await this.authService.addTypeSubscription(this.data).toPromise();
       console.log(res)
       if (res.status) {
          this.toastr.success('Тип подписка успешно добавлен')
          this.dialog.closeAll();
       }
    }
 }
}
