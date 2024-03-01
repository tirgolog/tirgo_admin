import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Subject, debounceTime, distinctUntilChanged, switchMap } from "rxjs";
import { HelperService } from "src/app/services/helper.service";
import { ListService } from "src/app/services/list.service";

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss'],
  host: { "id": "main" }
})
export class AddServiceComponent {
  service = { id: null, name: null, price_kzs: null, price_uzs: null, rate:null }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public listService: ListService,
    private toastr: ToastrService,
    public helper: HelperService,
    public dialog: MatDialog) { }

  ngOnInit() {
    if (this.data) {
      console.log(this.data)
      this.service = this.data;
    }else{
      this.getPaymentCourse()
    }
  }
  getPaymentCourse() {
    this.listService.getPaymentCourse().subscribe(res => {
      this.service.rate = res.data
    })
  }

  onInputChange(target: any, key): void {
    if (target.value != 0 || target.value != '') {
      this.listService.getAllCountMoney(key, target.value).subscribe(res => {
        if (key === 'KZT') {
          this.service.price_uzs = res.data
        } else {
          this.service.price_kzs = res.data
        }
      })
    } else {
      if (key === 'KZT') {
        this.service.price_uzs = '';
      } else {
        this.service.price_kzs = '';
      }
    }
  }

  addService() {
    if (this.service.id !== null) {
      this.listService.editService(this.service, this.service.id).subscribe(res => {
        if (res.status) {
          this.toastr.success('Редактировать услуги')
          this.dialog.closeAll();
        } else {
          this.toastr.error(res.error)
        }
      })
    }
    else {
      this.listService.postService(this.service).subscribe(res => {
        if (res.status) {
          this.toastr.success('Добавить услуги')
          this.dialog.closeAll();
        } else {
          this.toastr.error(res.error)
        }
      })
    }
  }
} 