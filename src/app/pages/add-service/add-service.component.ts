import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
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
    service = { name: '', price:''}
    constructor(
        private toastr: ToastrService,
        public listService: ListService,
        public helper: HelperService,
        public dialog: MatDialog) { }
    ngOnInit() { }

    addService() {

    }
} 