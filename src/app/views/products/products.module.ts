import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductRoutes } from './products.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainProductsComponent } from './main-products/main-products.component';
import { LicensesComponent } from './licenses/licences.component';
import { AdvancedTemplatesComponent } from './advanced-templates/advanced-templates.component';
import { MediaRecordingsComponent } from './media-recordings/media-recordings.component';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTabsModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatListModule,
  MatSidenavModule,
  MatRippleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
 } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StarRatingModule } from 'angular-star-rating';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { ProductShopService } from './products-shop.service';
import { AlgorithmCreditComponent } from './algorithm-credit/algorithm-credit.component';
import { ProductsCartComponent } from './cart/cart.component';
import { ProductCheckoutComponent } from './checkout/checkout.component';
import { MentionsCreditComponent } from './mentions-credit/mentions-credit.component';
import { AdvancedTemplatesLinkComponent } from './advanced-templates-link/advanced-templates-link.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatListModule,
    MatSidenavModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    StarRatingModule,
    NgxPaginationModule,
    NgxDatatableModule,
    RouterModule.forChild(ProductRoutes),
    SharedModule
  ],
  declarations: [
    MainProductsComponent,
    LicensesComponent,
    AdvancedTemplatesComponent,
    MediaRecordingsComponent,
    AlgorithmCreditComponent,
    ProductsCartComponent,
    ProductCheckoutComponent,
    MentionsCreditComponent,
    AdvancedTemplatesLinkComponent,
  ],
  providers: [
    MatDatepickerModule,
    ProductShopService
  ]
})
export class ProductsModule { }
