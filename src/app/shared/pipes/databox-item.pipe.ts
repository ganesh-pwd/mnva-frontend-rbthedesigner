import { Pipe, PipeTransform } from '@angular/core';
import { DataboxDataConnectorService } from '../../shared/services/databoxes/databox-item-data-connector.service';
import { DataboxItemMentionService } from '../../shared/services/databoxes/databox-item-mention.service';
import { DataboxAlgorithmsService } from '../../shared/services/databoxes/databox-item-algorithm.service';


@Pipe({ name: 'DataboxIcons' })

export class DataboxPipe implements PipeTransform {
	constructor(private databoxDataConnectorService: DataboxDataConnectorService,
		private databoxItemMentionService: DataboxItemMentionService,
		private databoxAlgorithmsService: DataboxAlgorithmsService){}

    transform(id: any): any {
    	const checkConnector = this.databoxDataConnectorService.getSingleItem(id)
    	const checkMention = this.databoxItemMentionService.getSingleItem(id);
    	const checkAlgorithm = this.databoxAlgorithmsService.getSingleItem(id);

        if(checkConnector)
        	return checkConnector;

        if(checkAlgorithm)
        	return checkAlgorithm;

        if(checkMention)
        	return checkMention;
    }
}