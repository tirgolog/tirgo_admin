import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
@Component({
  selector: 'app-agent-balance',
  templateUrl: './agent-balance.component.html',
  styleUrls: ['./agent-balance.component.scss']
})
export class AgentBalanceComponent {
  getFile(e: any, el: any) {
     el.value = e.files[0].name
  }
  data = {
     agent_id: 0,
     agent_balance: '',
  }
  constructor(
     @Inject(MAT_DIALOG_DATA) public dataDialog: any,
     public dialog: MatDialog,
     private authService: AuthService,
     private toastr: ToastrService,
     public helper: HelperService) {
     if (this.dataDialog) {
        this.data.agent_id = this.dataDialog.agent_id;
      //this.data.agent_balance = this.dataDialog.agent_balance;
     }
  }
  close() {
     this.dialog.closeAll()
  }
  async editBalance() {
     if (!this.data.agent_balance || !this.data.agent_id ) {
        await this.helper.openDialogConfirm('Ошибка', 'Не все поля заполнены корректно', 1)
     } else {
        const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить данный тип подписка?', 2)
        if (confirm) {
              const res = await this.authService.EditAgentBalance(this.data).toPromise();
              if (res.status) {
                 this.toastr.success('Баланс агента успешно редактировать')
                 this.dialog.closeAll();
              } else {
                 this.toastr.error(res.error)
              }

        }
     }
  }
}
