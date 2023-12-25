import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { HelperService } from "../../services/helper.service";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { AddTransactionsComponent } from "../../components/add-transactions/add-transactions.component";
import { UserComponent } from "../user/user.component";
import { ListService } from 'src/app/services/list.service';

@Component({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.scss'],
    host: { "id": "main" }
})

export class DriverComponent {
    passport_series_numbers: string = '';
    driver_license: string = '';
    passport_date: string = '';
    activity: any[] = [];
    editInfo: boolean = false;
    file_url: string;
    namedriver: string = '';

    user: any;
    agent: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        public authService: AuthService,
        private toastr: ToastrService,
        public helper: HelperService,
        public listService: ListService,
    ) {
        this.user = { merch_id: '' }
    }
    returnAcceptOrder(items) {
        let newitems = items.filter(e => e.status === 3)
        return newitems.length
    }
    returnRejectOrder(items) {
        let newitems = items.filter(e => e.status === 0)
        return newitems.length
    }
    async ngOnInit() {
        this.file_url = 'https://admin.tirgo.io/file/'
        const res = await this.authService.getUserInfo(+this.data).toPromise();
        if (res.status) {
            console.log(this.data)
            this.user = res.data
        } else {
            this.user = this.data
        }
        if (this.user.agent_id) {
            this.getAgent(this.user.agent_id)
        }
        console.log(this.authService.currentUser.user_type)
        this.passport_series_numbers = this.user.passport_series_numbers;
        this.driver_license = this.user.driver_license;
        this.passport_date = this.user.passport_date;
        this.activity = this.helper.activity.filter(e => e.userid === this.user.id)
        this.namedriver = this.user.name;
    }

    async getAgent(id) {
        this.listService.getAgent(id).toPromise().then((res) => {
            if (res.status) {
                this.agent = res.data;
                console.log(this.agent)
            }
        })
    }

    async updateUser() {
        let data = {
            passport_series_numbers: this.passport_series_numbers,
            driver_license: this.driver_license,
            passport_date: this.passport_date
        }
        const res = await this.authService.saveUser(data, this.user.id).toPromise();
        if (res.status) {
            this.toastr.success("Информация о пользователе успешно обновлена")
            const index = this.helper.drivers.findIndex(e => e.id === this.user.id)
            if (index >= 0) {
                this.helper.drivers[index].driver_license = this.driver_license;
                this.helper.drivers[index].passport_series_numbers = this.passport_series_numbers;
                this.helper.drivers[index].passport_date = this.passport_date;
            }
        } else {
            this.toastr.error(res.error)
        }
    }
    async delDirty() {
        const res = await this.authService.delDirty(this.user.id).toPromise();
        if (res.status) {
            this.user.dirty = 0;
            this.toastr.success("Временная блокировка снята");
        } else {
            this.toastr.error(res.error)
        }
    }
    async modarateUser() {
        const res = await this.authService.modarateUser(this.user.id).toPromise();
        if (res.status) {
            this.user.moderation = 1;
            this.toastr.success("Водитель прошел подерацию");
        } else {
            this.toastr.error(res.error)
        }
    }
    async deletUser() {
        const res = await this.authService.deleteUser(this.user.id).toPromise();
        if (res.status) {
            this.toastr.success("Пользователь удален");
            this.dialog.closeAll()
        } else {
            this.toastr.error(res.error)
        }
    }
    async returnUser() {
        const res = await this.authService.returnUser(this.user.id).toPromise();
        if (res.status) {
            this.toastr.success("Пользователь восстановлен");
            this.dialog.closeAll()
        } else {
            this.toastr.error(res.error)
        }
    }
    async editInfoGo() {
        if (this.editInfo) {
            const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите изменить данного пользователя?', 2)
            if (confirm) {
                const res = await this.authService.saveUserInfo(this.user.name, this.user.birthday, this.user.country, this.user.city, this.user.id).toPromise();
                if (res.status) {
                    this.editInfo = false;
                    this.toastr.success("Информация о пользователе обновлена");
                }
            }
        } else {
            this.editInfo = !this.editInfo
        }
    }
    async savePassportUser() {
        const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите изменить данные паспорта пользователя?', 2)
        if (confirm) {
            const res = await this.authService.savePassportUser(this.passport_series_numbers, this.passport_date, this.user.id).toPromise();
            if (res.status) {
                this.toastr.success("Информация о пользователе изменена");
            } else {
                this.toastr.error(res.error)
            }
        }
    }
    async saveDriverLicenseUser() {
        const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите изменить данные водительского удостоверения пользователя?', 2)
        if (confirm) {
            const res = await this.authService.saveDriverLicenseUser(this.driver_license, this.user.id).toPromise();
            if (res.status) {
                this.toastr.success("Информация о пользователе изменена");
            } else {
                this.toastr.error(res.error)
            }
        }
    }
    async saveNewMerchantId() {
        const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить водителя вк данному мерчанту?', 2)
        if (confirm) {
            const res = await this.authService.saveNewMerchantId(this.user.merch_id, this.user.id).toPromise();
            if (res.status) {
                this.toastr.success("Информация о пользователе изменена");
            } else {
                this.toastr.error(res.error)
            }
        }
    }
    goToColumn(id) {
        if (id) {
            const dialogRef = this.dialog.open(UserComponent, {
                width: '90%',
                height: '80%',
                panelClass: 'custom-dialog-class',
                data: id
            });
        } else {
            this.toastr.error('Сначала нужно назначить мерчанта')
        }
    }
    addMoney() {
        this.dialog.open(AddTransactionsComponent, {
            data: this.data
        });
    }
}
