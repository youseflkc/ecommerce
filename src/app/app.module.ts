import { DialogRef } from './dialog-ref';
import { DIALOG_CONFIG } from './dialog-config';
import { GlobalErrorHandler } from './error-handling/global-error-handler';
import { ErrorHandler } from '@angular/core';
import { ServerErrorInterceptor } from './error-handling/server-error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AnnouncementBarComponent } from './announcement-bar/announcement-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { JoinNowComponent } from './join-now/join-now.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { FooterComponent } from './footer/footer.component';
import { ShopComponent } from './shop/shop.component';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProductComponent,
    NavbarComponent,
    SlideshowComponent,
    CarouselComponent,
    AnnouncementBarComponent,
    FeaturedProductsComponent,
    ProductCardComponent,
    JoinNowComponent,
    TestimonialsComponent,
    FooterComponent,
    ShopComponent,
    DialogMessageComponent,
    LoadingDialogComponent,
    ContactComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MatProgressBarModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    OverlayModule,
    NgbModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    { provide: DIALOG_CONFIG, useValue: DIALOG_CONFIG },
    { provide: DialogRef, useValue: { close: (dialogResult: any) => {} } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
