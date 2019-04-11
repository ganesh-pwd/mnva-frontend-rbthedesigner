import { Routes } from '@angular/router';
import { MinervaNotificationsComponent } from './minerva-notifications/minerva-notifications.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { MinervaUsersComponent } from './minerva-users/minerva-users.component';
import { MinervaBillingComponent } from './minerva-billing/minerva-billing.component';

export const MinervaAccountAuthRoutes: Routes = [
	{ path: 'minerva-notifications', component: MinervaNotificationsComponent },
	{ path: 'settings', component: AccountSettingsComponent },
	{ path: 'users', component: MinervaUsersComponent },
	{ path: 'billings', component: MinervaBillingComponent }
];
