import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databoxes-services';
import { CountryService } from '../../../shared/services/countries/country.service';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { Subscription } from 'rxjs';
import { DatasourceService } from '../../../shared/services/datasource/datasource.service';
import { DataboxMentionsDialogService } from '../../../shared/services/databoxes/dialogs-mentions/dialogs-mentions.services';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-databox-item-settings',
  animations: [egretAnimations],
  templateUrl: './databox-item-settings.component.html',
  styleUrls: ['./databox-item-settings.component.scss']
})
export class DataboxItemSettingsComponent implements OnInit, OnDestroy {
  private getItemSub: Subscription;
  private req: Subscription;

  public data: any;
  public databoxes: any[];
  public databoxItemData: any;
  public checked: boolean = true;
  public countries: any;
  public selectedOption;
  public datasource: any;
  public selectedDatasource: string = 'Facebook';
  public selectedCountry: string = 'Costa Rica';
  public checkIfCreateOrEdit: string;

  public queryForm: FormGroup;
  public changes: boolean;

  public showQuery: string = 'basic';
  public loggedInUser;

  // tslint:disable-next-line:max-line-length
  editorData = `( "Hino" OR Toyota OR Lexus OR Mercedes Benz OR "KIA" OR "Fiat" OR Suzuki OR [Mase(r|rr)ati] OR "BMW" OR hyundai OR mitsubishi ) AND NOT ( contiguo OR conjunto a OR "frente a" OR "norte" OR "oeste" OR "sur" OR metros )`;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private databoxesService: DataboxesService,
    private databoxMentionsDialogService: DataboxMentionsDialogService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
    private datasourceService: DatasourceService,
    private formBuilder: FormBuilder,
    private loader: AppLoaderService
  ) {
    this.loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    
    // check if user is creating databox or editing query
    const urlSegment = this.router.url.split('/')[2];

    if (urlSegment === 'create-databox') this.checkIfCreateOrEdit = 'Create';
    if (urlSegment === 'edit-query') this.checkIfCreateOrEdit = 'Edit';
  }

  ngOnInit() {
    setTimeout(() => this.loader.open(), 50);

    this.getDataboxes();
    this.getSingleItem();
    this.getCountries();
    this.getDatasource();
    this.queryFormGroup();

    this.queryForm.valueChanges.subscribe(result => (this.changes = true));
  }

  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    if (this.req) this.req.unsubscribe();
  }

  // build queryForm
  queryFormGroup() {
    this.queryForm = this.formBuilder.group({
      'datasource': [null, Validators.compose([Validators.required])],
      'country': [null, Validators.compose([Validators.required])],
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
      'country': data.country,
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

    this.getItemSub = this.databoxesService
      .getSingleItem(id)
      .subscribe(data => {
        if (data) {
          this.data = data;
          this.setValueOfForm();
          this.loader.close();
        } else if (this.databoxes) {
          // set databox initial name
          this.databoxItemData =
            (sessionStorage.getItem('databox_edited_name')
            ? sessionStorage.getItem('databox_edited_name')
            : `Databox_${sessionStorage.getItem('databox_name_new')}`)
            || data;

          this.setValueOfForm();
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

  // Get databox items
  getDataboxes() {
    this.getItemSub = this.databoxesService.getItems().subscribe(data => {
      if (data) this.databoxes = data;
    });
  }

  // get list of country
  getCountries() {
    this.getItemSub = this.countryService
      .getCountries()
      .subscribe(country => { this.countries = country; });
  }

  // get all datasource
  getDatasource() {
    this.getItemSub = this.datasourceService
      .getDatasource()
      .subscribe(data => { this.datasource = data; });
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
  openDialogUpdate(title: string, data: string) {
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

  // get query form inputs data for saving
  getQueryFormBody() {
    // initialize inputs
    const body = {
      'datasource': this.queryForm.get('datasource').value,
      'country': this.queryForm.get('country').value,
      'required_keywords': this.queryForm.get('required-keywords').value,
      'optional_keywords': this.queryForm.get('optional-keywords').value,
      'excluded_keywords': this.queryForm.get('excluded-keywords').value,
      'advance_query': this.queryForm.get('advance-query').value
    };

    return body;
  }

  // open databox query dialog
  openMentionsDialog(title: string) {
    this.databoxMentionsDialogService
      .confirm({ title: title, data: this.getQueryFormBody() })
      .subscribe(result => {});
  }

  // open databox query dialog
  openMentionsDialogUpdate(title: string) {
    this.databoxMentionsDialogService
      .confirm({ title: title, data: this.getQueryFormBody(), update: true })
      .subscribe(result => {});
  }
}
