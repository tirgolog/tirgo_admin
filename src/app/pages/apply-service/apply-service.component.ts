import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SpollersService } from "src/app/services/spollers.service";
import { AuthService } from "../../services/auth.service";
import { HelperService } from "../../services/helper.service";
import { ListService } from "../../services/list.service";

@Component({
  selector: "app-apply-service",
  templateUrl: "./apply-service.component.html",
  styleUrls: ["./apply-service.component.scss"],
  host: { id: "main" },
})
export class ApplyServiceComponent {
  subscription
  dataUser = {
    user_id: '',
    agent_id: 0,
    phone: '',
    name: '',
    subscription_id: 0,
    balance: ''
  };
  constructor(
    public dialog: MatDialog,
    public spoller: SpollersService,
    public helper: HelperService,
    public listService: ListService,
    public authService: AuthService,
  ) { }
  ngOnInit() {
    this.getAllSubcription();
   }

  async getAllSubcription() {
    this.subscription = await this.listService.getAllSubscription().toPromise()
  }

  applyService() {

  }
  searchUser(user_id) {
    if(user_id) {
      this.listService.getSearchDriverAgentAdmin(user_id).subscribe(res => {
        this.dataUser.name = res.name;
        this.dataUser.phone = res.phone;
      })
    }
  }
  onChange(event:any) { 
    this.dataUser.subscription_id = event.value;
  }

}