import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { egretAnimations } from '../../shared/animations/egret-animations';

@Component({
	selector: 'app-help',
	animations: [egretAnimations],
	templateUrl: './help.component.html',
	styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
