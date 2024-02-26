import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SpollersService } from "src/app/services/spollers.service";
import { AuthService } from "../../services/auth.service";
import { HelperService } from "../../services/helper.service";
import { ListService } from "../../services/list.service";
import { SocketService } from "src/app/services/socket.service";

@Component({
  selector: "app-apply-service-history",
  templateUrl: "./apply-service-history.component.html",
  styleUrls: ["./apply-service-history.component.scss"],
  host: { id: "main" },
})
export class ApplyServiceHistoryComponent {
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

  gridOptions: any;
  drivers: any[] = [];
  sizespage = [50, 100, 200, 500, 1000, 5000];
  constructor(
    public dialog: MatDialog,
    public spoller: SpollersService,
    public helper: HelperService,
    public listService: ListService,
    public authService: AuthService,
    public socketService: SocketService
  ) { }

  ngOninit() {}

  goToColumn(id) {}
  handlePage(event) {}
}