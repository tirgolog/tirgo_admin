import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PriviewComponent } from 'src/app/components/priview/priview.component';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-edit-moderation',
  templateUrl: './edit-moderation.component.html',
  styleUrls: ['./edit-moderation.component.scss']
})
export class EditModerationComponent implements OnInit {
  @ViewChild("dialogRef") dialogRef: TemplateRef<any>;
  @ViewChild("dialogPreview") dialogPreview: TemplateRef<any>;

  fileApi = 'https://merchant.tirgo.io/api/v1/file/download/';
  selectedFileNames: any;
  passportFile: FileList;
  passportNames: string[] = [];

  certificateFile: FileList;
  certificateNames: string[] = [];

  phone2: boolean = false;
  factAddressShow: boolean = false;
  bankAccountCurrency: boolean = false;
  data
  transactionRequest: any[] = [];
  transaction: any;
  balance: any;
  frozenBalance: any;
  image: any;

  sizespage = [
    50, 100, 200, 500, 1000, 5000
  ]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private list: ListService,
    public helper: HelperService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.data = { supervisor_passport: '', certificate_registration: '' }
    this.getData();
    this.getTransactions();
    this.getBalance();
  }

  getData() {
    this.helper.loadingCreate();
    this.route.params.subscribe((res: any) => {
      this.data.id = res.id
      if (res) {
        this.helper.loadingClose();
        this.list.getMerchantById(res.id).subscribe((data: any) => {
          if (data)
            this.data = data;
        })
      }
    })
  }

  editMerchant() {
    this.helper.loadingCreate();
    this.list.editMerchant(this.data).subscribe((res: any) => {
      if (res) {
        this.helper.loadingClose();
        this.toastr.success('Успешно обновлен');
        this.router.navigate(['/moderation'])
      }
    })
  }

  getTransactions() {
    this.list.getTransactionByMerchant(this.data.id).subscribe((res) => {
      if (res) {
        this.transactionRequest = res.data;
      }
    })
  }

  getBalance() {
    this.list.getMerchantBalance(this.data.id).subscribe((res) => {
      if (res.success) {
        this.balance = res.data.activeBalance;
        this.frozenBalance = res.data.frozenBalance;
      }
    })
  }

  addPhone() {
    this.data.phoneNumbers.push('');
  }

  selectPassport(event: any): void {
    this.passportNames = [];
    this.passportFile = event.target.files;

    if (this.passportFile && this.passportFile[0]) {
      const numberOfFiles = this.passportFile.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
        };
        reader.readAsDataURL(this.passportFile[i]);
        this.passportNames.push(this.passportFile[i].name);
      }
    }
  }

  selectCertificate(event: any): void {
    this.certificateNames = [];
    this.certificateFile = event.target.files;

    if (this.certificateFile && this.certificateFile[0]) {
      const numberOfFiles = this.certificateFile.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
        };
        reader.readAsDataURL(this.certificateFile[i]);
        this.certificateNames.push(this.certificateFile[i].name);
      }
    }
  }

  goToColumn(item) {
    if (!item.verified && !item.rejected) {
      this.transaction = item;
      console.log(this.transaction);

      const dialogRef = this.dialog.open(this.dialogRef, {
        data: item,
      });
      dialogRef.afterClosed().subscribe(() => {
        this.getTransactions()
      });
    }
  }

  async handlePage(e: any) {
    // this.helper.global_loading = true;
    // let from = e.pageIndex * e.pageSize
    // let newusers = await this.list.getAllMerchants().toPromise();
    // this.helper.merchants = newusers.data;
    // this.helper.merchants_count = newusers.data_count;
    // this.helper.global_loading = false;
  }

  verifyTransaction(transaction) {
    if (transaction.amount <= this.balance) {
      this.list.verifyTransaction(transaction.id).subscribe((res) => {
        if (res.success) {
          this.getBalance();
          this.dialog.closeAll();
          this.toastr.success('Успешно завершено')
        } else {
          if (res.errors[0] = 'notEnoughBalance') {
            this.toastr.error('Баланса не хватает')
          } else {
            this.toastr.error('Не успешно завершено')
          }
        }
      })
    } else {
      this.toastr.error('Баланса не хватает')
    }
  }

  rejectTransaction(id) {
    this.list.rejectTransaction(id).subscribe((res) => {
      if (res) {
        this.dialog.closeAll();
        this.toastr.success('Успешно завершено')
      }
    })
  }

  addItem() {
    this.data.bankAccounts.push({ account: '', currencyName: 'USD' });
  }

  removeItem(i) {
    this.data.bankAccounts.splice(1, i);
  }

  preview(image?: string): void {
    if (image) {
      this.image = image;
      const dialog = this.dialog.open(this.dialogPreview, {
        data: image,
        height: "600px",
        width: "800px",
        panelClass: 'custom-dialog-class',
      });
    }

  }

  selectFile(event: any, name: string) {
    if (name == "logoFilePath") this.selectedFileNames = event.target.files[0].name;
    if (name == "registrationCertificateFilePath")
      this.certificateNames = event.target.files[0].name;
    if (name == "passportFilePath")
      this.passportNames = event.target.files[0].name;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    this.authService.fileUpload(formData).subscribe(
      (response) => {
        if (response) {
          this.toastr.success('Файл успешно загружен')
          this.data[name] = response.filename;
        }
      },
      (error) => {
        this.toastr.error(error.message)
      }
    );
  }

}
