import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PushComponent } from "src/app/components/push/push.component";
import { SpollersService } from "src/app/services/spollers.service";
import { AuthService } from "../../services/auth.service";
import { HelperService } from "../../services/helper.service";
import { ListService } from "../../services/list.service";
import { SocketService } from "src/app/services/socket.service";
import { AddAgentDriverComponent } from "../add-agent-driver/add-agent-driver.component";
import { AgentDriverDetailComponent } from "../agent-driver-detail/agent-driver-detail.component";

@Component({
  selector: 'app-agent-driver',
  templateUrl: './agent-driver.component.html',
  styleUrls: ['./agent-driver.component.scss'],
  host: { "id": "main" }
})
export class AgentDriverComponent {
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
    public dialog: MatDialog,
    public spoller: SpollersService,
    public helper: HelperService,
    public listService: ListService,
    public authService: AuthService,
    public socketService: SocketService) {
  }

  ngOnInit(): void {
    this.checkSession()
    this.spoller.initSpollers();
    this.filterList();
    this.updateListDrivers();
  }



  async checkSession() {
    await this.authService.checkSession().toPromise().then(async (res) => {
      if (res) {
        this.authService.currentUser = res;
        this.agent_id = this.authService.currentUser?.id;
        this.getsumOfDriversSubcription(this.agent_id)
        this.getAgent(this.agent_id)
      }
    }).catch(async (err) => {
      console.log(err)
    });
  }

  async getsumOfDriversSubcription(id) {
    this.listService.getsumOfDriversSubcription(id).toPromise().then((res) => {
      if (res.status) {
        this.total_subscription_balance = res.data.total_subscription_balance;
      }
    })
  }

  async getAgent(id) {
    this.listService.getAgent(id).toPromise().then((res) => {
      if (res.status) {
        this.agent_balance = res.data.agent_balance;
      }
    })
  }


  goToColumn(ev: any): void {
    const dialogRef = this.dialog.open(AgentDriverDetailComponent, {
      width: "90%",
      height: "80%",
      panelClass: "custom-dialog-class",
      data: ev,
    });
  }
  goToAddDriver(): void {
    const dialogRef = this.dialog.open(AddAgentDriverComponent, {
      width: "40%",
      panelClass: "custom-dialog-class",
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      await this.authService.checkSession().toPromise().then(async (res) => {
        if (res) {
          this.authService.currentUser = res;
          this.agent_id = this.authService.currentUser?.id
          let newusers = await this.listService
            .getAllDriversAgent(
              0,
              50,
              this.agent_id,
            )
            .toPromise();
          this.helper.agent_drivers = newusers.data;
          this.helper.agent_drivers_count = newusers.data_count;

        }
      }).catch(async (err) => {
        console.log(err)
      });
    });
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
