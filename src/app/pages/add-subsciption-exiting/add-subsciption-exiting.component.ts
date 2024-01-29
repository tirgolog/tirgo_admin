import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';
@Component({
  selector: 'app-add-subsciption-exiting',
  templateUrl: './add-subsciption-exiting.component.html',
  styleUrls: ['./add-subsciption-exiting.component.scss']
})
export class AddSubsciptionExitingComponent implements OnInit {
  dataUser = {
    user_id: '',
    agent_id: 0,
    phone: '',
    name: '',
    subscription_id: 0,
  };
  subscription: any[] = []
  loading: boolean = false;
  constructor(
    private toastr: ToastrService,
    public listService: ListService,
    public helper: HelperService,
    public authService: AuthService,
    public dialog: MatDialog) { }
  ngOnInit(): void {
    this.dataUser.agent_id = this.authService.currentUser.id;
    this.getAllSubcription()
  }

  async getAllSubcription() {
    this.subscription = await this.listService.getAllSubscription().toPromise()
  }

  onChange(event: any) {
    this.dataUser.subscription_id = event.value;
  }

  async searchUser(user_id) {
    this.listService.getSearchDriverAgent(user_id).subscribe(res => {
      this.dataUser.name = res.name;
      this.dataUser.phone = res.phone;
    })
  }

  async addUser() {
    if (!this.dataUser.name || !this.dataUser.phone || !this.dataUser.user_id || !this.dataUser.subscription_id) {
      await this.helper.openDialogConfirm('Ошибка', 'Не все поля заполнены корректно', 1)
    } else {
      const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить данного пользователя?', 2)
      if (confirm) {
        await this.listService.addUserByAgent(this.dataUser).subscribe(res => {
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
