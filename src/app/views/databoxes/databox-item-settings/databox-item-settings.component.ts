import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar, MatChipInputEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { UserService } from '../../../shared/services/auth/user-services';
import { UserPlanDetailsService } from '../../../shared/services/auth/user-plan-details.service';

import { DataboxesService } from '../../../shared/services/databoxes/databox-item-main.services';
import { DataboxesQueryService } from '../../../shared/services/databoxes/databox-item-query.service';
import { DataboxItemMentionService } from '../../../shared/services/databoxes/databox-item-mention.service';
import { DataboxMentionsDialogService } from '../../../shared/services/databoxes/dialogs-mentions/dialogs-mentions.services';

import { CountryService } from '../../../shared/services/countries/country.service';
import { HistoricalService } from '../../../shared/services/historical/historical.service';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { DatasourceService } from '../../../shared/services/datasource/datasource.service';

@Component({
  selector: 'app-databox-item-settings',
  animations: [egretAnimations],
  templateUrl: './databox-item-settings.component.html',
  styleUrls: ['./databox-item-settings.component.scss']
})
export class DataboxItemSettingsComponent implements OnInit, OnDestroy {
  private databoxSingleReq: Subscription;
  private databoxQueryReq: Subscription;
  private databoxReq: Subscription;
  private countryReq: Subscription;
  private historicalReq: Subscription;

  public queryForm: FormGroup;
  public data: any;
  public dataQuery: any;
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
  public showHistoricalAccord: boolean = true;
  public showCountryAccord: boolean = true;
  public showConnectAccord: boolean = true;
  public showSimpleExample: boolean = true;
  public showAdvancedExample: boolean = true;
  public loggedInUser;
  public userPlanDetails;
  public userPlanDatasource;
  public editorData = `Type your desired keywords`;
  public editorDataAdv = `Please type your query`;

  /** Results table */
  public resultsTableColumns: string[] = ['date', 'content', 'author'];

  /* @SET CHART DATA */
    // set chart data
    public sharedChartOptions: any = {
      responsive: true,
      legend: {
        display: true,
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
      data: [30, 95, 180, 720, 1290, 3600, 5000],
      label: 'Mentions'
    }];
    public lineChartLabels: Array <string> = ['Sat 17', 'Sun 18', 'Mon 19', 'Tue 20', 'Wed 21', 'Thu 22'];
    public lineChartOptions: any = Object.assign({
      animation: false,
      scaledisplay: false,
      responsive: true,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    }, this.sharedChartOptions);
    public lineChartLegend: boolean = false;
    public lineChartType: string = 'line';

