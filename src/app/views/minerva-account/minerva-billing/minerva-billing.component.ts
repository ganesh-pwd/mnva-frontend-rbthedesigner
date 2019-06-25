import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { MinervaAccountDialogService } from '../../../shared/services/minerva-account/minerva-account-dialog/minerva-account-dialog.service';
import { MinervaBillingDataSource } from './minerva-billing-datasource';
import { MinervaBillingHistoryDataSource } from './minerva-billing-history-datasource';
import { MinervaAccountImageDialogService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-image-dialog.service';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { UserService } from '../../../shared/services/auth/user-services';
import { UserBillingService } from '../../../shared/services/auth/user-billing-info.service';
import { DataboxesService } from '../../../shared/services/databoxes/databox-item-main.services';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Http } from '@angular/http'; 

import { map } from 'rxjs/operators';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-minerva-billing',
  animations: [egretAnimations],
  templateUrl: './minerva-billing.component.html',
  styleUrls: ['./minerva-billing.component.scss']
})
export class MinervaBillingComponent implements OnInit, OnDestroy {
  private getItemSub: Subscription;
  private getReqImage: Subscription;
  private req: Subscription;
  private updateReq: Subscription;

  public billingInfoForm: FormGroup;

  public subscriptionInfoForm: FormGroup;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  @ViewChild('historyPaginator') historyPaginator: MatPaginator;
  @ViewChild(MatSort) public historySort: MatSort;

  @ViewChild('databoxQuotaSort') databoxQuotaSort: MatSort;
  @ViewChild('databoxQuotaPaginator') databoxQuotaPaginator: MatPaginator;

  public userImage: string;
  public dataSource: MinervaBillingDataSource;
  public datasourceDataboxQuota;
  public dataSourceBillingHistory: MinervaBillingHistoryDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['product_type', 'product_name', 'period', 'price'];
  public displayedColumnsBillingHistory = ['payment_date', 'invoice_number', 'product', 'amount', 'download'];
  public displayedColumnsDataboxQuota = ['databox_name', 'status', 'date_created', 'mentions_quota', 'algorithm_quota'];

  public loggedInUser;
  public databoxes;
  public databoxes_sorted;
  public userBillingInfo;
  public userSubscriptionInfo;


  title = 'app';
  restItems: any;
  restItemsUrl = 'https://tugu8uuzu2.execute-api.us-west-2.amazonaws.com/v1/accounts/1';
  
  constructor(
    private router: Router,
    private minervaAccountDialogService: MinervaAccountDialogService,
    private minervaAccountImageDialogService: MinervaAccountImageDialogService,
    private minervaAccountChangeService: MinervaAccountChangeService,
    private userService: UserService,
    private userBillingService: UserBillingService,
    private databoxesService: DataboxesService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private http : HttpClient
  ) {
    this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);
    if ('photoUrl' in sessionStorage) {
      this.userImage = sessionStorage.getItem('photoUrl');
    }
    userService.userData$.subscribe( (user) => this.loggedInUser = user);
    userBillingService.userBillingDetails$.subscribe(  (billingInfo) => {
      this.userBillingInfo = billingInfo;
        this.billingFormGroup();
        if(billingInfo) this.setBillingInfoFormGroup(billingInfo);
    });



