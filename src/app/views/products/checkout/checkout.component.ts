import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryDB } from '../../../shared/fake-db/countries';
import { ProductShopService, CartItem } from '../products-shop.service';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { Location } from '@angular/common';

@Component({
  selector: 'app-products-checkout',
  animations: [egretAnimations],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class ProductCheckoutComponent implements OnInit {
  public cart: CartItem[];
  public checkoutForm: FormGroup;
  public checkoutFormAlt: FormGroup;
  public hasAltAddress: boolean;
  public countries: any[];

  public total: number;
  public subTotal: number;
  public vat: number = 13;
  public shipping: any = 'Free';
  public paymentMethod: string;

  public coupon: string;
  public validCoupon: boolean;
  public couponsList: any;
  public emptyCoupon: boolean = true;
  public applydiscount: number;

  constructor(
    private fb: FormBuilder,
    private shopService: ProductShopService,
    private location: Location
  ) {
    const countryDB = new CountryDB();
    this.countries = countryDB.countries;
  }

  ngOnInit() {
    this.getCart();
    this.buildCheckoutForm();
    this.getCoupons();
  }

  public calculateCost() {
    this.subTotal = 0;
    this.cart.forEach(item => {
      if (this.applydiscount) {
        const discountPrice = item.product.price.sale - (item.product.price.sale * (this.applydiscount / 100));
        this.subTotal += discountPrice * item.data.quantity;
      } else {
        this.subTotal += (item.product.price.sale * item.data.quantity);
      }
    });
    this.total = this.subTotal + (this.subTotal * (15 / 100));
    if (this.shipping !== 'Free') {
      this.total += this.shipping;
    }
  }

  public getCart() {
    this.shopService
      .getCart()
      .subscribe(cart => {
        this.cart = cart;
        this.calculateCost();
      });
  }

  public buildCheckoutForm() {
    this.checkoutForm = this.fb.group({
      country: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: [],
      address1: ['', Validators.required],
      address2: [],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    });

    this.checkoutFormAlt = this.fb.group({
      country: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: [],
      address1: ['', Validators.required],
      address2: [],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  public getCoupons() {
    this.shopService
      .getCoupons()
      .subscribe(coupons => {
        this.couponsList = coupons;
      });
  }

  public applyCoupon(event) {
    event.preventDefault();

    if (!this.coupon) {
      return;
    }

    this.emptyCoupon = false;
    const couponArr = this.couponsList.filter(coupon => {
        return coupon.name === this.coupon.toUpperCase();
    });

    couponArr.length ? this.validCoupon = true : this.validCoupon = false;

    this.applydiscount = couponArr[0].discount;
    this.calculateCost();
  }

  public getBack() {
    this.location.back();
  }

  placeOrder() {
    const billingAddress = this.checkoutForm.value;
    let shippingAddress;

    if (this.hasAltAddress) {
      shippingAddress = this.checkoutFormAlt.value;
    }
  }

}
