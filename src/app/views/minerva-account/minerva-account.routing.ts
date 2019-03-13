import { Routes } from '@angular/router';
import { MainMinervaAccountComponent } from './main-minerva-account/main-minerva-account.component'
import { CreateMinervaAccountComponent } from './create-minerva-account/create-minerva-account.component';
import { CreateMinervaEmailComponent } from './create-minerva-email/create-minerva-email.component';
import { ChooseMinervaAccountComponent } from './choose-minerva-account/choose-minerva-account.component';

export const MinervaAccountRoutes: Routes = [
	{ path: '', component: MainMinervaAccountComponent },
	{ path: 'create', component: CreateMinervaAccountComponent },
	{ path: 'select', component: ChooseMinervaAccountComponent },
	{ path: 'email', component: CreateMinervaEmailComponent }
];
