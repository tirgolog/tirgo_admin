import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';

import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatCheckboxModule } from '@angular/material/checkbox'
import {MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { PartnersComponent } from './pages/partners/partners.component'
import { AddPartnerComponent } from './pages/add-partner/add-partner.component';
import { AddDriverComponent } from './pages/add-driver/add-driver.component';
import { ShippersComponent } from './pages/shippers/shippers.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { AddUserComponent } from './pages/add-user/add-user.component';

import { PushComponent } from './components/push/push.component';
import { AddTransactionsComponent } from './components/add-transactions/add-transactions.component';
import { ModalComponent } from './components/modal/modal.component';

import { TrackingComponent } from './pages/tracking/tracking.component';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { AdminsComponent } from './pages/admins/admins.component';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';
import { UserComponent } from './pages/user/user.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { PartnerComponent } from './pages/partner/partner.component';
import { DriverComponent } from './pages/driver/driver.component';
import { OrderComponent } from './pages/order/order.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { RatesComponent } from './pages/rates/rates.component';
import { AddRateComponent } from './pages/add-rate/add-rate.component';
import { PromocodesComponent } from './pages/promocodes/promocodes.component';
import { AddPromocodeComponent } from './pages/add-promocode/add-promocode.component';
import { CarTypesComponent } from './pages/car-types/car-types.component';
import { AddCarTypeComponent } from './pages/add-car-type/add-car-type.component';
import { CargoTypesComponent } from './pages/cargo-types/cargo-types.component';
import { AddCargoTypeComponent } from './pages/add-cargo-type/add-cargo-type.component';
import { ReviewBadgesComponent } from './pages/review-badges/review-badges.component';
import { AddReviewBadgeComponent } from './pages/add-review-badge/add-review-badge.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { AddCountryComponent } from './pages/add-country/add-country.component';
import { StatesComponent } from './pages/states/states.component';
import { AddStateComponent } from './pages/add-state/add-state.component';
import { CitysComponent } from './pages/citys/citys.component';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { ReviewComponent } from './components/review/review.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SettingsComponent } from './pages/settings/settings.component';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './services/api.interceptor';
import { AuthComponent } from './pages/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormatTimePipe } from './pipes/format-time.pipe';

import ruLocale from '@angular/common/locales/ru';
import { registerLocaleData } from "@angular/common";
import { OrderModule } from 'ngx-order-pipe';
import { AgGridModule } from 'ag-grid-angular';

import "ag-grid-enterprise";
import { ViewphotoComponent } from './viewphoto/viewphoto.component'
import {NgxMaskModule} from "ngx-mask";
import { MatSlideToggleModule} from "@angular/material/slide-toggle";
import { ActivityComponent } from './activity/activity.component';
import { ViewadminComponent } from './viewadmin/viewadmin.component';
import { CreateorderComponent } from './pages/createorder/createorder.component';
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { RoutersTruckComponent } from './routers-truck/routers-truck.component';
import { LoadingComponent } from './loading/loading.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { EdituserComponent } from './pages/edituser/edituser.component';
import { EditdriverComponent } from './pages/editdriver/editdriver.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AconfirmComponent } from './aconfirm/aconfirm.component';
import { AloadingComponent } from './aloading/aloading.component';
import { SecuretransComponent } from './pages/securetrans/securetrans.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { AddmoneyComponent } from './components/addmoney/addmoney.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from '@angular/material/card';
import { ExchangerateComponent } from './exchangerate/exchangerate.component';
import {NgPipesModule} from 'ngx-pipes';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbarModule} from '@angular/material/toolbar';

import { ModerationComponent } from './pages/moderation/moderation.component';
import { ModerationConfirmComponent } from './pages/moderation-confirm/moderation-confirm.component';
import { ModerationConfirmListComponent } from './pages/moderation/moderation-confirm-list/moderation-confirm-list.component';
import { EditModerationComponent } from './pages/edit-moderation/edit-moderation.component';
import { FinRequestsComponent } from './pages/fin-requests/fin-requests.component';
import { DriversVerificationComponent } from './pages/drivers-verification/drivers-verification.component';
import { DriverVerificationComponent } from './pages/driver-verification/driver-verification.component';
import { PriviewComponent } from './components/priview/priview.component';
import { DriverVerifedComponent } from './pages/driver-verifed/driver-verifed.component';
import { DriverVerifyComponent } from './pages/driver-verify/driver-verify.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { AddSubscriptionComponent } from './pages/add-subscription/add-subscription.component';
import { AgentDriverComponent } from './pages/agent-driver/agent-driver.component';
import { AddAgentDriverComponent } from './pages/add-agent-driver/add-agent-driver.component';
import { MatRadioModule } from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import { AgentDriverDetailComponent } from './pages/agent-driver-detail/agent-driver-detail.component';
import { ErrorInterceptorService } from './services/error-interceptor';
import { AgentListComponent } from './pages/agent-list/agent-list.component';
import { AgentListDriverComponent } from './pages/agent-list-driver/agent-list-driver.component';
import { AgentBalanceComponent } from './pages/agent-balance/agent-balance.component';
import { AddDriverSubscriptionComponent } from './pages/add-driver-subscription/add-driver-subscription.component';
import { ThousandSeparatorPipe } from './pipes/thousand-separator.pipe';
import { DriverPaymentListComponent } from './pages/driver-payment-list/driver-payment-list.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthGuard } from './guards/auth.guard';
import { ConnectToAgentComponent } from './pages/connect-to-agent/connect-to-agent.component';
import { AddSubsciptionExitingComponent } from './pages/add-subsciption-exiting/add-subsciption-exiting.component';
import { HistoryTransactionDriverComponent } from './pages/history-transaction-driver/history-transaction-driver.component';
import { HistoryTransactionDriverAgentComponent } from './pages/history-transaction-driver-agent/history-transaction-driver-agent.component';
import { StartsWith998Pipe } from './pipes/starts-with998.pipe';
import { AddServiceComponent } from './pages/add-service/add-service.component';
import { ServiceTypesComponent } from './pages/service-types/service-types.component';
import { ApplyServiceComponent } from './pages/apply-service/apply-service.component';
import { ApplyServiceHistoryComponent } from './pages/apply-service-history/apply-service-history.component';
import { DriverServiceTransactionsComponent } from './pages/driver-service-transactions/driver-service-transactions.component';
registerLocaleData(ruLocale);

