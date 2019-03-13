import { Routes } from '@angular/router';
import { MainDataboxesComponent } from './main-databoxes/main-databoxes.component';
import { DataboxItemComponent } from './databox-item/databox-item.component';
import { DataboxFolderComponent } from './databox-folder/databox-folder.component';
import { DataboxItemInitializeComponent } from './databox-item-initialize/databox-item-initialize.component';
import { DataboxItemSettingsComponent } from './databox-item-settings/databox-item-settings.component';
import { DataboxItemAlgorithmComponent } from './databox-item-algorithm/databox-item-algorithm.component';
import { DataboxItemQueryComponent } from './databox-item-query/databox-item-query.component';
import { DataboxItemConnectivityComponent } from './databox-item-connectivity/databox-item-connectivity.component';
import { DataboxItemPagesearchComponent } from './databox-item-pagesearch/databox-item-pagesearch.component';

export const DataboxesRoutes: Routes = [
	{ path: '', component: MainDataboxesComponent },
	{ path: 'settings', 
		children: [
			{ 
				path: ':id', 
				component: DataboxItemSettingsComponent
			},
			{ 
				path: 'query/:id', 
				component: DataboxItemQueryComponent
			},
			{ 
				path: 'algorithm/:id', 
				component: DataboxItemAlgorithmComponent
			},
			{ 
				path: 'connect/:id', 
				component: DataboxItemConnectivityComponent
			},
		]
	},
	{ 
		path: ':folder', 
		component: DataboxFolderComponent
	},
	{ 
		path: ':folder/page-search/:id', 
		component: DataboxItemPagesearchComponent
	},
	{ 
		path: ':folder/:id/initialize', 
		component: DataboxItemInitializeComponent
	},
	{ 
		path: ':folder/:id', 
		component: DataboxItemComponent
	},
	{ 
		path: ':folder/:id/:page', 
		component: DataboxItemComponent
	},
];
