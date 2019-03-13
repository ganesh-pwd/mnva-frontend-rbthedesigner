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
  public vat: number = 15;
  public shipping: any = 'Free';
  public paymentMethod: string;

  constructor(
    private fb: FormBuilder,
    private shopService: ProductShopService,
    private location: Location
  ) {
    let countryDB = new CountryDB();
    this.countries = countryDB.countries;
  }

  ngOnInit() {
    this.getCart();
    this.buildCheckoutForm();
  }
  calculateCost() {
    this.subTotal = 0;
    this.cart.forEach(item => {
      this.subTotal += (item.product.price.sale * item.data.quantity)
    })
    this.total = this.subTotal + (this.subTotal * (15 / 100));
    if (this.shipping !== 'Free') {
      this.total += this.shipping;
    }
  }
  getCart() {
    this.shopService
      .getCart()
      .subscribe(cart => {
        this.cart = cart;
        this.calculateCost();
      })
  }
  buildCheckoutForm() {
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
