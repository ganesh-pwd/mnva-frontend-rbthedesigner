import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { CartItem, ProductShopService } from '../products-shop.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/product.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main-products',
  animations: [egretAnimations],
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.scss']
})
export class MainProductsComponent implements OnInit {
  public standardDatabox: number = 40;
  public plusDatabox: number = 70;
  public customKeyword: number = 0;
  public customCategory: number = 0;
  public customSubCategory: number = 0;
  public customDay: number = 0;
  public customDatabox: number = 0;
  public products$: Observable<Product[]>;
  public cart: CartItem[];
  public cartData: any;
  public filterForm: FormGroup;

	// 5 keyword - 17.5
  constructor(
    private shopService: ProductShopService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.customDatabox = this.customKeyword + this.customCategory + this.customSubCategory + this.customDay;
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

  getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    });
  }

  addToCart(name, price) {
    const productBuild = {
      name: name,
      _id: Date.now().toString(),
      price: {
        sale: price
      },
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

  buildFilterForm(filterData:any = {}) {
    this.filterForm = this.fb.group({
      search: [''],
      category: ['all'],
      minPrice: [filterData.minPrice],
      maxPrice: [filterData.maxPrice],
      minRating: [filterData.minRating],
      maxRating: [filterData.maxRating]
    });
  }

  computeTotal() {
    this.customDatabox = this.customKeyword + this.customCategory + this.customSubCategory + this.customDay
  }
}
