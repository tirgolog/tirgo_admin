import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-priview',
  templateUrl: './priview.component.html',
  styleUrls: ['./priview.component.scss']
})
export class PriviewComponent {
  image: string = '';
  file_url = 'https://admin.tirgo.io/file/'
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog){
      this.image=this.data
    }
}
