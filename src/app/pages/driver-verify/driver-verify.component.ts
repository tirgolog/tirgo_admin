import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { HelperService } from "../../services/helper.service";
import { AuthService } from "../../services/auth.service";
import { PriviewComponent } from 'src/app/components/priview/priview.component';
import { ListService } from 'src/app/services/list.service';

@Component({
    selector: 'app-driver-verify',
    templateUrl: './driver-verify.component.html',
    styleUrls: ['./driver-verify.component.scss']
})
export class DriverVerifyComponent {
    passport_series_numbers: string = '';
    driver_license: string = '';
    passport_date: string = '';
    activity: any[] = [];
    editInfo: boolean = false;
    file_url: string;
    namedriver: string = '';
    user: any;
    driver: any;
    mytruck: any
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private authService: AuthService,
        public helper: HelperService,
        public listService: ListService,
    ) {
        console.log(data)
        this.driver = data
    }

    async ngOnInit() {
        this.authService.typetruck = await this.authService.getTypeTruck().toPromise();
        this.file_url = 'https://admin.tirgo.io/file/'
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

    returnNameTypeTransport(type: number) {
        const index = this.authService.typetruck.findIndex(e => +e.id === +type)
        if (index >= 0) {
            return this.authService.typetruck[index].name
        } else {
            return 'Не выбрано'
        }
    }

    preview(image?: string): void {
        const dialog = this.dialog.open(PriviewComponent, {
            data: image,
            height: "600px",
            width: "800px",
            panelClass: 'custom-dialog-class',
        });
    }


}
