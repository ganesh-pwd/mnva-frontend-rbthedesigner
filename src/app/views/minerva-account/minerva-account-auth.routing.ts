import { Routes } from '@angular/router';
import { MainMinervaAccountComponent } from './main-minerva-account/main-minerva-account.component'
import { MinervaNewsComponent } from './minerva-news/minerva-news.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { MinervaUsersComponent } from './minerva-users/minerva-users.component';
import { MinervaBillingComponent } from './minerva-billing/minerva-billing.component';

export const MinervaAccountAuthRoutes: Routes = [
	{ path: 'minerva-news', component: MinervaNewsComponent },
	{ path: 'settings', component: AccountSettingsComponent },
	{ path: 'users', component: MinervaUsersComponent },
	{ path: 'billings', component: MinervaBillingComponent }
];
