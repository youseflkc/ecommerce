import { LoggedOutComponent } from './logged-out/logged-out.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { OrderComponent } from './order/order.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop/product/:id', component: ProductComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login/forgot-password', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoggedOutComponent },
  {
    path: 'checkout/order-success',
    component: OrderSuccessComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'checkout',
    component: OrderComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'my-orders/:id',
    component: ViewOrderComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGaurdService],
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
