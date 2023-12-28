import { Component, OnInit } from "@angular/core";
import { HelperService } from "src/app/services/helper.service";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ListService } from "src/app/services/list.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  host: { id: "main" },
})
export class HomeComponent implements OnInit {
  orders: any;
  waitcount: number = 0;
  runcount: number = 0;
  endcount: number = 0;
  cancelcount: number = 0;
  constructor(
    public helper: HelperService,
    public authService: AuthService,
    private router: Router,
    private listService: ListService
  ) { }

  ngOnInit() {
    this.listService
      .getAllOrders(
        0,
        50,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      )
      .subscribe((res: any) => {
        if (res.status) {
          for (let row of res.data) {
            if (row.status === 0) {
              this.waitcount = this.waitcount + 1;
            } else if (row.status === 1) {
              this.runcount = this.runcount + 1;
            } else if (row.status === 2) {
              this.endcount = this.endcount + 1;
            } else if (row.status === 3) {
              this.cancelcount = this.cancelcount + 1;
            }
          }
        }
      });
    this.listService.getAllDrivers(0, 50, null, null, null, null, null, null, null, null).subscribe(res => {
      if (res.status) {
        this.helper.drivers = res.data;
        this.helper.drivers_count = res.data_count;
      }
    })
  }
  gotoOrders(status: number) {
    this.router.navigate(["orders/" + status]);
  }
}
