import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SpollersService } from "src/app/services/spollers.service";
import { AuthService } from "../../services/auth.service";
import { HelperService } from "../../services/helper.service";
import { ListService } from "../../services/list.service";
import { SocketService } from "src/app/services/socket.service";
import { DriverComponent } from "../driver/driver.component";
import { Toast, ToastrService } from "ngx-toastr";

@Component({
  selector: "app-apply-service-history",
  templateUrl: "./apply-service-history.component.html",
  styleUrls: ["./apply-service-history.component.scss"],
  host: { id: "main" },
})
export class ApplyServiceHistoryComponent implements OnInit {
  id: string = "";
  phone: string = "";
  indentificator: string = "";
  typetransport: string = "all";
  subscription: string = "all";
  dateReg: string = "";
  dateLogin: string = "";
  name: string = "";
  fin_requests = 0;
  sort: string = "id";
  reverse: boolean = true;
  status: number;
  gridOptions: any;
  drivers: any[] = [];
  sizespage = [50, 100, 200, 500, 1000, 5000];
  constructor(
    public dialog: MatDialog,
    public spoller: SpollersService,
    public helper: HelperService,
    public listService: ListService,
    public authService: AuthService,
    public socketService: SocketService,
    private toaster: ToastrService) { }


  ngOnInit(): void {
    this.listService.getAllTransactions(0, 50).subscribe(res => {
      if (res.status) {
        this.drivers = res.data
      }
    })
  }

  goToColumn(id) {
    const dialogRef = this.dialog.open(DriverComponent, {
      width: "90%",
      height: "80%",
      panelClass: "custom-dialog-class",
      data: id,
    });
  }

  statusCheck(params) {
    switch (params) {
      case 0:
        return "В ожидании ";
      case 1:
        return "В работе";
      case 2:
        return "Отменен";
      case 3:
        return "Выполнен";
      default:
        return "В ожидании";
    }
  }

  returnClassStatusOrder(params) {
    switch (params) {
      case 0:
        return "status-order-blue";
      case 1:
        return "status-order-yellow";
      case 2:
        return "status-order-green";
      case 3:
        return "status-order-red";
      default:
        return "status-order";
    }
  }

  statusColor(status: number): string {
    switch (status) {
      case 0:
        return '#CCCCCC';
      case 1:
        return '#00FF00';
      case 2:
        return '#FF0000';
      case 3:
        return '#0000FF';
      default:
        return '#000000';
    }
  }

  selectSatus(id, ev) {
    this.status = ev.target.value;
    this.listService.postTransactionStatusBy(id, this.status).subscribe(res => {
      if (res.status) {
        this.toaster.success("Статус изменен");
        this.listService.getAllTransactions(0, 50).subscribe(res => {
          if (res.status) {
            this.drivers = res.data
          }
        })
      }
    })
  }

  async handlePage(event) {
    this.helper.global_loading = true;
    let from = event.pageIndex * event.pageSize;
    let newusers = await this.listService
      .getAllTransactions(
        from,
        event.pageSize,
      )
      .toPromise().catch(err => {
        this.helper.global_loading = false;
      })
    this.drivers = newusers.data;
    this.helper.drivers_count = newusers.data_count;
    this.helper.global_loading = false;

  }
}