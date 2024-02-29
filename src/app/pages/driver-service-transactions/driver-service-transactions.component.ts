import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { HelperService } from "../../services/helper.service";
import { AuthService } from "../../services/auth.service";
import { ListService } from 'src/app/services/list.service';
import { SpollersService } from 'src/app/services/spollers.service';
import { SocketService } from 'src/app/services/socket.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-driver-service-transactions',
  templateUrl: './driver-service-transactions.component.html',
  styleUrls: ['./driver-service-transactions.component.scss'],
  host: { "id": "main" }
})
export class DriverServiceTransactionsComponent {
  payments: any[] = [];
  payments_count = 0;
  withdraw_payments: any[] = [];
  withdraw_payments_count = 0;
  id: number = 0;
  sizespage = [50, 100, 200, 500, 1000, 5000];
  constructor(
    public dialog: MatDialog,
    public spoller: SpollersService,
    public helper: HelperService,
    public listService: ListService,
    public authService: AuthService,
    public socketService: SocketService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.filterList();
    });
  }

  ngAfterViewInit(): void {
    this.spoller.initSpollers();
  }
  async handlePage(e: any) {
    this.helper.global_loading = true;
    let from = e.pageIndex * e.pageSize;
    let newusers = await this.listService
      .getServiceTransactionByUserId(
        from,
        e.pageSize,
        this.id,
      )
      .toPromise();
    this.payments = newusers.data;
    this.payments_count = newusers.data_count;
    this.helper.global_loading = false;
  }

  async filterList() {
    this.helper.global_loading = true;
    let newusers = await this.listService
      .getServiceTransactionByUserId(
        0,
        50,
        this.id,
      )
      .toPromise();
    this.payments = newusers.data;
    this.payments_count = newusers.data_count;
    this.helper.global_loading = false;
  }








}