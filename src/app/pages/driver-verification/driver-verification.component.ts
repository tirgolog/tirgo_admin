import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { HelperService } from "../../services/helper.service";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { UserComponent } from "../user/user.component";
import { PriviewComponent } from 'src/app/components/priview/priview.component';
import { ListService } from 'src/app/services/list.service';

@Component({
    selector: 'app-driver-verification',
    templateUrl: './driver-verification.component.html',
    styleUrls: ['./driver-verification.component.scss']
})
export class DriverVerificationComponent {
    passport_series_numbers: string = '';
    driver_license: string = '';
    passport_date: string = '';
    activity: any[] = [];
    editInfo: boolean = false;
    file_url: string;
    namedriver: string = '';
 
    user: any;
    driver: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private authService: AuthService,
        private toastr: ToastrService,
        public helper: HelperService,
        public listService: ListService,
    ) {
        console.log(data)
        this.driver=data
    }

    async ngOnInit() {
        this.file_url = 'http://localhost:9000/tirgo/'
        const res = await this.authService.getUserInfo(+this.data).toPromise();
        if (res.status) {
            this.user = res.data
        }
        this.passport_series_numbers = this.user.passport_series_numbers;
        this.driver_license = this.user.driver_license;
        this.passport_date = this.user.passport_date;
        this.activity = this.helper.activity.filter(e => e.userid === this.user.id)
        this.namedriver = this.user.name;
    }

    preview(image?: string): void {
        const dialog = this.dialog.open(PriviewComponent, {
            data:image,
            height: "600px",
            width: "40%",
            panelClass: 'custom-dialog-class',
        });
    }

    verify(id) {
        this.listService.verifyDriverItem(id).subscribe(res => {
            this.dialog.closeAll()
        })
      }
}
