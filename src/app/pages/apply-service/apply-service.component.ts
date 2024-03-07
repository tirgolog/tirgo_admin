import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SpollersService } from "src/app/services/spollers.service";
import { AuthService } from "../../services/auth.service";
import { HelperService } from "../../services/helper.service";
import { ListService } from "../../services/list.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-apply-service",
  templateUrl: "./apply-service.component.html",
  styleUrls: ["./apply-service.component.scss"],
  host: { id: "main" },
  providers: [
    DatePipe
  ]
})
export class ApplyServiceComponent {
  formattedData: any[] = []
  services;
  dataUser = {
    user_id: '',
    phone: '',
    name: '',
    services_id: 0,
    balance: '',
    price_uzs: '',
    price_kzs: '',
    to_subscription: '',
    rate: '',
    services: []
  };
  constructor(
    public datePipe: DatePipe,
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
    this.formattedData = [ ]
    console.log(this.dataUser.services);
    this.dataUser.services.forEach(service => {
      const formattedService = {
        service_id: service.id,
        price_uzs: service.price_uzs,
        price_kzs: service.price_kzs,
        rate: service.rate,
      };
      this.formattedData.push(formattedService);
    });

    let dataSend = {
      user_id: this.dataUser.user_id,
      phone: this.dataUser.phone,
      services: this.formattedData
    };

    if (!this.dataUser.to_subscription) {
      this.dataUser.services = [];
      this.toastr.info('У драйвера нет подписки или она уже закончилась')
    }
    else {
      if (!this.dataUser.name || !this.dataUser.phone || !this.dataUser.user_id || this.dataUser.services.length == 0 ) {
        await this.helper.openDialogConfirm('Ошибка', 'Не все поля заполнены корректно', 1)
      } else {
        const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить данного пользователя?', 2)
        if (confirm) {
          await this.listService.addDriverServices(dataSend).subscribe(res => {
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
  }
  searchUser(user_id) {
    if (user_id) {
      this.listService.getSearchAlphaPaymentAdmin(user_id).subscribe(res => {
        this.dataUser.phone = res.user.phone;
        this.dataUser.name = res.user.name;
        this.dataUser.balance = res.total_amount;
        this.dataUser.to_subscription = res.user.to_subscription ? this.datePipe.transform(res.user.to_subscription, 'dd/MM/yyyy') : "Подписка нет";
      })
    }
  }
  onChange(event, service: any) {
    service.selected = !service.selected;
    this.dataUser.services = this.services?.data.filter(service => service.selected);
    console.log(this.dataUser.services);
    
    // if (event.checked) {
    //   let serviceAlreadySelected = false;
    //   for (let i = 0; i < this.dataUser.services.length; i++) {
    //     if (this.dataUser.services[i].id === service.id) {
    //       serviceAlreadySelected = true;
    //       break;
    //     }
    //   }
    //   if (!serviceAlreadySelected) {
    //     this.dataUser.services.push(service);
    //   }
    // } else {
    //   const index = this.dataUser.services.findIndex(s => s.id === service.id);
    //   if (index !== -1) {
    //     this.dataUser.services.splice(index, 1);
    //   }
    // }
  }

}