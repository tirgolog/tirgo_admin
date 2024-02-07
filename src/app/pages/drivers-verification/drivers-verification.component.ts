import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpollersService } from 'src/app/services/spollers.service';
import { AuthService } from "../../services/auth.service";
import { HelperService } from "../../services/helper.service";
import { ListService } from "../../services/list.service";
import { DriverVerificationComponent } from '../driver-verification/driver-verification.component';

@Component({
  selector: 'app-drivers-verification',
  templateUrl: './drivers-verification.component.html',
  styleUrls: ['./drivers-verification.component.scss'],
  host: { "id": "main" }
})
export class DriversVerificationComponent {
  drivers: any[] = [];
  count: any;
  loading: boolean = false;
  sizespage = [
    50, 100, 200, 500, 1000, 5000
  ]
  constructor(public dialog: MatDialog,
    public spoller: SpollersService,
    public helper: HelperService,
    public listService: ListService,
    public authService: AuthService) {
  }

  ngOnInit(): void {
    this.filterList()
  }

  goToColumn(ev: any): void {
    const dialogRef = this.dialog.open(DriverVerificationComponent, {
      minWidth: '40vw',
      maxWidth: '70vw',
      minHeight: '50vh',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-class',
      data: ev
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      let drivers = await this.listService.getAllunVerifiedDrivers().toPromise();
      this.drivers = drivers.data;
      this.count = drivers.data_count;
    });
  }

  async handlePage(e: any) {
    this.loading = true;
    let drivers = await this.listService.getAllunVerifiedDrivers().toPromise();
    this.drivers = drivers.data;
    this.count = drivers.data_count;
    this.loading = false;
  }

  async filterList() {
    this.loading  = true;
    let drivers = await this.listService.getAllunVerifiedDrivers().toPromise();
    this.drivers = drivers.data;
    this.count = drivers.data_count;
    this.loading = false;
  }

}
