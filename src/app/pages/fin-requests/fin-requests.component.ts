import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fin-requests',
  templateUrl: './fin-requests.component.html',
  styleUrls: ['./fin-requests.component.scss']
})
export class FinRequestsComponent implements OnInit{
  @ViewChild("dialogRef") dialogRef: TemplateRef<any>;

  data:any;
  constructor(
    private dialog: MatDialog,
  ) {}
  ngOnInit() {
    this.data = [
      {id: 1, full_name: "Name Nameov", type: "Вывод средств", status: "Активен"}
    ]
  }

  goToColumn(id) {
    const dialogRef = this.dialog.open(this.dialogRef, {
      data: '',
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.getAllFinance();
    });    
  }
}
