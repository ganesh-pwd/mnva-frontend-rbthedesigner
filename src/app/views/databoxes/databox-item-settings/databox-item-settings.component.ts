import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databoxes-services';
import { CountryService } from '../../../shared/services/countries/country.service';
import { HistoricalService } from '../../../shared/services/historical/historical.service';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { Subscription } from 'rxjs';
import { DatasourceService } from '../../../shared/services/datasource/datasource.service';
import { DataboxMentionsDialogService } from '../../../shared/services/databoxes/dialogs-mentions/dialogs-mentions.services';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { UserService } from '../../../shared/services/auth/user-services';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-databox-item-settings',
  animations: [egretAnimations],
  templateUrl: './databox-item-settings.component.html',
  styleUrls: ['./databox-item-settings.component.scss']
})
export class DataboxItemSettingsComponent implements OnInit, OnDestroy {
  private databoxSingleReq: Subscription;
  private databoxReq: Subscription;
  private countryReq: Subscription;
  private historicalReq: Subscription;

  public queryForm: FormGroup;
  public data: any;
  public databoxes: any[];
  public databoxItemData: any;
  public checked: boolean = true;
  public countries: any;
  public historicals: any;
  public selectedOption;
  public datasource: any;
  public checkIfCreateOrEdit: string;
  public changes: boolean;
  public selectedDatasource: string = 'Facebook';
  public selectedCountry: string = 'Costa Rica';
  public showQuery: string = 'basic';
  public showQueryAccord: boolean = true;
  public showAdvanceAccord: boolean = true;
  public showConnectAccord: boolean = true;
  public loggedInUser;

  public sharedChartOptions: any = {
    responsive: true,
    legend: {
      display: false,
      position: 'bottom'
    }
  };

