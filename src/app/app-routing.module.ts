import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';
import { AddCarTypeComponent } from './pages/add-car-type/add-car-type.component';
import { AddCargoTypeComponent } from './pages/add-cargo-type/add-cargo-type.component';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { AddCountryComponent } from './pages/add-country/add-country.component';
import { AddDriverComponent } from './pages/add-driver/add-driver.component';
import { AddPartnerComponent } from './pages/add-partner/add-partner.component';
import { AddPromocodeComponent } from './pages/add-promocode/add-promocode.component';
import { AddRateComponent } from './pages/add-rate/add-rate.component';
import { AddReviewBadgeComponent } from './pages/add-review-badge/add-review-badge.component';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { AddStateComponent } from './pages/add-state/add-state.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { AdminsComponent } from './pages/admins/admins.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CarTypesComponent } from './pages/car-types/car-types.component';
import { CargoTypesComponent } from './pages/cargo-types/cargo-types.component';
import { ChatComponent } from './pages/chat/chat.component';
import { CitysComponent } from './pages/citys/citys.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { DriverComponent } from './pages/driver/driver.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderComponent } from './pages/order/order.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PartnerComponent } from './pages/partner/partner.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PromocodesComponent } from './pages/promocodes/promocodes.component';
import { RatesComponent } from './pages/rates/rates.component';
import { ReviewBadgesComponent } from './pages/review-badges/review-badges.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { RolesComponent } from './pages/roles/roles.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ShippersComponent } from './pages/shippers/shippers.component';
import { StatesComponent } from './pages/states/states.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';
import { ViewphotoComponent } from "./viewphoto/viewphoto.component";
import { ActivityComponent } from "./activity/activity.component";
import { ViewadminComponent } from "./viewadmin/viewadmin.component";
import { CreateorderComponent } from "./pages/createorder/createorder.component";
import { RoutersTruckComponent } from "./routers-truck/routers-truck.component";
import { LoadingComponent } from "./loading/loading.component";
import { ArchiveComponent } from "./pages/archive/archive.component";
import { SecuretransComponent } from "./pages/securetrans/securetrans.component";
import { ExchangerateComponent } from "./exchangerate/exchangerate.component";
import { ModerationComponent } from './pages/moderation/moderation.component';
import { ModerationConfirmComponent } from './pages/moderation-confirm/moderation-confirm.component';
import { EditModerationComponent } from './pages/edit-moderation/edit-moderation.component';
import { FinRequestsComponent } from './pages/fin-requests/fin-requests.component';
import { DriversVerificationComponent } from './pages/drivers-verification/drivers-verification.component';
import { DriverVerifedComponent } from './pages/driver-verifed/driver-verifed.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { AgentDriverComponent } from './pages/agent-driver/agent-driver.component';
import { AgentListComponent } from './pages/agent-list/agent-list.component';
import { AgentListDriverComponent } from './pages/agent-list-driver/agent-list-driver.component';
import { DriverPaymentListComponent } from './pages/driver-payment-list/driver-payment-list.component';
import { AuthGuard } from './guards/auth.guard';
import { ServiceTypesComponent } from './pages/service-types/service-types.component';
import { ApplyServiceHistoryComponent } from './pages/apply-service-history/apply-service-history.component';
import { DriverServiceTransactionsComponent } from './pages/driver-service-transactions/driver-service-transactions.component';

