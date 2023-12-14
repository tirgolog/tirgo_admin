import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpollersService } from 'src/app/services/spollers.service';
import { AuthService } from "../../services/auth.service";
import { HelperService } from "../../services/helper.service";
import { ListService } from "../../services/list.service";
import { DriverVerifyComponent } from '../driver-verify/driver-verify.component';
@Component({
  selector: 'app-driver-verifed',
  templateUrl: './driver-verifed.component.html',
  styleUrls: ['./driver-verifed.component.scss'],
  host: { "id": "main" }
})
export class DriverVerifedComponent {

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



  async handlePage(e: any) {
    this.helper.global_loading = true;
    let drivers = await this.listService.getAllVerifiedDrivers().toPromise();
    this.helper.drivers = drivers.data;
    this.helper.drivers_count = drivers.data_count;
    this.helper.global_loading = false;
  }

  async filterList() {
    this.helper.global_loading = true;
    let newusers = await this.listService.getAllVerifiedDrivers().toPromise();
    this.helper.drivers = newusers.data;
    this.helper.drivers_count = newusers.data_count;
    this.helper.global_loading = false;
  }

  goToColumn(ev: any): void {
    const dialogRef = this.dialog.open(DriverVerifyComponent, {
      width: '60%',
      height: '70%',
      panelClass: 'custom-dialog-class',
      data: ev
    });
  }

}
