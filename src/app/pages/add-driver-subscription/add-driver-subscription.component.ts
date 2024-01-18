import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-add-driver-subscription',
  templateUrl: './add-driver-subscription.component.html',
  styleUrls: ['./add-driver-subscription.component.scss'],
})
export class AddDriverSubscriptionComponent implements OnInit {
  dataUser = {
    user_id: '',
    phone: '',
    amount: '',
    name: '',
    subscription_id: 0,
  };
  subscription: any[] = []
  loading: boolean = false;
  constructor(
    private toastr: ToastrService,
    public listService: ListService,
    public helper: HelperService,
    public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getAllSubcription()
  }

  async getAllSubcription() {
    this.subscription = await this.listService.getAllSubscription().toPromise()
  }

  onChange(event: any) {
    this.dataUser.subscription_id = event.value;
  }

  async searchUser(user_id) {
    this.listService.getSearchDriverSubscription(user_id).subscribe(res => {
      this.dataUser.amount = res.balance;
      this.dataUser.phone = res.phone;
      this.dataUser.name = res.name;
    })
  }

  async addUser() {
    if (!this.dataUser.name || !this.dataUser.phone || !this.dataUser.user_id || !this.dataUser.subscription_id) {
      await this.helper.openDialogConfirm('Ошибка', 'Не все поля заполнены корректно', 1)
    } else {
      const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить данного пользователя?', 2)
      if (confirm) {
        await this.listService.addDriverSubscription(this.dataUser).subscribe(res => {
          if (res.status) {
            this.toastr.success('Подписка успешно добавлена')
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
}
