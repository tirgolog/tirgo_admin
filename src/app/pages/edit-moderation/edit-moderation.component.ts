import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-moderation',
  templateUrl: './edit-moderation.component.html',
  styleUrls: ['./edit-moderation.component.scss']
})
export class EditModerationComponent implements OnInit{
  passportFile: FileList;
  passportNames: string[] = [];

  certificateFile: FileList;
  certificateNames: string[] = [];

  phone2:boolean = false;
  factAddressShow:boolean = false;
  bankAccountCurrency: boolean = false;
  data
  constructor() {}
  ngOnInit(): void {
    this.data = {supervisor_passport:'', certificate_registration:''}
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
}