const routes: Routes = [
   {
      path: "",
      pathMatch:'full',
      redirectTo: 'dashboard',
   },
   {
      path: "loading",
      canActivate: [AuthGuard],
      component: LoadingComponent,
      title: "Загрузка"
   },
   {
      path: "dashboard",
      canActivate: [AuthGuard],
      component: HomeComponent,
      title: "Главная"
   },
   {
      path: "users",
      canActivate: [AuthGuard],
      component: UsersComponent,
      title: "Все пользователи"
   },
   {
      path: "agent-list",
      canActivate: [AuthGuard],
      component: AgentListComponent,
      title: "Список агентов"
   },
   {
      path: "agent-list/:id",
      canActivate: [AuthGuard],
      component: AgentListDriverComponent,
      title: "Список агентов"
   },
   {
      path: "user",
      canActivate: [AuthGuard],
      component: UserComponent,
      title: "Подробнее о пользователе"
   },
   {
      path: "add-user",
      canActivate: [AuthGuard],
      component: AddUserComponent,
      title: "Все пользователи / Добавить пользователя"
   },
   {
      path: "partners",
      canActivate: [AuthGuard],
      component: PartnersComponent,
      title: "Партнеры"
   },
   {
      path: "partner/:id",
      canActivate: [AuthGuard],
      component: PartnerComponent,
      title: "Подробнее о Партнере"
   },
   {
      path: "add-partner",
      canActivate: [AuthGuard],
      component: AddPartnerComponent,
      title: "Добавить Партнера"
   },
   {
      path: "shippers",
      canActivate: [AuthGuard],
      component: ShippersComponent,
      title: "Грузоотправители"
   },
   {
      path: "drivers",
      canActivate: [AuthGuard],
      component: DriversComponent,
      title: "Водители"
   },
   {
      path: "drivers-payment-list/:id",
      canActivate: [AuthGuard],
      component: DriverPaymentListComponent,
      title: "Список платежей"
   },
   {
      path: "drivers-service-list/:id",
      canActivate: [AuthGuard],
      component: DriverServiceTransactionsComponent,
      title: "Список платежей"
   },
   {
      path: "agent-drivers",
      canActivate: [AuthGuard],
      component: AgentDriverComponent,
      title: "Водители"
   },
   {
      path: "fin-request",
      canActivate: [AuthGuard],
      component: FinRequestsComponent,
      title: "Запрос на финансирование"
   },
   {
      path: "driver",
      canActivate: [AuthGuard],
      component: DriverComponent,
      title: "Подробнее о водителе"
   },
   {
      path: "add-driver",
      canActivate: [AuthGuard],
      component: AddDriverComponent,
      title: "Водители: Добавление"
   },
   {
      path: "orders/:status",
      canActivate: [AuthGuard],
      component: OrdersComponent,
      title: "Заказы"
   },
   {
      path: "order",
      canActivate: [AuthGuard],
      component: OrderComponent,
      title: "Подробнее о заказах"
   },
   {
      path: "transactions",
      canActivate: [AuthGuard],
      component: TransactionsComponent,
      title: "Транзакции"
   },
   {
      path: "transaction",
      canActivate: [AuthGuard],
      component: TransactionComponent,
      title: "Детали транзакции"
   },
   {
      path: "tracking",
      canActivate: [AuthGuard],
      component: TrackingComponent,
      title: "Трекинг"
   },
   {
      path: "admins",
      canActivate: [AuthGuard],
      component: AdminsComponent,
      title: "Администраторы"
   },
   {
      path: "add-admin",
      canActivate: [AuthGuard],
      component: AddAdminComponent,
      title: "Админы: Добавление"
   },
   {
      path: "roles",
      canActivate: [AuthGuard],
      component: RolesComponent,
      title: "Роли пользователей"
   },
   {
      path: "add-role",
      canActivate: [AuthGuard],
      component: AddRoleComponent,
      title: "Роли пользователей: Добавление"
   },
   {
      path: "rates",
      canActivate: [AuthGuard],
      component: RatesComponent,
      title: "Подписки"
   },
   {
      path: "add-rate",
      canActivate: [AuthGuard],
      component: AddRateComponent,
      title: "Подписки: Добавление"
   },
   {
      path: "promocodes",
      canActivate: [AuthGuard],
      component: PromocodesComponent,
      title: "Промо-коды"
   },
   {
      path: "add-promocode",
      canActivate: [AuthGuard],
      component: AddPromocodeComponent,
      title: "Промо-коды: Добавление"
   },
   {
      path: "car-types",
      canActivate: [AuthGuard],
      component: CarTypesComponent,
      title: "Типы транспорта"
   },
   {
      path: "add-car-type",
      canActivate: [AuthGuard],
      component: AddCarTypeComponent,
      title: "Типы транспорта: Добавление"
   },
   {
      path: "service-types",
      canActivate: [AuthGuard],
      component: ServiceTypesComponent,
      title: "Типы услуг"
   },
   {
      path: "cargo-types",
      canActivate: [AuthGuard],
      component: CargoTypesComponent,
      title: "Типы грузов"
   },
   {
      path: "add-cargo-type",
      canActivate: [AuthGuard],
      component: AddCargoTypeComponent,
      title: "Типы грузов: Добавление"
   },
   {
      path: "review-badges",
      canActivate: [AuthGuard],
      component: ReviewBadgesComponent,
      title: "Критерии отзывов"
   },
   {
      path: "add-review-badge",
      canActivate: [AuthGuard],
      component: AddReviewBadgeComponent,
      title: "Критерии отзывов: Добавление"
   },
   {
      path: "countries",
      canActivate: [AuthGuard],
      component: CountriesComponent,
      title: "Страны"
   },
   {
      path: "add-country",
      canActivate: [AuthGuard],
      component: AddCountryComponent,
      title: "Страны: Добавление"
   },
   {
      path: "states",
      canActivate: [AuthGuard],
      component: StatesComponent,
      title: "Страны: Регионы"
   },
   {
      path: "add-state",
      canActivate: [AuthGuard],
      component: AddStateComponent,
      title: "Страны | Регионы: Добавление"
   },
   {
      path: "citys",
      canActivate: [AuthGuard],
      component: CitysComponent,
      title: "Страны: Города"
   },
   {
      path: "add-city",
      canActivate: [AuthGuard],
      component: AddCityComponent,
      title: "Страны | Города: Добавление"
   },
   {
      path: "reviews",
      canActivate: [AuthGuard],
      component: ReviewsComponent,
      title: "Отзывы"
   },
   {
      path: "chat",
      canActivate: [AuthGuard],
      component: ChatComponent,
      title: "Чат"
   },
   {
      path: "settings",
      canActivate: [AuthGuard],
      component: SettingsComponent,
      title: "Настройки"
   },
   {
      path: "profile",
      canActivate: [AuthGuard],
      component: ProfileComponent,
      title: "Профиль"
   },
   {
      path: "auth",
      canActivate: [AuthGuard],
      component: AuthComponent,
      title: "Регистрация"
   },
   {
      path: "viewphoto",
      canActivate: [AuthGuard],
      component: ViewphotoComponent,
      title: "Просмотр фото"
   },
   {
      path: "activity",
      canActivate: [AuthGuard],
      component: ActivityComponent,
      title: "Активность пользователей"
   },
   {
      path: "viewadmin",
      canActivate: [AuthGuard],
      component: ViewadminComponent,
      title: "Просмотр администратора"
   },
   {
      path: "createorerd",
      canActivate: [AuthGuard],
      component: CreateorderComponent,
      title: "Просмотр администратора"
   },
   {
      path: "routers-truck",
      canActivate: [AuthGuard],
      component: RoutersTruckComponent,
      title: "Маршруты"
   },
   {
      path: "loading",
      canActivate: [AuthGuard],
      component: LoadingComponent,
      title: "Загрузка"
   },
   {
      path: "archive",
      canActivate: [AuthGuard],
      component: ArchiveComponent,
      title: "Архивные водители"
   },
   {
      path: "securetrans",
      canActivate: [AuthGuard],
      component: SecuretransComponent,
      title: "Безопасная сделка"
   },
   {
      path: "exchangerate",
      canActivate: [AuthGuard],
      component: ExchangerateComponent,
      title: "Курс валют"
   },
   {
      path: "moderation",
      canActivate: [AuthGuard],
      component: ModerationComponent,
      title: "Модерация"
   },
   {
      path: "moderation-confirm/:id",
      canActivate: [AuthGuard],
      component: ModerationConfirmComponent,
      title: "Модерация"
   },
   {
      path: "moderation/:id",
      canActivate: [AuthGuard],
      component: EditModerationComponent,
      title: "Модерация"
   },
   {
      path: "drivers-verification",
      canActivate: [AuthGuard],
      component: DriversVerificationComponent,
      title: "Водители проверка"
   },
   {
      path: "drivers-verified",
      canActivate: [AuthGuard],
      component: DriverVerifedComponent,
      title: "Проверенный водитель"
   },
   {
      path: "subcription-types",
      canActivate: [AuthGuard],
      component: SubscriptionsComponent,
      title: "Типы грузов"
   },
   {
      path: "apply-service-history",
      canActivate: [AuthGuard],
      component: ApplyServiceHistoryComponent,
      title: "История оформление услуг"
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
