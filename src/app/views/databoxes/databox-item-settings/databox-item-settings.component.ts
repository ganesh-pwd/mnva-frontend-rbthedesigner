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
  public editorData = `( "Hino" OR Toyota OR Lexus OR Mercedes Benz OR "KIA" OR "Fiat" OR Suzuki OR [Mase(r|rr)ati] OR "BMW" OR hyundai OR mitsubishi ) AND NOT ( contiguo OR conjunto a OR "frente a" OR "norte" OR "oeste" OR "sur" OR metros )`;

  /* @SET CHART DATA */
  // set chart data

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

  /* set line chart option
  * Line Chart Options
  */
  public lineChartData: Array <any> = [{
    data: [1200, 3200, 1600, 5300, 4100, 9800, 7900],
    label: 'Mentions'
  }];
  public lineChartLabels: Array <any> = [`Sat 17`, 'Sun 18', 'Mon 19', 'Tue 20', 'Wed 21', 'Thu 22'];
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

  /* @DATABOX FORM GROUP FUNCTIONS INITIALIZE */

      // build queryForm
      queryFormGroup() {
        this.queryForm = this.formBuilder.group({
          'datasource': [null, Validators.compose([Validators.required])],
          'required-keywords': [null, Validators.compose([Validators.required])],
          'optional-keywords': [null],
          'excluded-keywords': [null],
          'advance-query': [null],
          'include_comments': [false],
          'specify_max_number_result': [false],
          'monitor_only_news_media': [false],
          'monitor_specific_page': [false],
          'facebook_page_id': [null],
          'max_number_result': [null],
        });
      }


      // get query form inputs data for saving
      getQueryFormBody() {
        // get databox historical value
        const historical = document.getElementById('historicals')
        .getElementsByClassName('query-active');

        // set selected multiple countries
        const country = document.getElementById('countries');
        const active_country = country.getElementsByClassName('query-active');
        const countries = [];

        for(let i = 0; i < active_country.length; i++)
          countries.push(active_country[i].textContent)

        // initialize inputs
        const body = {
          'databox_id': this.data ? this.data._id : sessionStorage.getItem('databox_id_new'),
          'databox_name': this.data ? this.data.databox_name : this.databoxItemData,
          'datasource': this.queryForm.get('datasource').value,
          'country': countries,
          'historical': historical[0].textContent.trim(),
          'required-keywords': this.queryForm.get('required-keywords').value,
          'optional-keywords': this.queryForm.get('optional-keywords').value,
          'excluded-keywords': this.queryForm.get('excluded-keywords').value,
          'advance-query': this.queryForm.get('advance-query').value,
          'include_comments': this.queryForm.get('include_comments').value,
          'specify_max_number_result': this.queryForm.get('specify_max_number_result').value,
          'monitor_only_news_media': this.queryForm.get('monitor_only_news_media').value,
          'monitor_specific_page': this.queryForm.get('monitor_specific_page').value,
          'facebook_page_id': this.queryForm.get('facebook_page_id').value,
          'max_number_result': this.queryForm.get('max_number_result').value
        };

        return body;
      }


      // set initial value of query form
      setValueOfForm() {
        const databox_id = this.data ? this.data._id : sessionStorage.getItem('databox_id_new');
        const test_query_exist = sessionStorage.getItem('databox_test_query_bool');
        const test_query_data  = JSON.parse(sessionStorage.getItem('databox_test_query'));
        const check_databox    = this.data && test_query_data && test_query_data.databox_id === databox_id ? true : false;
        
        const data = {
          // basic query: required keywords
          'required-keywords': this.data && !(test_query_data && check_databox) 
            ? this.data['required-keywords'] : test_query_exist 
            && check_databox ? test_query_data['required-keywords'] : '',

          // basic query: optional keywords
          'optional-keywords': this.data  && !(test_query_data && check_databox) 
            ? this.data['optional-keywords'] : test_query_exist 
            && check_databox ? test_query_data['optional-keywords'] : '',

          // basic query: excluded keywords
          'excluded-keywords': this.data  && !(test_query_data && check_databox) 
            ? this.data['excluded-keywords'] : test_query_exist 
            && check_databox ? test_query_data['excluded-keywords'] : '',

          // advance query: full query
          'advance-query': this.data && !(test_query_data && check_databox)  
            ? this.data.query : test_query_exist 
            && check_databox ? test_query_data['advance-query'] : '',

          'datasource': this.data ? this.data.datasource : this.selectedDatasource,
          'country': this.data ? this.data.location : this.selectedCountry,
          'include_comments': this.data ? this.data.include_comments : false,
          'specify_max_number_result': this.data ? this.data.specify_max_number_result : false,
          'monitor_only_news_media': this.data ? this.data.monitor_only_news_media : false,
          'monitor_specific_page': this.data ? this.data.monitor_specific_page : false,
          'facebook_page_id': this.data ? this.data.facebook_page_id : '',
          'max_number_result': this.data ? this.data.max_number_result : 1,
        };

        // set form value based on databox item details
        this.queryForm.setValue({
          'datasource': data.datasource,
          'required-keywords': data['required-keywords'],
          'optional-keywords': data['optional-keywords'],
          'excluded-keywords': data['excluded-keywords'],
          'advance-query': data['advance-query'],
          'include_comments': data.include_comments,
          'specify_max_number_result': data.specify_max_number_result,
          'monitor_only_news_media': data.monitor_only_news_media,
          'monitor_specific_page': data.monitor_specific_page,
          'facebook_page_id': data.facebook_page_id,
          'max_number_result': data.max_number_result
        });

        this.changes = false;
      }

      // databox result
      setResult() {
        const test_query_exist = sessionStorage.getItem('databox_test_query_bool');
        const test_query_data  = JSON.parse(sessionStorage.getItem('databox_test_query'));
        const check_databox    = this.data && test_query_data && test_query_data.databox_id === this.data._id ? true : false;

        return this.data  && !(test_query_data && check_databox) ? 'No results yet, please Create a Query and then click “Test Query” to see results.':
        'Generated Result From Test Query, <br><br>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, debitis vitae! Reprehenderit quis quibusdam earum voluptates voluptate veniam dolores, dignissimos provident eligendi expedita veritatis rem corrupti asperiores sequi velit consequatur. '
      }

      // set datasources
      selectDatasource() { this.datasourceService.setDatasource(this.selectedDatasource); }


      // select country like a checkbox
      selectCountry(id_value){
        const selected = document.getElementById(id_value);

        if(selected.classList.contains('query-active')) selected.classList.remove('query-active');
        else selected.classList.add('query-active');
      }


      // select historical value
      selectHistorical(id_value){
        // set selected historical
        const historicals = document.getElementById('historicals');
        const active_historical = historicals.getElementsByClassName('query-active');

        if (active_historical.length > 0) {
          for (let i = 0; i < active_historical.length; i++) {
            active_historical[i].classList.remove('query-active');
          }
        }

        // select the button as active
        const selected = document.getElementById(id_value);

        if (selected.classList.contains('query-active')) {
          selected.classList.remove('query-active');
        }

        else selected.classList.add('query-active');
      }


      // minimize/maximize accordion
      selectAccordion(accord) {
        switch (true) {
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

      // set mention value
      setMentionValue(mention){
        const checkChanges = sessionStorage.getItem('databox_test_query_bool');

        return this.changes || checkChanges ? mention : 0;
      }

  /* @DATABOX COMPONENT ADVANCE CONDITION */
  
      // check monitor specific page slider
      checkFacebookPageID(){ return this.queryForm.get('monitor_specific_page').value; }

      // check max number of result
      checkMaxNumberResult(){ return this.queryForm.get('specify_max_number_result').value; }

      // show basic query
      showBasicQuery() { this.showQuery = 'basic'; }

      // show advanced query
      showAdvanceQuery() { this.showQuery = 'advance'; }

 
  /* @DATABOX ROUTING FUNCTION */

      // navigate to databox details
      navigateToDatabox(id: string, first: boolean) {
        const route = !first ? `databoxes/${id}` : `databoxes/${id}/initialize`;
        this.router.navigate([route]);
      }


  /* @GET DATABOXES NECESSARY DATA SUCH AS:
    * Databox Single Item
    * Databox Collections for the currently logged in user for Comparison
    * Databox Data Source
    * Databox Country List
    * Databox Historicals
  */

      // Get databox items created by users with parameter id
      getSingleItem() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');

        this.databoxSingleReq = this.databoxesService
          .getSingleItem(id)
          .subscribe(data => {
            if (data) {
              if(data.status === 'Draft') this.router.navigate([`/databoxes/create-databox/${data._id}`]);

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
          .subscribe(historical => this.historicals = historical);
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


      // check if input is invalid
      checkIfInputIsValid(){
        let valid = true;

        if ((!this.queryForm.get('required-keywords').value && this.showQuery === 'basic')) {
          this.snackBar.open("You need to add the required keywords", 'close');
          setTimeout(() => this.snackBar.dismiss(), 3000);
          valid = false;
        }

        if((!this.queryForm.get('advance-query').value && this.showQuery === 'advance')){
          this.snackBar.open("You need to add an advance query", 'close');
          setTimeout(() => this.snackBar.dismiss(), 3000);
          valid = false;
        }

        return valid;
      }

      // open modal for updating the databox
      openDialogTestQuery(title: string, data: string) {
        if (this.checkIfInputIsValid()) {
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
        if (this.checkIfInputIsValid()) {
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
        if (this.checkIfInputIsValid()) {
          this.databoxMentionsDialogService
            .confirm({ title: title, data: this.getQueryFormBody(), mentions: mentions })
            .subscribe(result => {});
        }
      }

      // open databox query dialog
      openMentionsDialogUpdate(title: string, mentions: any = 1200) {
        if (this.checkIfInputIsValid()) {
          this.databoxMentionsDialogService
            .confirm({ title: title, data: this.getQueryFormBody(), update: true, mentions: mentions })
            .subscribe(result => {});
        }
      }

      // check if there's changes with inputs before cancelling
      cancelChanges() {
        if (this.changes || sessionStorage.getItem('databox_test_query_bool')) {
          this.openDialog(
            'Exit without saving changes?',
            'Are you sure you want to cancel all the changes you applied. Please confirm to proceed.',
            false
          );
        } else this.router.navigate(['/databoxes']);

        sessionStorage.removeItem('databox_edited_name');
      }
}
