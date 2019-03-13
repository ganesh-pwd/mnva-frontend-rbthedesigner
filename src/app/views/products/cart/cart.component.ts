import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductShopService, CartItem } from '../products-shop.service';
import { egretAnimations } from '../../../shared/animations/egret-animations';

@Component({
  selector: 'app-products-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [egretAnimations]
})
export class ProductsCartComponent implements OnInit {
  public cart: CartItem[];
  public total: number;
  public subTotal: number;
  public vat: number = 15;
  constructor(
    private shopService: ProductShopService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCart();
    this.onQuantityChange();
  }

  public removeProduct(cartItem) {
    this.shopService
    .removeFromCart(cartItem)
    .subscribe(res => {
      this.cart = res;
    });
  }

  public onQuantityChange() {
    this.subTotal = 0;
    this.cart.forEach(item => {
      this.subTotal += (item.product.price.sale * item.data.quantity);
    });
    this.total = this.subTotal + (this.subTotal * (15 / 100));
  }

  public getBack() {
    this.location.back();
  }

  public getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    });
  }

}
