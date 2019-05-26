import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatPaginator, MatSort, MatSnackBar, MatSidenav } from '@angular/material';
import { AlgorithmCreditService } from '../../../shared/services/algorithm-credit/algorithm-credit.service';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { ProductShopService, CartItem } from '../products-shop.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/product.model';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-algorithm-credit',
  animations: [egretAnimations],
  templateUrl: './algorithm-credit.component.html',
  styleUrls: ['./algorithm-credit.component.scss'],
  providers: []
})
export class AlgorithmCreditComponent implements OnInit {

  public algorithm_credit: any[];
  public searchInput;
  displayedColumns = ['algorithm', 'price'];

  public currentPage: any;

  @ViewChild(MatSidenav) private sideNav: MatSidenav;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isSideNavOpen: boolean;
  public viewMode: string = 'list-view';

  public algorithms: any;
  public products$: Observable<Product[]>;
  public categories$: Observable<any>;
  public activeCategory: string = 'all';
  public filterForm: FormGroup;
  public cart: CartItem[];
  public cartData: any;
  public selectedCredit;

  constructor(
    private algorithmCreditService: AlgorithmCreditService,
    private shopService: ProductShopService,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,
    private fb: FormBuilder
  ) { this.getAlgorithms(); this.selectedCredit = "250" }

  ngOnInit() {
    this.getCart();
    this.buildFilterForm(this.shopService.initialFilters);

    this.products$ = this.shopService
      .getFilteredProduct(this.filterForm)
      .pipe(
        map(products => {
          return products;

        })
      );

    this.cartData = this.shopService.cartData;
  }

  // search input
  searchAlgorithm(value) {
    this.searchInput = value;
  }

  getAlgorithms() {
    this.loader.open();
    
    this.algorithmCreditService
    .getItems()
    .subscribe(algorithm => {
      this.algorithms = algorithm;
      this.loader.close();
    });
  }

  getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    });
  }

  addToCart(algorithm) {
    const productBuild = {
      name: algorithm.name,
      _id: Date.now().toString(),
      price: {
        sale: algorithm.price.sale
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

  addCreditToCart(){
    const productBuild = {
      name: "Algorithm Credit",
      _id: Date.now().toString(),
      price: {
        sale: this.filterForm.get('algoCredit').value
      },
      category: 'Algorithm Credit',
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
      algoCredit: ["250"],
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