     let obs = this.http.get('https://tugu8uuzu2.execute-api.us-west-2.amazonaws.com/v1/accounts/1');
    obs.subscribe( (response) => {
       this.userSubscriptionInfo = response;    
       this.subscriptionFormGroup();
        if(response) this.setSubscriptionInfoFormGroup(response);
    });


  }

  ngOnInit() {

   this.getRestItems();

    this.getDataboxes();
    
    this.dataSourceBillingHistory = new MinervaBillingHistoryDataSource(this.historyPaginator, this.historySort);
    this.dataSource = new MinervaBillingDataSource(this.paginator, this.sort);

   
  }

  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    if (this.req) this.req.unsubscribe();
  }


  // Read all REST Items
  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        }
      )
  }


  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }

  //
  getDataboxes() {
    this.req = this.databoxesService.getItems().subscribe((result) => {
      if (result) {
        this.databoxes = result;

        const product_history = result.map(el => {
          return {
            id: el._id,
            payment_date: new Date(el.date_created),
            invoice_number: el.guid,
            product: `<strong>${el.databox_name}</strong> 
              <br>${el.datasource} | ${el.location}`,
            amount: 40,
            download: 'invoice'
          };
        });

        // Set table dynamically
        this.datasourceDataboxQuota = new MatTableDataSource(<any> result);
        this.dataSource = new MinervaBillingDataSource(this.paginator, this.sort);
        this.dataSourceBillingHistory = new MinervaBillingHistoryDataSource(this.historyPaginator, this.historySort, product_history);

        this.datasourceDataboxQuota.paginator = this.databoxQuotaPaginator;
        this.datasourceDataboxQuota.sort = this.databoxQuotaSort;
      }
    });
  }

  openDialog(title: string) {
    this.minervaAccountDialogService.confirm({
      title: title
    }).subscribe((result) => { });
  }

  changeImageDialog(title: string) {
    this.minervaAccountImageDialogService.confirm({ title: title })
      .subscribe(result => { });
  }

  sortData(sort) {
      const data = this.databoxes.slice();
      if (!sort.active || sort.direction === '') {
        this.databoxes_sorted = data;
        return;
      }

      this.databoxes_sorted = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'name': return compare(a.databox_name, b.databox_name, isAsc);
          default: return 0;
        }
      });
    }

    /* @BILLING INFO FORM CRUD OPERATIONS AND FORM GROUP INITIALIZATION */

        // build billingInfoForm
        billingFormGroup() {
          this.billingInfoForm = this.formBuilder.group({
            'country': [null, Validators.compose([Validators.required])],
            'firstName': [null, Validators.compose([Validators.required])],
            'lastName': [null, Validators.compose([Validators.required])],
            'company': [null, Validators.compose([Validators.required])],
            'address': [null, Validators.compose([Validators.required])],
            'address2': [null],
            'city': [null, Validators.compose([Validators.required])],
            'phone': [null, Validators.compose([Validators.required])],
            'email': [null, Validators.compose([Validators.required])],
            'zip': [null, Validators.compose([Validators.required])],
          });
        }

        // set form value based on databox item details
        setBillingInfoFormGroup(details){
        console.log(details);
          this.billingInfoForm.setValue({
            'country': details.country || '',
            'firstName': details.first_name || '',
            'lastName': details.last_name || '',
            'company': details.company || '',
            'address': details.address || '',
            'address2': details.address_2 || '',
            'city': details.city || '',
            'phone': details.phone || '',
            'email': details.email || '',
            'zip': details.zip || '',
          });
        }

        // save or update billing info details of the selected user
        saveUpdateBillingInfo(){
          const data = {
            'account_id': this.loggedInUser._id,
            'country': this.billingInfoForm.get('country').value,
            'first_name': this.billingInfoForm.get('firstName').value,
            'last_name': this.billingInfoForm.get('lastName').value,
            'company': this.billingInfoForm.get('company').value,
            'address': this.billingInfoForm.get('address').value,
            'address_2':this.billingInfoForm.get('address2').value,
            'city': this.billingInfoForm.get('city').value,
            'phone':this.billingInfoForm.get('phone').value,
            'email':this.billingInfoForm.get('email').value,
            'zip': this.billingInfoForm.get('zip').value,
          }

          this.updateReq = this.userBillingService
          .saveUserBillingInfo(data)
          .subscribe(result => {
            this.snackBar.open('Your billing info details has been updated.', 'close');
            setTimeout(() => this.snackBar.dismiss(), 3000);
          });
        }





        // build subscriptionInfoForm
        subscriptionFormGroup() {
          this.subscriptionInfoForm = this.formBuilder.group({
            'plan_name': [null, Validators.compose([Validators.required])],
            'plan_price': [null, Validators.compose([Validators.required])],
            'plan_created': [null, Validators.compose([Validators.required])],
            'plan_duration_remain': [null, Validators.compose([Validators.required])],
          });
        }

        // set form value based on databox item details
        setSubscriptionInfoFormGroup(details){
        console.log(details);
          this.subscriptionInfoForm.setValue({
            'plan_name': 'fffffff' || '',
            'plan_price': details.plan_price || '',
            'plan_created': details.plan_created || '',
            'plan_duration_remain': details.plan_duration_remain || '',
          });
        }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}