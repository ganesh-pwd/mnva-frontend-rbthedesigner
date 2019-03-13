import { Component, OnInit } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';

@Component({
	selector: 'app-choose-minerva-account',
	animations: [egretAnimations],
	templateUrl: './choose-minerva-account.component.html',
	styleUrls: ['./choose-minerva-account.component.scss']
})
export class ChooseMinervaAccountComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