const mapConfig: YaConfig = {
   apikey: 'df0cb391-97e5-47ce-a954-f54cb0644e56',
   lang: 'ru_RU',
};

@NgModule({
   declarations: [
      AppComponent,
      SidebarComponent,
      HeaderComponent,
      HomeComponent,
      UsersComponent,
      ShippersComponent,
      OrdersComponent,
      PushComponent,
      TransactionsComponent,
      AddTransactionsComponent,
      ModalComponent,
      AddUserComponent,
      AddPartnerComponent,
      AddDriverComponent,
      TrackingComponent,
      AdminsComponent,
      RolesComponent,
      AddRoleComponent,
      AddAdminComponent,
      UserComponent,
      PartnerComponent,
      DriverComponent,
      OrderComponent,
      TransactionComponent,
      RatesComponent,
      AddRateComponent,
      PromocodesComponent,
      AddPromocodeComponent,
      CarTypesComponent,
      AddCarTypeComponent,
      CargoTypesComponent,
      AddCargoTypeComponent,
      ReviewBadgesComponent,
      AddReviewBadgeComponent,
      CountriesComponent,
      AddCountryComponent,
      StatesComponent,
      AddStateComponent,
      CitysComponent,
      AddCityComponent,
      ReviewsComponent,
      ReviewComponent,
      ChatComponent,
      SettingsComponent,
      AuthComponent,
      ProfileComponent,
      PartnersComponent,
      FormatTimePipe,
      ThousandSeparatorPipe,
      ViewphotoComponent,
      ActivityComponent,
      ViewadminComponent,
      CreateorderComponent,
      RoutersTruckComponent,
      LoadingComponent,
      ArchiveComponent,
      EdituserComponent,
      EditdriverComponent,
      AconfirmComponent,
      AloadingComponent,
      SecuretransComponent,
      AddmoneyComponent,
      ExchangerateComponent,
      ModerationComponent,
      ModerationConfirmComponent,
      ModerationConfirmListComponent,
      EditModerationComponent,
      FinRequestsComponent,
      DriversComponent,
      DriversVerificationComponent,
      DriverVerificationComponent,
      PriviewComponent,
      DriverVerifedComponent,
      DriverVerifyComponent,
      SubscriptionsComponent,
      AddSubscriptionComponent,
      AgentDriverComponent,
      AddAgentDriverComponent,
      AgentDriverDetailComponent,
      AgentListComponent,
      AgentListDriverComponent,
      AgentBalanceComponent,
      AddDriverSubscriptionComponent,
      DriverPaymentListComponent,
      ConnectToAgentComponent,
      AddSubsciptionExitingComponent,
      HistoryTransactionDriverComponent,
      HistoryTransactionDriverAgentComponent,
      StartsWith998Pipe,
      AddServiceComponent,
      ServiceTypesComponent,
      ApplyServiceComponent,
      ApplyServiceHistoryComponent,
      DriverServiceTransactionsComponent
   ],
   imports: [
      CommonModule,
      MatSortModule,
      MatPaginatorModule,
      NgPipesModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatSnackBarModule,
      MatSelectModule,
      NgxMatSelectSearchModule,
      NgxMaskModule.forRoot(),
      OrderModule,
      CommonModule,
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatSelectModule,
      MatRadioModule,
      MatInputModule,
      MatMenuModule,
      MatTableModule,
      MatDialogModule,
      MatSlideToggleModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatIconModule,
      MatCheckboxModule,
      MatRippleModule,
      MatButtonToggleModule,
      MatBadgeModule,
      MatCardModule,
      MatToolbarModule,
      InfiniteScrollModule,
      AngularYandexMapsModule.forRoot(mapConfig),
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot(),
      MatExpansionModule,
      MatTabsModule,
      AgGridModule
   ],

   providers: [
      AuthGuard,
      { provide: MatDialogRef, useValue: {}}, { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
      {
         provide: HTTP_INTERCEPTORS,
         useClass: ApiInterceptor,
         multi: true,
      },
      {
         provide: HTTP_INTERCEPTORS,
         useClass: ErrorInterceptorService,
         multi: true,
      },
      {provide: LocationStrategy, useClass: HashLocationStrategy}
   ],
   bootstrap: [
       AppComponent
   ]
})

export class AppModule { }
