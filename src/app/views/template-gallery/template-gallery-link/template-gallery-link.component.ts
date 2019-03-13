import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { TemplateGalleryService } from '../../../shared/services/template-gallery/template-gallery.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'template-gallery-link',
  animations: [egretAnimations],
  templateUrl: './template-gallery-link.component.html',
  styleUrls: ['./template-gallery-link.component.scss']
})
export class TemplateGalleryLinkComponent implements OnInit {
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
      private templateGalleryService: TemplateGalleryService) { }

  ngOnInit() {
    this.getSingleItem();
    // watch for route change
    this.req = this.router.events.subscribe((event) => {
      this.getSingleItem();
    });
  }

  // Get databox items created by users with parameter id
  getSingleItem(){
    const template = this.activatedRoute.snapshot.paramMap.get('template');
    this.template = template;

    this.getItemSub = this.templateGalleryService.getItemByLink(template).subscribe(data => {
      if (data) {
        this.data = data;
      }
    });
  }

}