  public visible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public requiredKeywords: string[] = [];
  public optionalKeywords: string[] = [];
  public excludeKeywords: string[] = [];
  public chipInputPlaceholder: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private databoxesService: DataboxesService,
    private databoxQueryService: DataboxesQueryService,
    private databoxItemMentionService: DataboxItemMentionService,
    private databoxMentionsDialogService: DataboxMentionsDialogService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
    private userService: UserService,
    private userPlanDetailsService: UserPlanDetailsService,
    private datasourceService: DatasourceService,
    private historicalService: HistoricalService,
    private formBuilder: FormBuilder,
    private loader: AppLoaderService,
    public snackBar: MatSnackBar
  ) {
    // get user data
    userService.userData$
    .subscribe((user) => 
      this.loggedInUser = user);

    // get user plan details
    userPlanDetailsService.userPlanData$
    .subscribe((user) => 
      this.userPlanDetails = user);

    // get user datasource
    userService.planDatasourceData$
    .subscribe((user) => 
      this.userPlanDatasource = user);

    // check if user is creating databox or editing query
    const urlSegment = this.router.url.split('/')[2];
    if (urlSegment === 'create-databox') this.checkIfCreateOrEdit = 'Create';
    if (urlSegment === 'edit-databox') this.checkIfCreateOrEdit = 'Edit';
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
    if (this.databoxQueryReq) this.databoxQueryReq.unsubscribe();
    if (this.databoxReq) this.databoxReq.unsubscribe();
    if (this.countryReq) this.countryReq.unsubscribe();
    if (this.historicalReq) this.historicalReq.unsubscribe();
  }

  
  /* @DATABOX FORM GROUP FUNCTIONS INITIALIZE */

      // build queryForm
      queryFormGroup() {
        this.queryForm = this.formBuilder.group({
          'datasource': [null, Validators.compose([Validators.required])],
          'advance_query': [null],
          'include_comments': [false],
          'specify_max_number_result': [false],
          'monitor_only_news_media': [false],
          'monitor_specific_page': [false],
          'exclude_specific_pages': [false],
          'excluded_pages': [null],
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
          countries.push(active_country[i].textContent);

        // initialize inputs
        const body = {
          'databox_id': this.data ? this.data._id : sessionStorage.getItem('databox_id_new'),
          'databox_name': this.data ? this.data.databox_name : this.databoxItemData,
          'datasource': this.queryForm.get('datasource').value,
          'country': countries,
          'historical': historical[0].textContent.trim(),
          'query_type': this.showQuery,
          'required_keywords': this.requiredKeywords,
          'optional_keywords': this.optionalKeywords,
          'excluded_keywords': this.excludeKeywords,
          'advance_query': this.queryForm.get('advance_query').value,
          'include_comments': this.queryForm.get('include_comments').value,
          'specify_max_number_result': this.queryForm.get('specify_max_number_result').value,
          'monitor_only_news_media': this.queryForm.get('monitor_only_news_media').value,
          'monitor_specific_page': this.queryForm.get('monitor_specific_page').value,
          'facebook_page_id': this.queryForm.get('facebook_page_id').value,
          'max_number_result': this.queryForm.get('max_number_result').value,
          'exclude_specific_pages': this.queryForm.get('exclude_specific_pages').value,
          'excluded_pages': this.queryForm.get('excluded_pages').value,
          'mentions': 1200,
          'mentions_per_day': 7.5
        };

        return body;
      }


      // set initial value of query form
      setValueOfForm() {
        // set form value based on databox item details
        this.queryForm.setValue({
          'datasource': this.data ? this.data.datasource : this.selectedDatasource,
          'advance_query': '',
          'include_comments': this.data ? this.data.include_comments : false,
          'specify_max_number_result': this.data ? this.data.specify_max_number_result : false,
          'monitor_only_news_media': this.data ? this.data.monitor_only_news_media : false,
          'monitor_specific_page': this.data ? this.data.monitor_specific_page : false,
          'exclude_specific_pages': this.data ? this.data.exclude_specific_pages : false,
          'facebook_page_id': this.data ? this.data.facebook_page_id : '',
          'max_number_result': this.data ? this.data.max_number_result : 1,
          'excluded_pages': this.data ? this.data.excluded_pages : ''
        });

        this.changes = false;
      }

      // set databox query inputs
      setQueryInputs(){
        const databox_id = this.dataQuery ? this.dataQuery.databox_id : sessionStorage.getItem('databox_id_new');
        const test_query_exist = sessionStorage.getItem('databox_test_query_bool');
        const test_query_data  = JSON.parse(sessionStorage.getItem('databox_test_query'));
        const check_test_query_create = !!test_query_data ? test_query_data.databox_id === databox_id ? true : false : false;

        // from fake db
        if(!check_test_query_create && this.dataQuery){
          this.queryForm.controls['advance_query'].setValue(this.dataQuery['query'] || this.dataQuery['expression']);
          this.requiredKeywords = [...this.dataQuery['required_keywords']];
          this.optionalKeywords = [...this.dataQuery['optional_keywords']];
          this.excludeKeywords  = [...this.dataQuery['excluded_keywords']];

          this.showQuery = this.dataQuery['query_type'];
        }

        // from test query temporary session storage
        if(check_test_query_create){
          this.queryForm.controls['advance_query'].setValue(test_query_data['query'] || test_query_data['expression']);
          this.requiredKeywords = [...test_query_data['required_keywords']];
          this.optionalKeywords = [...test_query_data['optional_keywords']];
          this.excludeKeywords  = [...test_query_data['excluded_keywords']];

          this.showQuery = test_query_data['query_type'];
        }
      }

      // databox result
      setResult() {
        const databox_id = this.data ? this.data._id : sessionStorage.getItem('databox_id_new');
        const test_query_exist = sessionStorage.getItem('databox_test_query_bool');
        const test_query_data  = JSON.parse(sessionStorage.getItem('databox_test_query'));
        const check_databox    = !!test_query_data ? test_query_data.databox_id === databox_id ? true : false : false;
       
        return check_databox;
      }

      // set datasources
      selectDatasource() { this.datasourceService.setDatasource(this.selectedDatasource); }


      // select country like a checkbox
      selectCountry(id_value) {
        const selected = document.getElementById(id_value);

        if(selected.classList.contains('query-active')) selected.classList.remove('query-active');
          else selected.classList.add('query-active');
      }


      // select historical value
      selectHistorical(id_value){
        // set selected historical
        const historicals = document.getElementById('historicals');
        const active_historical = historicals.getElementsByClassName('query-active');

        // set historical loops
        if (active_historical.length > 0) 
          for (let i = 0; i < active_historical.length; i++) 
            active_historical[i].classList.remove('query-active');
          
        
        // select the button as active
        const selected = document.getElementById(id_value);

        // vanilla js for making button act like a checkbox or radio
        if (selected.classList.contains('query-active')) 
          selected.classList.remove('query-active');
        
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

          case accord === 'showHistorical':
          {
            if(this.showHistoricalAccord) this.showHistoricalAccord = false;
              else this.showHistoricalAccord = true;
            break;
          }

          case accord === 'showCountry':
          {
            if(this.showCountryAccord) this.showCountryAccord = false;
              else this.showCountryAccord = true;
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
      setMentionValue(mention) {
        const checkChanges = sessionStorage.getItem('databox_test_query_bool');

        return this.changes || checkChanges ? mention : 0;
      }

  /* @DATABOX MAT CHIP FUNCTIONS */

      // Will add new mat-chip item
      add(event: MatChipInputEvent, keywordType: string): void {
        const input = event.input;
        const value = event.value;

        // Add keywords
        if ((value || '').trim()) {
          // for required keywords
          if (keywordType === 'required') 
            this.requiredKeywords.push(value.trim());
          
          // for optional keywords
          else if (keywordType === 'optional') 
            this.optionalKeywords.push(value.trim());

          // for excluded keywords
          else if (keywordType === 'exclude') 
            this.excludeKeywords.push(value.trim());
           
          // set changes to true
          this.changes = true;
        }

        // Reset the input value
        if (input) input.value = '';
      }


      // Will remove mat chip item
      remove(keyword: any): void {
        const indexRequired = this.requiredKeywords.indexOf(keyword);
        const indexOptional = this.optionalKeywords.indexOf(keyword);
        const indexExclude  = this.excludeKeywords.indexOf(keyword);

        // for required keywords
        if (indexRequired >= 0) 
          this.requiredKeywords.splice(indexRequired, 1);
        
        // for optional keywords
        else if (indexOptional >= 0) 
          this.optionalKeywords.splice(indexOptional, 1);

        // for excluded keywords
        else if (indexExclude >= 0) 
          this.excludeKeywords.splice(indexExclude, 1);

        // set changes to true
        this.changes = true;

      }
    

  /* @DATABOX COMPONENT ADVANCE CONDITION */

      // check monitor specific page slider
      checkFacebookPageID() { return this.queryForm.get('monitor_specific_page').value; }

      // check exclude specific page slider
      checkExcludedPage() { return this.queryForm.get('exclude_specific_pages').value; }

      // check max number of result
      checkMaxNumberResult() { return this.queryForm.get('specify_max_number_result').value; }

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

              this.data = data;

              // if databox istatus is draft
              if(data.status === 'Draft') 
                this.router.navigate([`/databoxes/create-databox/${data._id}`]);

              // set value of forms
              this.setValueOfForm();

              // get data source 
              this.getDatasource();

              // get databox query
              this.getDataboxQuery(data._id);

              // select countries
              data.location.forEach(el => this.selectCountry(el));
              
              // select historical value
              this.selectCountry(data.historical);

              // for test query
              this.setResult();

              this.loader.close();
            } 

            else if (!data) {
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

                // get databox query
                this.setQueryInputs();

                // set initial country as Costa Rica
                this.selectCountry('Costa Rica');

                // set historical value
                this.selectHistorical('Full Archive');

                // for test query
                this.setResult();

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

      // get currently selected databox query
      getDataboxQuery(id){
        this.databoxQueryReq = this.databoxQueryService
        .getSingleItem(id)
        .subscribe(result => {
          if(result){
             this.dataQuery = result;

             // set query inputs
             this.setQueryInputs();
          }
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
            console.log(data, this.userPlanDatasource)

            this.datasource = data
              .filter(el => this.userPlanDatasource.datasources.indexOf(el.name) < 0)
              .map(el => el.name);

              console.log(this.datasource)
          });
      }

      // get databox mention
      getDataboxMention(id){
        return this.databoxItemMentionService.getSingleItem(id);
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
          .subscribe(result => this.selectedOption = result);
      }


      // check if input is invalid
      checkIfInputIsValid(){
        let valid = true;

        // set selected multiple countries
        const country = document.getElementById('countries');
        const active_country = country.getElementsByClassName('query-active');
        const countries = [];

        for(let i = 0; i < active_country.length; i++)
          countries.push(active_country[i].textContent);

        if (countries.length <= 0) {
          this.snackBar.open("You need to add atleast one Country", 'close');
          setTimeout(() => this.snackBar.dismiss(), 3000);
          valid = false;
        }

        if ((this.requiredKeywords.length === 0 && this.showQuery === 'basic')) {
          this.snackBar.open("You need to add the required keywords", 'close');
          setTimeout(() => this.snackBar.dismiss(), 3000);
          valid = false;
        }

        if((!this.queryForm.get('advance_query').value && this.showQuery === 'advance') 
          || this.showQuery === 'advance' &&  countries.length <= 0){
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
            .subscribe(result => this.selectedOption = result);
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
            .subscribe(result => this.selectedOption = result);
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
        } 

        // if you are trying to edit a databox
        else if(this.checkIfCreateOrEdit === 'Edit')
          this.router.navigate([`databoxes/${this.data._id}`]);

        // if you are trying to create a databox
        else if(this.checkIfCreateOrEdit === 'Create')
          this.router.navigate([`databoxes`]);

        sessionStorage.removeItem('databox_edited_name');
      }
}
