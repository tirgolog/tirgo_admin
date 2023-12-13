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
      width: '60%',
      height: '70%',
      panelClass: 'custom-dialog-class',
      data: ev
    });
  }

  async handlePage(e: any) {
    this.helper.global_loading = true;
    let drivers = await this.listService.getAllunVerifiedDrivers().toPromise();
    this.helper.drivers = drivers.data;
    this.helper.drivers_count = drivers.data_count;
    this.helper.global_loading = false;
  }

  async filterList() {
    this.helper.global_loading = true;
    let newusers = await this.listService.getAllunVerifiedDrivers().toPromise();
    this.helper.drivers = newusers.data;
    this.helper.drivers_count = newusers.data_count;
    this.helper.global_loading = false;
  }

}
