import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SpollersService } from "src/app/services/spollers.service";
import { AuthService } from "../../services/auth.service";
import { HelperService } from "../../services/helper.service";
import { ListService } from "../../services/list.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-apply-service",
  templateUrl: "./apply-service.component.html",
  styleUrls: ["./apply-service.component.scss"],
  host: { id: "main" },
})
export class ApplyServiceComponent {
  services
  dataUser = {
    user_id: '',
    phone: '',
    name: '',
    services_id: 0,
    balance: '',
    price_uzs: '',
    price_kzs: ''
  };
  constructor(
    public dialog: MatDialog,
    public spoller: SpollersService,
    public helper: HelperService,
    public listService: ListService,
    public authService: AuthService,
    public toastr: ToastrService) { }
  ngOnInit() {
    this.getAllServices();
  }

  async getAllServices() {
    this.services = await this.listService.getAllServies().toPromise();
  }

  async applyService() {
    if (!this.dataUser.name || !this.dataUser.phone || !this.dataUser.user_id || !this.dataUser.services_id) {
      await this.helper.openDialogConfirm('Ошибка', 'Не все поля заполнены корректно', 1)
    } else {
      const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить данного пользователя?', 2)
      if (confirm) {
        await this.listService.addDriverServices(this.dataUser).subscribe(res => {
          if (res.status) {
            this.toastr.success('Служба успешно подключилась к драйверу')
            this.dialog.closeAll();
          } else {
            this.toastr.error(res.error)
          }
        });
      }
    }
  }
  searchUser(user_id) {
    if (user_id) {
      this.listService.getSearchAlphaPaymentAdmin(user_id).subscribe(res => {
        this.dataUser.phone = res.user.phone;
        this.dataUser.name = res.user.name;
        this.dataUser.balance = res.total_amount;
      })
    }
  }
  onChange(event: any) {
    this.dataUser.services_id = event.value.id;
    this.dataUser.price_uzs = event.value.price_uzs;
    this.dataUser.price_kzs = event.value.price_kzs;
  }

}