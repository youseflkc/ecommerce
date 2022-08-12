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
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { JoinNowComponent } from './join-now/join-now.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { FooterComponent } from './footer/footer.component';
import { ShopComponent } from './shop/shop.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MatProgressBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
