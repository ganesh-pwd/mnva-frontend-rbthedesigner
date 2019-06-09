import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { CartItem, ProductShopService } from '../products-shop.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/product.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../shared/services/auth/user-services';
import { UserPlanDetailsService } from '../../../shared/services/auth/user-plan-details.service';

@Component({
  selector: 'app-main-products',
  animations: [egretAnimations],
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.scss']
})
export class MainProductsComponent implements OnInit {
  public standardAccount: number = 40;
  public plusAccount: number = 70;
  public enterpriseAccount: number = 100;
  public products$: Observable<Product[]>;
  public cart: CartItem[];
  public cartData: any;
  public filterForm: FormGroup;
  public loggedInUser;
  public userPlanDetails;
  public billedAnnually = false;
  // 5 keyword - 17.5

  constructor(
    private shopService: ProductShopService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private userPlanDetailsService: UserPlanDetailsService,
    private fb: FormBuilder,
  ) { 
    // get user data
    userService.userData$
    .subscribe((user) => 
      this.loggedInUser = user); 

    // get user plan details
    userPlanDetailsService.userPlanData$
    .subscribe((user) => 
      this.userPlanDetails = user);
  }

  ngOnInit() {
    this.buildFilterForm(this.shopService.initialFilters);

    this.products$ = this.shopService
      .getFilteredProduct(this.filterForm)
      .pipe(
        map(products => {
          return products;
        })
      );
    this.getCart();
    this.cartData = this.shopService.cartData;
  }

  private getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    });
  }

  public clickSlideToggle(event) {
    if (event.checked) {
      this.standardAccount = parseFloat((this.standardAccount - this.standardAccount * 0.10).toFixed(2));
      this.plusAccount = parseFloat((this.plusAccount - this.plusAccount * 0.10).toFixed(2));
      this.enterpriseAccount = parseFloat((this.enterpriseAccount - this.enterpriseAccount * 0.10).toFixed(2));
      sessionStorage.setItem('billedAnually', 'true');
      this.billedAnnually = true;
    } else {
      this.standardAccount = 40;
      this.plusAccount = 70;
      this.enterpriseAccount = 100;
      sessionStorage.removeItem('billedAnually');
      this.billedAnnually = false;
    }
  }

  public addToCartAccountType(name, price) {
    console.log(price)
    const productBuild = {
      name: name,
      _id: Date.now().toString(),
      price: {
        sale: price
      },
      category: 'Account Type',
      photo: 'https://via.placeholder.com/140x140'
    };
    const cartItem: CartItem = {
      product: productBuild,
      data: {
        quantity: 1
      }
    };

    if(this.billedAnnually){
      sessionStorage.setItem('annualPriceText', ((price/0.9) * 12 * 0.10).toFixed(0));
      sessionStorage.setItem('oldAccountPrice', `${price/0.9}`);
    }

    // check if item is already added to cart
    const filter = this.cart.filter(el => {
      return el.product.name === name || el.product.category === 'Account Type';
    });

    if (filter.length > 0) {
      alert('You already added an Account Type Purchase to shopping cart');
    } else {
      this.shopService
      .addToCart(cartItem)
      .subscribe(cart => {
        this.cart = cart;
        this.snackBar.open('Product added to cart', 'OK', { duration: 4000 });
      });
    }
  }

  public addCreditToCart() {
    let value = JSON.parse(this.filterForm.get('consulting').value);
    let label = this.filterForm.get('consulting');

    const productBuild = {
      name: `Consulting Credit: ${value.name}`,
      _id: Date.now().toString(),
      price: {
        sale: value.price
      },
      category: 'Consulting Credit',
      photo: 'https://via.placeholder.com/140x140'
    };
    const cartItem: CartItem = {
      product: productBuild,
      data: {
        quantity: 1
      }
    };

    this.shopService
      .addToCart(cartItem)
      .subscribe(cart => {
        this.cart = cart;
        this.snackBar.open('Product added to cart', 'OK', { duration: 4000 });
      });
  }

  private buildFilterForm(filterData: any = {}) {
    this.filterForm = this.fb.group({
      search: [''],
      category: ['all'],
      consulting: [''],
      minPrice: [filterData.minPrice],
      maxPrice: [filterData.maxPrice],
      minRating: [filterData.minRating],
      maxRating: [filterData.maxRating]
    });
  }

}
