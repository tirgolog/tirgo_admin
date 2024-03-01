import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';
import { SpollersService } from 'src/app/services/spollers.service';
import { AddServiceComponent } from '../add-service/add-service.component';

@Component({
  selector: 'app-service-types',
  templateUrl: './service-types.component.html',
  styleUrls: ['./service-types.component.scss'],
  host: { "id": "main" }
})
export class ServiceTypesComponent implements OnInit {
  serviceTypes: any;
  paymentCourse: any;
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
    private toastr: ToastrService) {}
  ngOnInit(): void {
    this.getAll();
    this.getPaymentCourse()
  }
  createService() {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      autoFocus: false,
      minWidth: '35vw',
      maxWidth: '55vw',
      minHeight: '35vh',
      maxHeight: '80vh',
      panelClass: 'custom-dialog-class',
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      this.getAll()
      this.getPaymentCourse()
    })
  }
  goToColumn(row) {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      autoFocus: false,
      minWidth: '35vw',
      maxWidth: '55vw',
      minHeight: '35vh',
      maxHeight: '80vh',
      data: row,
      panelClass: "custom-dialog-class",
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      this.getAll()
      this.getPaymentCourse()
    })
  }
  getAll() {
    this.listService.getAllServies().subscribe(res => {
      this.serviceTypes = res.data
    })
  }

  getPaymentCourse() {
    this.listService.getPaymentCourse().subscribe(res => {
      this.paymentCourse = res.data
    })
  }

  handlePage(ev) { }
  async delete(id: number) {
    const res = await this.authService.DeleteTypeSubscription(id).toPromise();
    if (res.status) {
      this.toastr.success('Удаление услуг')
      this.getAll()
    } else {
      this.toastr.error(res.error)
    }
  }
}
