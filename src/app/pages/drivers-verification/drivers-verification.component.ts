import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpollersService } from 'src/app/services/spollers.service';
import { AuthService } from "../../services/auth.service";
import { HelperService } from "../../services/helper.service";
import { GridOptions } from 'ag-grid-community';
import { ListService } from "../../services/list.service";
import { DriverVerificationComponent } from '../driver-verification/driver-verification.component';

@Component({
  selector: 'app-drivers-verification',
  templateUrl: './drivers-verification.component.html',
  styleUrls: ['./drivers-verification.component.scss'],
  host: { "id": "main" }
})
export class DriversVerificationComponent {
  id: string = '';
  phone: string = '';
  indentificator: string = '';
  typetransport: string = '';
  dateReg: string = '';
  dateLogin: string = '';
  name: string = '';

  sort: string = 'id';
  reverse: boolean = true;

  gridOptions: any;
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
    this.spoller.initSpollers()
    this.filterList()
    this.gridOptions = <GridOptions>{};
    this.gridOptions.localeText = this.helper.localeTextAgGrid;
    this.gridOptions.defaultExportParams = { onlySelected: true };
    this.gridOptions.rowSelection = 'multiple';
    this.gridOptions.suppressRowClickSelection = true;
    this.gridOptions.suppressScrollOnNewData = true;
    this.gridOptions.resizable = true;
  }

  downloadFile(filename) {
    this.authService.downloadFile(filename).subscribe((res: any) => {
      const url = window.URL.createObjectURL(res);
      window.open(url, '_blank');
    })
  }


  goToColumn(ev: any): void {
    const dialogRef = this.dialog.open(DriverVerificationComponent, {
      width: '60%',
      height: '70%',
      panelClass: 'custom-dialog-class',
      data: ev
    });
  }



  ngAfterViewInit(): void {
    this.spoller.initSpollers()
  }


  async handlePage(e: any) {
    this.helper.global_loading = true;
    let from = e.pageIndex * e.pageSize
    let newusers = await this.listService.getAllunVerifiedDrivers().toPromise();
    this.helper.drivers = newusers.data;
    this.helper.drivers_count = newusers.data_count;
    this.helper.global_loading = false;
    console.log(e)
    console.log(e.pageIndex)
    console.log(e.pageSize)
  }

  async filterList() {
    this.helper.global_loading = true;
    let newusers = await this.listService.getAllunVerifiedDrivers().toPromise();
    this.helper.drivers = newusers.data;
    this.helper.drivers_count = newusers.data_count;
    this.helper.global_loading = false;
  }
  async filterClear() {
    this.id = '';
    this.phone = '';
    this.dateReg = '';
    this.dateLogin = '';
    this.name = '';
    this.indentificator = '';
    this.typetransport = '';
    this.helper.isLoading = true;
    let newusers = await this.listService.getAllunVerifiedDrivers().toPromise();
    this.helper.drivers = newusers.data;
    this.helper.drivers_count = newusers.count;
    this.helper.isLoading = false;
  }
}
