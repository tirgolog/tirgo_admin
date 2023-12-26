import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';
import { SpollersService } from 'src/app/services/spollers.service';
import { Router } from '@angular/router';
import { AddSubscriptionComponent } from '../add-subscription/add-subscription.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  id: string = '';
  phone: string = '';
  dateReg: string = '';
  dateLogin: string = '';
  name: string = '';
  city: string = '';
  logo: string = '';
  subscriptions: [];
  sort: string = 'id';
  reverse: boolean = true;
  unverified: any[] = [];
  sizespage = [
    50, 100, 200, 500, 1000, 5000
  ]
  constructor(
    public dialog: MatDialog,
    public spoller: SpollersService,
    public helper: HelperService,
    public authService: AuthService,
    public listService: ListService,
    public router: Router,
    private toastr: ToastrService) {
  }

  async ngOnInit() {
    this.subscriptions = []
    this.spoller.initSpollers();
    this.subscriptions = await this.listService.getSubscription().toPromise();
    this.helper.global_loading = false;
  }

  ngAfterViewInit(): void {
    this.spoller.initSpollers()
  }
  async handlePage(e: any) {
    this.helper.global_loading = true;
    let from = e.pageIndex * e.pageSize
    this.subscriptions = await this.listService.getSubscription().toPromise();
    this.helper.global_loading = false;
  }

  openPush(): void {
    //  this.dialog.open(PushComponent, {});
  }
  changeSort(ev) {
    this.reverse = !this.reverse
    this.sort = ev.target.value;
  }

  createSubscription(): void {
    const dialogRef = this.dialog.open(AddSubscriptionComponent, {
      width: '150',
      height: '150',
      panelClass: 'custom-dialog-class',
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      this.getAll()
    })
  }

  goToColumn(row): void {
    const dialogRef = this.dialog.open(AddSubscriptionComponent, {
      width: '150',
      height: '150',
      panelClass: 'custom-dialog-class',
      data: row
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      this.getAll()
    })
  }

  async getAll() {
    this.subscriptions = []
    this.spoller.initSpollers();
    this.subscriptions = await this.listService.getSubscription().toPromise();
    this.helper.global_loading = false;
  }


  async delete(id: number) {
    const res = await this.authService.DeleteTypeSubscription(id).toPromise();
    if (res.status) {
      this.toastr.success('Тип подписка успешно удалить')
      this.getAll()
    } else {
      this.toastr.error(res.error)
    }
  }

}
