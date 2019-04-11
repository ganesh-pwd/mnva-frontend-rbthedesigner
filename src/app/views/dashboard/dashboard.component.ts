import { Component, OnInit } from '@angular/core';
import { HotTableRegisterer } from '@handsontable-pro/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataset: any[] = [
    { id: 1, name: 'Ted Right', address: 'Wall Street' },
    { id: 2, name: 'Frank Honest', address: 'Pennsylvania Avenue' },
    { id: 3, name: 'Joan Well', address: 'Broadway' },
    { id: 4, name: 'Gail Polite', address: 'Bourbon Street' },
    { id: 5, name: 'Michael Fair', address: 'Lombard Street' },
    { id: 6, name: 'Mia Fair', address: 'Rodeo Drive' },
    { id: 7, name: 'Cora Fair', address: 'Sunset Boulevard' },
    { id: 8, name: 'Jack Right', address: 'Michigan Avenue' },
  ];

  tableSettings: any;
  hotId: string = 'databoxItemTable';
  constructor(private hotRegisterer: HotTableRegisterer) { }

  ngOnInit() {
    this.createTable()
  }

  createTable() {
    return this.tableSettings = {
      data: this.dataset,
      fillHandle: false,
      rowHeights: 20,
      width: '100%',
      columnSorting: true,
      contextMenu: true,
      filters: true,
      stretchH: 'all',
      dropdownMenu: ['make_read_only', '---------', 'filter_by_condition', 'filter_by_value', '---------', 'filter_action_bar'],
      licenseKey: '0ec2b-f4364-2b674-c443e-0b024',
      columns: [
        { data: 'id', title: 'ID' },
        { data: 'name', title: 'Name' },
        { data: 'address', title: 'Address' },
      ]
    }
  }
}
