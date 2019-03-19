import { Routes } from '@angular/router';
import { MainProductsComponent } from './main-products/main-products.component';
import { LicensesComponent } from './licenses/licences.component';
import { AdvancedTemplatesComponent } from './advanced-templates/advanced-templates.component';
import { MediaRecordingsComponent } from './media-recordings/media-recordings.component';
import { AlgorithmCreditComponent } from './algorithm-credit/algorithm-credit.component';
import { AccountFeauturesComponent } from './account-feautures/account-feautures.component';
import { ProductsCartComponent } from './cart/cart.component';
import { ProductCheckoutComponent } from './checkout/checkout.component';

export const ProductRoutes: Routes = [
  {
    path: '', component: MainProductsComponent,
      data: {
        title: 'Products', breadcrumb: 'Products'
      }
  },

  {
    path: 'account-type',
    component: MainProductsComponent,
    data: {
      title: 'Account Type', breadcrumb: 'Account Type'
    }
  },
  {
    path: 'cart',
    component: ProductsCartComponent,
    data: {
      title: 'Cart', breadcrumb: 'cart'
    }
  },
  {
    path: 'checkout',
    component: ProductCheckoutComponent,
    data: {
      title: 'Checkout', breadcrumb: 'Checkout'
    }
  },
  {
    path: 'algorithm-credit',
    component: AlgorithmCreditComponent,
    data: {
      title: 'Algorithm Credit', breadcrumb: 'Algorithm Credit'
    }
  },
  {
    path: 'account-feautures',
    component: AccountFeauturesComponent,
    data: {
      title: 'Account Feautures', breadcrumb: 'Account Feautures'
    }
  },
  {
    path: 'licenses',
    children: [
      {
        path: '', component: LicensesComponent,
          data: {
            title: 'License', breadcrumb: 'License'
          }
      }
    ]
  },
  {
    path: 'advanced-templates',
    children: [
      {
        path: '', component: AdvancedTemplatesComponent,
          data: {
            title: 'Advanced Templates', breadcrumb: 'Advanced Templates'
          }
      }
    ]
  },
  {
    path: 'media-recordings',
    component: MediaRecordingsComponent,
    data: {
      title: 'Media Recordings', breadcrumb: 'Media Recordings'
    }
  }
];
