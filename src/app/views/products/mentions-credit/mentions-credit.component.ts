import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatPaginator, MatSort, MatSnackBar, MatSidenav } from '@angular/material';
import { MentionsCreditService } from '../../../shared/services/mentions-credit/mentions-credit.service';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { ProductShopService, CartItem } from '../products-shop.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/product.model';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-mentions-credit',
  animations: [egretAnimations],
  templateUrl: './mentions-credit.component.html',
  styleUrls: ['./mentions-credit.component.scss'],
  providers: []
})
export class MentionsCreditComponent implements OnInit {

  public mentions_credit: any[];
  public searchInput;
  displayedColumns = ['mentions', 'price'];

  public currentPage: any;

  @ViewChild(MatSidenav) private sideNav: MatSidenav;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isSideNavOpen: boolean;
  public viewMode: string = 'list-view';

  public mentions: any;
  public products$: Observable<Product[]>;
  public categories$: Observable<any>;
  public activeCategory: string = 'all';
  public filterForm: FormGroup;
  public cart: CartItem[];
  public cartData: any;

  constructor(
    private mentionsCreditService: MentionsCreditService,
    private shopService: ProductShopService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loader.open();
    });

    this.buildFilterForm(this.shopService.initialFilters);
    this.getMentions();

    this.products$ = this.shopService
      .getFilteredProduct(this.filterForm)
      .pipe(map(products => products));

    this.getCart();
    this.cartData = this.shopService.cartData;
  }

  // search input
  searchMentions(value) {
    this.searchInput = value
  }

  // get list of mentions products
  getMentions() {
    this.mentionsCreditService
    .getItems()
    .subscribe(mentions => {
      this.loader.close();
      this.mentions = mentions;
    });
  }

  getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    });
  }

  addToCart(mentions) {
    const productBuild = {
      name: mentions.name,
      _id: Date.now().toString(),
      price: {
        sale: mentions.price.sale
      },
      category: 'Credit',
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

  setActiveCategory(category) {
    this.activeCategory = category;
    this.filterForm.controls['category'].setValue(category);
  }

  toggleSideNav() {
    this.sideNav.opened = !this.sideNav.opened;
  }

}
