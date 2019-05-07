import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductShopService, CartItem } from '../products-shop.service';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { map } from 'rxjs/operators';

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
  public vat: number = 13;
  public billYearly: boolean = false;
  public annualDiscount: number;

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
      this.onQuantityChange();
    });
  }

  public onQuantityChange() {
    const subtotal = this.computePriceNotAccount();
    const accountType = this.getAccountTypePrice();

    this.subTotal = parseFloat((subtotal + accountType).toFixed(5));
    this.annualDiscount = 0;
    this.total = parseFloat((this.subTotal + (this.subTotal * (this.vat / 100))).toFixed(5));
  }

  // compute subtotal for item not related to account
  public computePriceNotAccount() {
    let subtotal = 0;

    this.cart.forEach(item => {
      if (item.product.category !== 'Account Type')
        subtotal += (item.product.price.sale * item.data.quantity);
    });

    return subtotal;
  }

  // get pricing of account type
  public getAccountTypePrice() {
    let subtotal = 0;
    if (this.billYearly) {
      this.cart.forEach(item => {
        if (item.product.category === 'Account Type') {
          subtotal += (item.product.price.sale * 12);
        }
      });
    } else {
      this.cart.forEach(item => {
        if (item.product.category === 'Account Type') {
          subtotal += (item.product.price.sale * 1);
        }
      });
    }

    return subtotal;
  }

  // if user select pay yearly or monthly
  public onBillMonthlyYearly(event, price) {
    this.annualDiscount = price * 12 * 0.10;

    if (event.checked) {
      // If pays monthly it should have a 10% discount
      let withAnnualDiscount = 0;
      const yearlyBal = parseFloat((price * 12).toFixed(5));

      this.subTotal = parseFloat((this.computePriceNotAccount() + yearlyBal).toFixed(2));

      withAnnualDiscount = this.subTotal - this.annualDiscount;
      console.log('withAnnualDiscount: ', withAnnualDiscount);
      this.total    = parseFloat(((withAnnualDiscount) + (withAnnualDiscount * (this.vat / 100))).toFixed(2));
      this.billYearly = true;
    } else {
      const yearlyBal = parseFloat((price * 1).toFixed(5));
      this.annualDiscount = 0;
      this.subTotal = parseFloat((this.computePriceNotAccount() + yearlyBal).toFixed(2));
      this.total    = parseFloat((this.subTotal + (this.subTotal * (this.vat / 100))).toFixed(2));
      this.billYearly = false;
    }
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

  // check shopping cart if it contains account type purchase
  public checkIfAccountType() {
    if (this.cart) {
      const account_types = this.cart
      .filter(el => el.product.category === 'Account Type');

      if(account_types.length > 0) return true;
    };
  }

  getItemTotal(price, quantity, type) {
    if (this.billYearly && type === 'Account Type') {
      return parseFloat((price * 12).toFixed(2));
    } else {
      return parseFloat((price * quantity).toFixed(2));
    }
  }
}
