import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { HelperService } from "src/app/services/helper.service";
import { ListService } from "src/app/services/list.service";

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss'],
  host: { "id": "main" }
})
export class AddServiceComponent {
  service = { id: null, name: null, priceKZT: null, priceUZS: null }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    public listService: ListService,
    public helper: HelperService,
    public dialog: MatDialog) { }
  ngOnInit() {
    if (this.data) {
      this.service = this.data;
    }
  }

  addService() {
    if (this.service.id !== null) {
      // Update logic
    }
    else {
      // Create logic
    }
  }
} 