import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-connect-to-agent',
  templateUrl: './connect-to-agent.component.html',
  styleUrls: ['./connect-to-agent.component.scss']
})
export class ConnectToAgentComponent implements OnInit {
  dataUser = {
    user_id: '',
    agent_id: '',
    phone: '',
    name: '',
  };
  subscription: any[] = []
  loading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    public listService: ListService,
    public helper: HelperService,
    public dialog: MatDialog) {
    this.dataUser.agent_id = data?.agent_id
  }

  ngOnInit(): void {
  }

  async searchUser(user_id) {
    this.listService.getSearchDriverAgent(user_id).subscribe(res => {
      this.dataUser.phone = res.phone;
      this.dataUser.name = res.name;
    })
  }

  async addUser() {
    if (!this.dataUser.name || !this.dataUser.phone || !this.dataUser.agent_id) {
      await this.helper.openDialogConfirm('Ошибка', 'Не все поля заполнены корректно', 1)
    } else {
      const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить данного пользователя?', 2)
      if (confirm) {
         this.listService.connectDriverToAgent(this.dataUser).subscribe(res => {
          if (res.status) {
            this.dialog.closeAll();
            this.toastr.success('Драйвер успешно прикрепился')
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

