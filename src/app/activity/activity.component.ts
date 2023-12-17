import { Component, OnInit } from "@angular/core";
import { ColDef, GridOptions } from "ag-grid-community";
import { formatDate } from "@angular/common";
import { SpollersService } from "../services/spollers.service";
import { MatDialog } from "@angular/material/dialog";
import { HelperService } from "../services/helper.service";
import { AuthService } from "../services/auth.service";
import { AddAdminComponent } from "../pages/add-admin/add-admin.component";
import { DriverComponent } from "../pages/driver/driver.component";
import { ListService } from "../services/list.service";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"],
  host: { id: "main" },
})
export class ActivityComponent implements OnInit {
  sizespage = [50,75,100];
  
  constructor(
    public spoller: SpollersService,
    public dialog: MatDialog,
    public helper: HelperService,
    public authService: AuthService,
    public listService: ListService
  ) {}

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.spoller.initSpollers();

  }
  goToAddAdmins(): void {
    const dialogRef = this.dialog.open(AddAdminComponent, {
      width: "90%",
      height: "80%",
      panelClass: "custom-dialog-class",
    });
  
  }
  goToColumn(ev: any): void {
    const dialogRef = this.dialog.open(DriverComponent, {
      width: "90%",
      height: "80%",
      panelClass: "custom-dialog-class",
      data: ev,
    });
  }

  async handlePage(e: any) {
    this.helper.global_loading = true;
    let from = e.pageIndex * e.pageSize;
    let news = await this.listService
      .getActivityUsers(
        from,
        e.pageSize,
      )
      .toPromise();
    this.helper.activity = news.data;
    this.helper.activity_count = news.data_count;
    this.helper.global_loading = false;
    console.log(e);
    console.log(e.pageIndex);
    console.log(e.pageSize);
  }
  
}
