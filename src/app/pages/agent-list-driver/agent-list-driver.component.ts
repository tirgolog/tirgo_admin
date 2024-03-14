import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PushComponent } from "src/app/components/push/push.component";
import { SpollersService } from "src/app/services/spollers.service";
import { AuthService } from "../../services/auth.service";
import { HelperService } from "../../services/helper.service";
import { ListService } from "../../services/list.service";
import { SocketService } from "src/app/services/socket.service";
import { ActivatedRoute } from "@angular/router";
import { AgentBalanceComponent } from "../agent-balance/agent-balance.component";
import { ConnectToAgentComponent } from "../connect-to-agent/connect-to-agent.component";
import { AgentDriverDetailComponent } from "../agent-driver-detail/agent-driver-detail.component";
import { HistoryTransactionDriverComponent } from "../history-transaction-driver/history-transaction-driver.component";

@Component({
  selector: 'app-agent-list-driver',
  templateUrl: './agent-list-driver.component.html',
  styleUrls: ['./agent-list-driver.component.scss'],
  host: { "id": "main" }
})
export class AgentListDriverComponent {
  id: string = "";
  agent_id: number;
  phone: string = "";
  indentificator: string = "";
  typetransport: string = "";
  dateReg: string = "";
  dateLogin: string = "";
  name: string = "";
  fin_requests = 0;
  sort: string = "id";
  total_subscription_balance: '';
  agent_balance: '';
  reverse: boolean = true;
  agent_drivers: any[] = [];
  sizespage = [50, 100, 200, 500, 1000, 5000];
  constructor(
    private router: ActivatedRoute,
    public dialog: MatDialog,
    public spoller: SpollersService,
    public helper: HelperService,
    public listService: ListService,
    public authService: AuthService,
    public socketService: SocketService) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(res => {
      this.agent_id = res['id'];
      this.getsumOfDriversSubcription(this.agent_id)
      this.getAgent(this.agent_id)
    })

    this.spoller.initSpollers();
    this.filterList();
    this.updateListDrivers();
  }

  async getsumOfDriversSubcription(id) {
    this.listService.getsumOfDriversSubcription(id).toPromise().then((res) => {
      if (res.status) {
        this.total_subscription_balance = res.data.total_sum;
      }
    })
  }


  subscription(){
    const dialogRef = this.dialog.open(HistoryTransactionDriverComponent, {
      minWidth: '60vw',
      maxWidth: '80vw',
      minHeight: '70vh',
      maxHeight: '80vh',
      data:this.agent_id,
      panelClass: "custom-dialog-class",
    });
  }
  
  goToColumn(ev: any): void {
    const dialogRef = this.dialog.open(AgentDriverDetailComponent, {
      width: "90%",
      height: "80%",
      panelClass: "custom-dialog-class",
      data: ev,
    });
  }
  
  async getAgent(id) {
    this.listService.getAgentBalanse(id).toPromise().then((res) => {
      if (res.status) {
        this.agent_balance = res.data.total_amount;
      }
    })
  }

  AgentBalance(): void {
    const dialogRef = this.dialog.open(AgentBalanceComponent, {
      width: "550px",
      panelClass: "custom-dialog-class",
      data: { agent_id: this.agent_id, agent_balance: this.agent_balance },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getsumOfDriversSubcription(this.agent_id)
      this.getAgent(this.agent_id)
      this.filterList()
    })
  }

  connectAgent(): void {
    const dialogRef = this.dialog.open(ConnectToAgentComponent, {
      width: "550px",
      panelClass: "custom-dialog-class",
      data: { agent_id: this.agent_id },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getsumOfDriversSubcription(this.agent_id)
      this.getAgent(this.agent_id)
      this.filterList()
    })
  }


  ngAfterViewInit(): void {
    this.spoller.initSpollers();
  }

  openPush(): void {
    this.dialog.open(PushComponent, {});
  }

  updateListDrivers() {
    this.agent_drivers = this.helper.agent_drivers.filter((e) => e.deleted === 0);
  }
  async handlePage(e: any) {
    this.helper.global_loading = true;
    let from = e.pageIndex * e.pageSize;
    let newusers = await this.listService
      .getAllDriversAgent(
        from,
        e.pageSize,
        this.agent_id,
      )
      .toPromise();
    this.helper.agent_drivers = newusers.data;
    this.helper.agent_drivers_count = newusers.data_count;
    this.helper.global_loading = false;
  }

  async filterList() {
    this.helper.global_loading = true;
    let newusers = await this.listService
      .getAllDriversAgent(
        0,
        50,
        this.agent_id,
      )
      .toPromise();
    this.helper.agent_drivers = newusers.data;
    this.helper.agent_drivers_count = newusers.data_count;
    this.helper.global_loading = false;
  }
  async filterClear() {
    this.helper.isLoading = true;
    let newusers = await this.listService
      .getAllDriversAgent(0, 50, this.agent_id)
      .toPromise();
    this.helper.agent_drivers = newusers.data;
    this.helper.agent_drivers_count = newusers.count;
    this.helper.isLoading = false;
  }
  moderCheck(params) {
    switch (params) {
      case 0:
        return "Не пройдена";
      case 1:
        return "Пройдена";
      default:
        return "Не определен";
    }
  }
  busyCheck(params) {
    switch (params) {
      case 1:
        return "Свободен";
      case 0:
        return "Занят";
      default:
        return "Не определен";
    }
  }
  transportCheck(params) {
    let data = "";
    if (params && params.length) {
      for (let row of params) {
        data = data + "" + this.helper.returnNameTypeTransport(row.type) + ", ";
      }
      return data.slice(0, -2);
    } else {
      return "";
    }
  }
  categoryFind(ev) {
    this.typetransport = ev.target.value;
  }
  changeSort(ev) {
    this.reverse = !this.reverse;
    this.sort = ev.target.value;
  }

}