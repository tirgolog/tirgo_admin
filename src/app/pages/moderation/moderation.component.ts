import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';
import { SpollersService } from 'src/app/services/spollers.service';
import { ModerationConfirmListComponent } from './moderation-confirm-list/moderation-confirm-list.component';

@Component({
  selector: 'app-moderation',
  templateUrl: './moderation.component.html',
  styleUrls: ['./moderation.component.scss']
})
export class ModerationComponent implements OnInit {
  id: string = '';
  phone: string = '';
  dateReg: string = '';
  dateLogin: string = '';
  name: string = '';
  city: string = '';
  logo: string = '';

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
  ) {

  }

  async ngOnInit() {
    this.helper.merchants = []
    this.spoller.initSpollers();
    this.helper.merchants = await this.listService.getVerifiedMerchants().toPromise();
    this.unverified = await this.listService.getUnverifiedMerchants().toPromise();
    this.helper.global_loading = false;
  }

  goToColumn(ev: any): void {
    //  const dialogRef = this.dialog.open(UserComponent, {
    //     width: '90%',
    //     height: '80%',
    //     panelClass: 'custom-dialog-class',
    //     data: ev
    //  });
  }
  addUser() {
    //  const dialogRef = this.dialog.open(AddUserComponent, {
    //     width: '90%',
    //     height: '80%',
    //     panelClass: 'custom-dialog-class',
    //  });
  }
  ngAfterViewInit(): void {
    this.spoller.initSpollers()
  }
  async handlePage(e: any) {
    this.helper.global_loading = true;
    let from = e.pageIndex * e.pageSize
    let newusers = await this.listService.getAllMerchants().toPromise();
    this.helper.merchants = newusers.data;
    this.helper.merchants_count = newusers.data_count;
    this.helper.global_loading = false;
  }
  async onScroll() {
    let newusers = await this.listService.getAllUsers(this.helper.users.length, 50, this.id, this.phone, this.dateReg, this.dateLogin, this.name, this.city, this.sort, this.reverse).toPromise();
    this.helper.users = this.helper.users.concat(...newusers.data);
    this.helper.users_count = newusers.data_count;
  }
  openPush(): void {
    //  this.dialog.open(PushComponent, {});
  }
  changeSort(ev) {
    this.reverse = !this.reverse
    this.sort = ev.target.value;
  }
  async filterList() {
    this.helper.isLoading = true;
    let newusers = await this.listService.getAllUsers(0, 50, this.id, this.phone, this.dateReg, this.dateLogin, this.name, this.city, this.sort, this.reverse).toPromise();
    this.helper.users = newusers.data;
    this.helper.users_count = newusers.count;
    this.helper.isLoading = false;
  }
  async filterClear() {
    this.id = '';
    this.phone = '';
    this.dateReg = '';
    this.dateLogin = '';
    this.name = '';
    this.city = '';
    this.sort = 'id'
    this.helper.isLoading = true;
    let newusers = await this.listService.getAllUsers(0, 50, null, null, null, null, null, null, null, this.reverse).toPromise();
    this.helper.users = newusers.data;
    this.helper.users_count = newusers.count;
    this.helper.isLoading = false;
  }

  showConfirmModal() {
    const dialogRef = this.dialog.open(ModerationConfirmListComponent, {
      width: '50%',
      panelClass: 'custom-dialog-class',
      data: this.unverified
    });
  }
}
