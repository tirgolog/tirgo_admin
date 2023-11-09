import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-moderation-confirm',
  templateUrl: './moderation-confirm.component.html',
  styleUrls: ['./moderation-confirm.component.scss']
})
export class ModerationConfirmComponent implements OnInit {
  data: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListService,
    private toastr: ToastrService,
    private helper: HelperService
  ) { }
  ngOnInit() {
    this.getMerchantItem()
  }

  getMerchantItem() {
    this.route.params.subscribe((params: any) => {
      this.listService.getAllMerchantItem(params.id).subscribe((res) => {
        this.data = res
      })
    })
  }

  async verifyMerchant() {
    const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите одобрить данного пользователя?', 2)
    if(confirm) {
      const response = await this.listService.verifyMerchant(this.data.id).toPromise();
      if(response) {
        this.toastr.success('Мерчант успешно одобрень');
        this.router.navigate(['/moderation'])
      }
      else {
        this.toastr.error(response.error)
     }
    }
  }

  async rejectMerchant() {
    const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите отклонить данного пользователя?', 2)
    if(confirm) {
      const response = await this.listService.rejectMerchant(this.data.id).toPromise();
      if(response) {
        this.toastr.success('Мерчант успешно откланён');
        this.router.navigate(['/moderation'])
      }
      else {
        this.toastr.error(response.error)
     }
    }
  }
}

