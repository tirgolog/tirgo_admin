import { Component } from '@angular/core';
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
export class ServiceTypesComponent {
  serviceTypes: any;
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
    private toastr: ToastrService
  ) { 
    this.serviceTypes = [
     { id: 1, name: 'Name', priceKZT: '10',priceUZS:'20'}
    ]
  }
  createService() {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      width: '150',
      height: '150',
      panelClass: 'custom-dialog-class',
    });
  }
  goToColumn(row) { 
    const dialogRef = this.dialog.open(AddServiceComponent, {
      minWidth: '40vw',
      maxWidth: '65vw',
      minHeight: '60vh',
      maxHeight: '80vh',
      data: row,
      panelClass: "custom-dialog-class",
    });
  }
  handlePage(ev) { }
  delete(id) { }
}
