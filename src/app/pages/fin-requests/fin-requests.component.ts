import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-fin-requests',
  templateUrl: './fin-requests.component.html',
  styleUrls: ['./fin-requests.component.scss']
})
export class FinRequestsComponent implements OnInit{
  @ViewChild("dialogRef") dialogRef: TemplateRef<any>;
  selectedData: any;
  data:any;
  constructor(
    private dialog: MatDialog,
    private listService: ListService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.getReqFinance();
    // this.data = [
    //   {id: 1, full_name: "Name Nameov", type: "Вывод средств", status: "Активен"}
    // ]
  }

  getReqFinance() {
    this.listService.getReqFinanceDrivers().subscribe((res:any) => {
       if(res) {
          this.data = res.data;
       }
    })
 }

  goToColumn(item) {
    if(item.status == 0) {
      this.selectedData = item;
      const dialogRef = this.dialog.open(this.dialogRef, {
        data: '',
      });
      dialogRef.afterClosed().subscribe(() => {
        // this.getAllFinance();
      });    
    }
  }

  closeRequest() {
    if(this.selectedData) {
      this.listService.closeReqFinanceDrivers(this.selectedData).subscribe((res:any) => {
        if(res) {
          this.dialog.closeAll()
          this.toastr.success('Успешно завершен');
        }
      }, error => {
        this.dialog.closeAll()
        this.toastr.error(error.message)
      })
    }
  }
}
