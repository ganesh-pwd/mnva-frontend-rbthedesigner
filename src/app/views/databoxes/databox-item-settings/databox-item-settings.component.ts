import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databoxes-services';
import { CountryService } from '../../../shared/services/countries/country.service';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { Subscription } from 'rxjs';
import { DatasourceService } from '../../../shared/services/datasource/datasource.service';

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
  public databoxItemData: any;
  public checked: boolean = true;
  public countries: any;
  public selectedOption;
  public datasource: any;
  public selectedDatasource: string = 'Facebook';

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private databoxesService: DataboxesService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
    private datasourceService: DatasourceService
  ) {
    this.databoxesService.apiData$.subscribe(result => this.databoxItemData = result);
  }

  ngOnInit() {
    this.getSingleItem();
    this.getCountries();
    this.getDatasource();
    // watch for route change
    this.req = this.router.events.subscribe((event) => {
      this.getSingleItem();
    });

  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
    if (this.req) {
      this.req.unsubscribe();
    }
  }

  // Get databox items created by users with parameter id
  getSingleItem() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.getItemSub = this.databoxesService.getSingleItem(id).subscribe(data => {
      if (data) {
        this.data = data;
      }
    });
  }

  getCountries() {
    this.getItemSub = this.countryService.getCountries()
      .subscribe(country => {
        this.countries = country;
      });
  }

  getDatasource() {
    this.getItemSub = this.datasourceService.getDatasource()
      .subscribe(data => {
        this.datasource = data;
      });
  }

  selectDatasource() {
    this.datasourceService.setDatasource(this.selectedDatasource);
  }

  // navigate to databox details
  navigateToDatabox(folder: string, id: string, first: boolean) {
    const route = !first ? `databoxes/${folder.replace(/\s/, '-')}/${id}`
      : `databoxes/${folder.replace(/\s/, '-')}/${id}/initialize`;
    this.router.navigate([route]);
  }

  openDialog(title: string, data: string, input: boolean, folder: string) {
    this.mainDataboxesDialogService.confirm({
      title: title,
      data: data,
      input: input,
      folder: folder
    }).subscribe((result) => {
      this.selectedOption = result;
    });
  }
}
