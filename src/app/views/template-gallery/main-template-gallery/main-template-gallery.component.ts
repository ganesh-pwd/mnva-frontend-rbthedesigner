import { Component, OnInit } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';

@Component({
  selector: 'app-main-template-gallery',
  animations: [egretAnimations],
  templateUrl: './main-template-gallery.component.html',
  styleUrls: ['./main-template-gallery.component.scss']
})
export class MainTemplateGalleryComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
