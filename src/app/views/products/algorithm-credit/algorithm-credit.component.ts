import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { AlgorithmCreditService } from '../../../shared/services/algorithm-credits/algorithm-credit.service';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataTableDataSource } from './algorithm-credit.datasource';
import { ProductShopService, CartItem } from '../products-shop.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-algorithm-credit',
  animations: [egretAnimations],
  templateUrl: './algorithm-credit.component.html',
  styleUrls: ['./algorithm-credit.component.scss'],
  providers: []
})
export class AlgorithmCreditComponent implements OnInit {

  public algorithm_credits: any[];
  displayedColumns = ['algorithm', 'price'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: DataTableDataSource;
  public customDatabox: number = 0;
  public products$: Observable<Product[]>;
  public cart: CartItem[];
  public cartData: any;
  public filterForm: FormGroup;
  public algorithms: any;

  constructor(
    private algorithmCreditService: AlgorithmCreditService,
    private shopService: ProductShopService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort);

    this.buildFilterForm(this.shopService.initialFilters);

    this.getAlgorithms();

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

  getAlgorithms() {
    this.algorithmCreditService
    .getItems()
    .subscribe(algorithm => {
      this.algorithms = algorithm;
    });
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
      name: 'Algorithm Credit',
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

}
