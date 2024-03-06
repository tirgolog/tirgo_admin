import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { HelperService } from "../../services/helper.service";
import { AuthService } from "../../services/auth.service";
import { PriviewComponent } from 'src/app/components/priview/priview.component';
import { ListService } from 'src/app/services/list.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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
    mytruck: any
    selectedFile = null;
    constructor(
        public http: HttpClient,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private authService: AuthService,
        public helper: HelperService,
        public listService: ListService,
        private toastr: ToastrService) {
        this.driver = data;
    }

    async ngOnInit() {
        this.authService.typetruck = await this.authService.getTypeTruck().toPromise();
        this.file_url = 'https://admin.tirgo.io/api/file/'
        const res = await this.authService.getUserInfo(+this.data).toPromise();
        if (res.status) {
            this.user = res.data
        }
        this.passport_series_numbers = this.user?.passport_series_numbers;
        this.driver_license = this.user?.driver_license;
        this.passport_date = this.user?.passport_date;
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

    verify(id) {
        this.listService.verifyDriverItem(id).subscribe(res => {
            if (res.status) {
                this.toastr.success('Драйвер проверен успешно')
                this.dialog.closeAll()
            } else {
                this.toastr.error(res.error)
            }
        })
    }

    update(driver) {
        this.listService.editVerifyDriver(driver).subscribe(res => {
            if (res.status) {
                this.dialog.closeAll()
                this.toastr.success('Проверьте успешность обновления драйвера')
            } else {
                this.toastr.error(res.error)
            }
        })
    }

    postImage(formData, field) {
        this.listService.postImage(formData).subscribe(res => {
            switch (field) {
                case 'transport_front_photo':
                    this.driver.transport_front_photo = res?.file?.filename;
                    break;
                case 'transport_back_photo':
                    this.driver.transport_back_photo = res?.file?.filename
                    break;
                case 'transport_side_photo':
                    this.driver.transport_side_photo = res?.file?.filename
                    break;
                case 'techpassport_photo1':
                    this.driver.techpassport_photo1 = res?.file?.filename
                    break;
                case 'techpassport_photo2':
                    this.driver.techpassport_photo2 = res?.file?.filename
                    break;
                case 'transportation_license_photo':
                    this.driver.transportation_license_photo = res?.file?.filename
                    break;
                case 'adr_photo':
                    this.driver.adr_photo = res?.file?.filename
                    break;
                case 'selfies_with_passport':
                    this.driver.selfies_with_passport = res?.file?.filename
                    break;
            }
        })
    }

    processFile(event: any, name, field) {
        this.selectedFile = event.target.files[0];
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
        formData.append('typeImage', 'verification');
        this.listService.delPhotoUser(name).subscribe((responce) => {
            if (responce.status) {
                this.postImage(formData, field)
                switch (field) {
                    case 'transport_front_photo':
                        this.driver.transport_front_photo = '';
                        break;
                    case 'transport_back_photo':
                        this.driver.transport_back_photo = '';
                        break;
                    case 'transport_side_photo':
                        this.driver.transport_side_photo = '';
                        break;
                    case 'techpassport_photo1':
                        this.driver.techpassport_photo1 = '';
                        break;
                    case 'techpassport_photo2':
                        this.driver.techpassport_photo2 = '';
                        break;
                    case 'transportation_license_photo':
                        this.driver.transportation_license_photo = '';
                        break;
                    case 'adr_photo':
                        this.driver.adr_photo = '';
                        break;
                    case 'selfies_with_passport':
                        this.driver.selfies_with_passport = '';
                        break;
                }
            } else {
                console.log(responce)
            }
        })

    }
}       
