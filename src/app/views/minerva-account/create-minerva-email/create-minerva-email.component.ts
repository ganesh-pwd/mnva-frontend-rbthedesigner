import { Component } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-minerva-email',
  animations: [egretAnimations],
  templateUrl: './create-minerva-email.component.html',
  styleUrls: ['./create-minerva-email.component.scss']
})
export class CreateMinervaEmailComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor() { }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
