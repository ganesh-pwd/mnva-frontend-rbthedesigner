import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { TemplateGalleryService } from '../../../shared/services/template-gallery/template-gallery.service';
import { CartItem, ProductShopService } from '../products-shop.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advanced-templates-link',
  animations: [egretAnimations],
  templateUrl: './advanced-templates-link.component.html',
  styleUrls: ['./advanced-templates-link.component.scss']
})
export class AdvancedTemplatesLinkComponent implements OnInit {
public versions: any[] = [
    { value: 'tableau', viewValue: 'Tableau' },
    { value: 'twitter-version', viewValue: 'Twitter Version' },
    { value: 'facebook-version', viewValue: 'Facebook Version' },
    { value: 'tv-version', viewValue: 'TV Version' },
    { value: 'power-bi', viewValue: 'Power BI' }
  ];

  private getItemSub: Subscription;
  private req: Subscription;
  public data: any;
  public template: string;

  constructor(private router: Router,
      private activatedRoute: ActivatedRoute,
      private productService: ProductShopService,
      private templateGalleryService: TemplateGalleryService) { }

  ngOnInit() {
    this.getSingleItem();
    // watch for route change
    this.req = this.router.events.subscribe((event) => this.getSingleItem());
  }

  // Get databox items created by users with parameter id
  getSingleItem() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.template = id;

    this.getItemSub = this.productService.getProductDetails(id)
   .subscribe(data => {
   	console.log(data)
     if (data) { this.data = data; }
     // if not found
     else this.router.navigate(['/sessions/404']);
   // if there's error
   }, err => this.router.navigate(['/sessions/404']));
  }


}
