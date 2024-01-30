import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';
import { SocketService } from 'src/app/services/socket.service';
import { SpollersService } from 'src/app/services/spollers.service';

@Component({
  selector: 'app-history-transaction-driver',
  templateUrl: './history-transaction-driver.component.html',
  styleUrls: ['./history-transaction-driver.component.scss']
})
export class HistoryTransactionDriverComponent {
  subscritions: any[] = [];
  subscrition_count: any;
  sizespage = [50, 100, 200, 500, 1000, 5000];
  agent_id: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public spoller: SpollersService,
    public helper: HelperService,
    public listService: ListService,
    public authService: AuthService,
    public socketService: SocketService) {
    console.log(data);
    this.agent_id=data
    this.filterList()
  }

  async filterList() {
    this.helper.global_loading = true;
    let newusers = await this.listService
      .getAllSubscriptionHistory(
        this.agent_id,
      )
      .toPromise();
    this.subscritions = newusers.data;
    this.helper.global_loading = false;
  }
}
