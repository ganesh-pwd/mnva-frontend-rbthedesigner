import { Component, OnInit } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../../shared/models/product.model';
import { CartItem, ProductShopService } from '../products-shop.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TablesService } from '../account-feautures/account-feautures.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-media-recordings',
  animations: [egretAnimations],
  templateUrl: './media-recordings.component.html',
  styleUrls: ['./media-recordings.component.scss']
})
export class MediaRecordingsComponent implements OnInit {
  public total: number = 250;
  public customDatabox: number = 0;
  public products$: Observable<Product[]>;
  public cart: CartItem[];
  public cartData: any;
  public filterForm: FormGroup;

  constructor(
    private shopService: ProductShopService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

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

  getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    });
  }

  addToCart(price) {
    const productBuild = {
      name: 'Media Recordings',
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

  buildFilterForm(filterData: any = {}) {
    this.filterForm = this.fb.group({
      search: [''],
      category: ['all'],
      minPrice: [filterData.minPrice],
      maxPrice: [filterData.maxPrice],
      minRating: [filterData.minRating],
      maxRating: [filterData.maxRating]
    });
  }

}
