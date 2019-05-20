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
  public vat: number = 13;
  public billYearly: boolean = false;
  public annualDiscount: number;
  public annualDiscountText: string;

  constructor(
    private shopService: ProductShopService,
    private location: Location
  ) { 
    if(sessionStorage.getItem('billedAnually')){
      this.billYearly = true;
    }

    if(sessionStorage.getItem('annualPriceText')){
      this.annualDiscountText = sessionStorage.getItem('annualPriceText')
    }
  }

  ngOnInit() {
    this.getCart();
    this.onQuantityChange();
  }


  public removeProduct(cartItem) {
    if(cartItem.product.category == 'Account Type'){
      sessionStorage.removeItem('billedAnually');
      sessionStorage.removeItem('oldAccountPrice');
      sessionStorage.removeItem('annualPriceText');
    }

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
  public onBillMonthlyYearly(event, price, cartItem) {
    

    if (event.checked) {
      this.billYearly = true;
      this.shopService.updatePrice(cartItem, this.billYearly).subscribe(el => el)

      const yearlyBal = parseInt(((price * 12) - (price * 12 * 0.10)).toFixed(0));

      this.annualDiscount = price * 12 * 0.10;
      this.subTotal   = parseInt((this.computePriceNotAccount() + yearlyBal).toFixed(2));
      this.total      = parseInt((this.subTotal + (this.subTotal * (this.vat / 100))).toFixed(2));

      // add billed annually
      sessionStorage.setItem('billedAnually', 'true');
      sessionStorage.setItem('annualPriceText', this.annualDiscount.toFixed(0));
    } else {
      this.billYearly = false;
      this.shopService.updatePrice(cartItem, this.billYearly).subscribe(el => el);

      const yearlyBal = parseInt(sessionStorage.getItem('oldAccountPrice'));
      this.annualDiscount = 0;
      this.subTotal   = parseInt((this.computePriceNotAccount() + yearlyBal).toFixed(2));
      this.total      = parseInt((this.subTotal + (this.subTotal * (this.vat / 100))).toFixed(2));

      // remove billed annually
      sessionStorage.removeItem('billedAnually');
      sessionStorage.removeItem('oldAccountPrice');
      sessionStorage.removeItem('annualPriceText');
      this.annualDiscountText = null;
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
        if(cart.length > 0 && sessionStorage.getItem('billedAnually')){
          let selectedAccountType = cart.filter(el => el.product.category === 'Account Type')[0].product.price.sale;
          this.annualDiscount = parseFloat(((selectedAccountType * 0.10)).toFixed(0));
          console.log(this.annualDiscount)
        } else {
          sessionStorage.removeItem('billedAnually');
          sessionStorage.removeItem('oldAccountPrice');
          sessionStorage.removeItem('annualPriceText');
        }
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
