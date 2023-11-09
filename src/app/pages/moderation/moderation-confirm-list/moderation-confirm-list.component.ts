import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-moderation-confirm-list',
  templateUrl: './moderation-confirm-list.component.html',
  styleUrls: ['./moderation-confirm-list.component.scss']
})
export class ModerationConfirmListComponent {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
 ) { }
 
 ngOnInit() {
 }

 closeConfirmModal() {
  this.dialog.closeAll()
 }
}
