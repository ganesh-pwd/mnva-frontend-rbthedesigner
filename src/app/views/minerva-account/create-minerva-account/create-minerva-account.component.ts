import { Component, OnInit } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';

@Component({
	selector: 'app-create-minerva-account',
	animations: [egretAnimations],
	templateUrl: './create-minerva-account.component.html',
	styleUrls: ['./create-minerva-account.component.scss']
})
export class CreateMinervaAccountComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
