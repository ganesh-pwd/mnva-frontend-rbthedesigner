import { Component, OnInit } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { TemplateGalleryService } from '../../../shared/services/template-gallery/template-gallery.service';
import { Subscription } from 'rxjs';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-main-template-gallery',
  animations: [egretAnimations],
  templateUrl: './main-template-gallery.component.html',
  styleUrls: ['./main-template-gallery.component.scss']
})
export class MainTemplateGalleryComponent implements OnInit {
  private getItemSub: Subscription;
  public data: any;
  public searchGallery: string;

  constructor(
    private templateGalleryService: TemplateGalleryService,
    private loader: AppLoaderService
  ) {
    this.getSingleItem();
  }

  ngOnInit() { }

  // Get databox items created by users with parameter id
  getSingleItem() {
    this.loader.open();

    this.getItemSub = this.templateGalleryService.getAllItems().subscribe(data => {
      if (data) {
        this.data = data;
        this.loader.close();
      }
    });
  }
}
