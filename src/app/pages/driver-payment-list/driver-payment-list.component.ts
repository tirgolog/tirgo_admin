import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { HelperService } from "../../services/helper.service";
import { AuthService } from "../../services/auth.service";
import { ListService } from 'src/app/services/list.service';
import { SpollersService } from 'src/app/services/spollers.service';
import { SocketService } from 'src/app/services/socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-driver-payment-list',
  templateUrl: './driver-payment-list.component.html',
  styleUrls: ['./driver-payment-list.component.scss'],
  host: { "id": "main" }
})
export class DriverPaymentListComponent {
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
      this.filterListwithdraw()
    });
  }

  ngAfterViewInit(): void {
    this.spoller.initSpollers();
  }
  async handlePage(e: any) {
    this.helper.global_loading = true;
    let from = e.pageIndex * e.pageSize;
    let newusers = await this.listService
      .getAllPaymentDrivers(
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
      .getAllPaymentDrivers(
        0,
        50,
        this.id,
      )
      .toPromise();
    this.payments = newusers.data;
    this.payments_count = newusers.data_count;
    this.helper.global_loading = false;
  }

  async handlePagewithdraw(e: any) {
    this.helper.global_loading = true;
    let from = e.pageIndex * e.pageSize;
    let newusers = await this.listService
      .getAllwithdrawalDrivers(
        from,
        e.pageSize,
        this.id,
      )
      .toPromise();
    this.withdraw_payments = newusers.data;
    this.withdraw_payments_count = newusers.data_count;
    this.helper.global_loading = false;

  }

  async filterListwithdraw() {
    this.helper.global_loading = true;
    let newusers = await this.listService
      .getAllwithdrawalDrivers(
        0,
        50,
        this.id,
      )
      .toPromise();
    this.withdraw_payments = newusers.data;
    this.withdraw_payments_count = newusers.data_count;
    this.helper.global_loading = false;
  }

  getOverallSum(column: string): number {
    return this.payments.reduce((sum, row) => {
      const value = parseFloat(row[column].replace(/[^0-9.-]/g, '')) || 0;
      return sum + value;
    }, 0) ? this.payments.reduce((sum, row) => {
      const value = parseFloat(row[column].replace(/[^0-9.-]/g, '')) || 0;
      return sum + value;
    }, 0) : 0;
  }

  getOverallWithdrawSum(column: string): number {
    return this.withdraw_payments?.reduce((sum, row) => {
      const value = parseFloat(row[column]) || 0;
      return sum + value;
    }, 0) ? this.withdraw_payments?.reduce((sum, row) => {
      const value = parseFloat(row[column]) || 0;
      return sum + value;
    }, 0) : 0;
  }
}