  public chartColors: Array <any> = [{
    backgroundColor: '#19b4d7',
    borderColor: '#19b4d7',
    pointBackgroundColor: '#19b4d7',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, {
    backgroundColor: '#fb8a01',
    borderColor: '#fb8a01',
    pointBackgroundColor: '#fb8a01',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }];

  /*
  * Line Chart Options
  */
  public lineChartData: Array <any> = [{
    data: [5, 5, 7, 8, 4, 5, 5],
    label: 'Series A'
  }, {
    data: [5, 4, 4, 3, 6, 2, 5],
    label: 'Series B'
  }];
  public lineChartLabels: Array <any> = ['1', '2', '3', '4', '5', '6', '7'];
  public lineChartOptions: any = Object.assign({
    animation: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        }
      }]
    }
  }, this.sharedChartOptions);
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';

  // tslint:disable-next-line:max-line-length
  editorData = `( "Hino" OR Toyota OR Lexus OR Mercedes Benz OR "KIA" OR "Fiat" OR Suzuki OR [Mase(r|rr)ati] OR "BMW" OR hyundai OR mitsubishi ) AND NOT ( contiguo OR conjunto a OR "frente a" OR "norte" OR "oeste" OR "sur" OR metros )`;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private databoxesService: DataboxesService,
    private databoxMentionsDialogService: DataboxMentionsDialogService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
    private userService: UserService,
    private datasourceService: DatasourceService,
    private historicalService: HistoricalService,
    private formBuilder: FormBuilder,
    private loader: AppLoaderService,
    public snackBar: MatSnackBar
  ) {
    userService.userData$.subscribe((user) => this.loggedInUser = user);
    
    // check if user is creating databox or editing query
    const urlSegment = this.router.url.split('/')[2];

    if (urlSegment === 'create-databox') this.checkIfCreateOrEdit = 'Create';
    if (urlSegment === 'edit-query') this.checkIfCreateOrEdit = 'Edit';
  }

  ngOnInit() {
    setTimeout(() => this.loader.open(), 50);

    this.getCountries();
    this.getHistoricals();
    this.getDataboxes();
    this.getSingleItem();
    this.queryFormGroup();

    this.queryForm.valueChanges.subscribe(result => (this.changes = true));
  }

  ngOnDestroy() {
    if (this.databoxSingleReq) this.databoxSingleReq.unsubscribe();
    if (this.databoxReq) this.databoxReq.unsubscribe();
    if (this.countryReq) this.countryReq.unsubscribe();
    if (this.historicalReq) this.historicalReq.unsubscribe();
  }

  // build queryForm
  queryFormGroup() {
    this.queryForm = this.formBuilder.group({
      'datasource': [null, Validators.compose([Validators.required])],
      'required-keywords': [null, Validators.compose([Validators.required])],
      'optional-keywords': [null],
      'excluded-keywords': [null],
      'advance-query': [null]
    });
  }

  // set initial value of query form
  setValueOfForm() {
    const data = {
      'datasource': this.data ? this.data.datasource : this.selectedDatasource,
      'country': this.data ? this.data.location : this.selectedCountry,
      'required-keywords': this.data
        ? this.data['required-keywords']
        : this.editorData,
      'optional-keywords': this.data
        ? this.data['optional-keywords']
        : this.editorData,
      'excluded-keywords': this.data
        ? this.data['excluded-keywords']
        : this.editorData,
      'advance-query': this.data ? this.data.query : this.editorData
    };

    // set form value based on databox item details
    this.queryForm.setValue({
      'datasource': data.datasource,
      'required-keywords': data['required-keywords'],
      'optional-keywords': data['optional-keywords'],
      'excluded-keywords': data['excluded-keywords'],
      'advance-query': data['advance-query']
    });

    this.changes = false;
  }

  // Get databox items created by users with parameter id
  getSingleItem() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.databoxSingleReq = this.databoxesService
      .getSingleItem(id)
      .subscribe(data => {
        if (data) {
          this.data = data;

          // set value of forms
          this.setValueOfForm();

          // get data source 
          this.getDatasource();

          // select countries
          data.location.forEach(el => this.selectCountry(el));
          
          // select historical value
          this.selectCountry(data.historical);

          this.loader.close();
        } else if (!data) {
          // set databox initial name
          this.databoxItemData =
            (sessionStorage.getItem('databox_edited_name')
              ? sessionStorage.getItem('databox_edited_name')
              : `Databox_${sessionStorage.getItem('databox_name_new')}`)
              || data;

            // set value of forms
            this.setValueOfForm();

            // get data source 
            this.getDatasource();

            // set initial country as Costa Rica
            this.selectCountry('Costa Rica');

            // set historical value
            this.selectHistorical('Full Archive');

            this.loader.close();
        }
      });
  }

  // show basic query
  showBasicQuery() {
    this.showQuery = 'basic';
  }

  // show advanced query
  showAdvanceQuery() {
    this.showQuery = 'advance';
  }

  // minimize/maximize accordion
  selectAccordion(accord){
    switch(true){
      case accord === 'showQuery':
      {
        if(this.showQueryAccord) this.showQueryAccord = false;
        else this.showQueryAccord = true;
        break;
      }

      case accord === 'showAdvance':
      {
        if(this.showAdvanceAccord) this.showAdvanceAccord = false;
        else this.showAdvanceAccord = true;
        break;
      }

      case accord === 'showConnect':
      {
        if(this.showConnectAccord) this.showQueryAccord = false;
        else this.showConnectAccord = true;
        break;
      }
    }
  }


  // Get databox items
  getDataboxes() {
    this.databoxReq = this.databoxesService.getItems()
    .subscribe(data => {
      if (data) this.databoxes = data;
    });
  }

  // get list of country
  getCountries() {
    this.countryReq = this.countryService
      .getCountries()
      .subscribe(country => this.countries = country);
  }

  // get historical list
  getHistoricals(){
    this.historicalReq = this.historicalService
      .getHistorical()
      .subscribe(historical => this.historicals = historical)
  }

  // select country like a checkbox
  selectCountry(id_value){
    let selected = document.getElementById(id_value);
    
    if(selected.classList.contains('query-active')) 
      selected.classList.remove('query-active');

    else selected.classList.add('query-active');
  }


  // select historical value
  selectHistorical(id_value){
    // set selected historical
    let historicals = document.getElementById('historicals');
    let active_historical = historicals.getElementsByClassName('query-active');

    if(active_historical.length > 0)
      for(let i = 0; i < active_historical.length; i++)
        active_historical[i].classList.remove('query-active')
    
    // select the button as active
    let selected = document.getElementById(id_value);
    
    if(selected.classList.contains('query-active')) 
      selected.classList.remove('query-active');

    else selected.classList.add('query-active');
  }


  // get all datasource
  getDatasource() {
    this.databoxSingleReq = this.datasourceService
      .getDatasource()
      .subscribe(data => { 
  
        this.datasource = data
          .filter(el => this.loggedInUser.datasources.indexOf(el.name) < 0)
          .map(el => el.name);
      });
  }

  // set datasources
  selectDatasource() {
    this.datasourceService.setDatasource(this.selectedDatasource);
  }

  // navigate to databox details
  navigateToDatabox(id: string, first: boolean) {
    const route = !first ? `databoxes/${id}` : `databoxes/${id}/initialize`;
    this.router.navigate([route]);
  }

  

  // get query form inputs data for saving
  getQueryFormBody() {
    // get databox historical value
    let historical = document.getElementById('historicals')
    .getElementsByClassName('query-active');

    // set selected multiple countries
    let country = document.getElementById('countries');
    let active_country = country.getElementsByClassName('query-active');
    let countries = [];

    for(let i = 0; i < active_country.length; i++)
      countries.push(active_country[i].textContent)

    // initialize inputs
    const body = {
      'datasource': this.queryForm.get('datasource').value,
      'country': countries,
      'historical': historical[0].textContent.trim(),
      'required_keywords': this.queryForm.get('required-keywords').value,
      'optional_keywords': this.queryForm.get('optional-keywords').value,
      'excluded_keywords': this.queryForm.get('excluded-keywords').value,
      'advance_query': this.queryForm.get('advance-query').value
    };

    return body;
  }

  /* @DATABOXES DIALOG POP UPS */

      // open regular databox dialog modal
      openDialog(title: string, data: string, input: boolean) {
        this.mainDataboxesDialogService
          .confirm({
            title: title,
            data: data,
            input: input,
            update: false,
            details: this.getQueryFormBody()
          })
          .subscribe(result => {
            this.selectedOption = result;
          });
      }

      // check if there's changes with inputs before cancelling
      cancelChanges() {
        if (this.changes) {
          this.openDialog(
            'Exit without saving changes?',
            'Are you sure you want to cancel all the changes you applied. Please confirm to proceed.',
            false
          );
        } else this.router.navigate(['/databoxes']);

        sessionStorage.removeItem('databox_edited_name');
      }

      // open modal for updating the databox
      openDialogTestQuery(title: string, data: string) {
        let valid = true;

        if((!this.queryForm.get('required-keywords').value && this.showQuery === 'basic')){
          this.snackBar.open("You need to add a required keywords", 'close');
          valid = false;
        }

        if((!this.queryForm.get('advance-query').value && this.showQuery === 'advance')){
          this.snackBar.open("You need to add an advance query", 'close');
          valid = false;
        }


        if(valid){
          this.snackBar.dismiss();
          
          this.mainDataboxesDialogService
            .confirm({
              title: title,
              data: data,
              input: false,
              update: true,
              details: this.getQueryFormBody()
            })
            .subscribe(result => {
              this.selectedOption = result;
            });
        }
      }

      // open modal for updating the databox
      openDialogUpdate(title: string, data: string) {
        let valid = true;

        if((!this.queryForm.get('required-keywords').value && this.showQuery === 'basic')){
          this.snackBar.open("You need to add a required keywords", 'close');
          valid = false;
        }

        if((!this.queryForm.get('advance-query').value && this.showQuery === 'advance')){
          this.snackBar.open("You need to add an advance query", 'close');
          valid = false;
        }


        if(valid){
          this.mainDataboxesDialogService
            .confirm({
              title: title,
              data: data,
              input: false,
              update: true,
              details: this.getQueryFormBody()
            })
            .subscribe(result => {
              this.selectedOption = result;
            });
        }
      }

      // open databox query dialog
      openMentionsDialog(title: string, mentions: any = 1200) {
        let valid = true;

        if((!this.queryForm.get('required-keywords').value && this.showQuery === 'basic')){
          this.snackBar.open("You need to add a required keywords", 'close');
          valid = false;
        }

        if((!this.queryForm.get('advance-query').value && this.showQuery === 'advance')){
          this.snackBar.open("You need to add an advance query", 'close');
          valid = false;
        }

        if(valid){
          this.databoxMentionsDialogService
            .confirm({ title: title, data: this.getQueryFormBody(), mentions: mentions })
            .subscribe(result => {});
        }
      }

      // open databox query dialog
      openMentionsDialogUpdate(title: string, mentions: any = 1200) {
        let valid = true;

        if((!this.queryForm.get('required-keywords').value && this.showQuery === 'basic')){
          this.snackBar.open("You need to add a required keywords", 'close');
          valid = false;
        }

        if((!this.queryForm.get('advance-query').value && this.showQuery === 'advance')){
          this.snackBar.open("You need to add an advance query", 'close');
          valid = false;
        }

        if(valid){
          this.databoxMentionsDialogService
            .confirm({ title: title, data: this.getQueryFormBody(), update: true, mentions: mentions })
            .subscribe(result => {});
        }
      }
}
