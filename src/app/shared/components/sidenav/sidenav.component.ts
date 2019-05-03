import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {
  @Input('items') public menuItems: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;

  constructor(private router: Router) {}

  // Only for demo purpose
  addMenuItem() {
    this.menuItems.push({
      name: 'ITEM',
      type: 'dropDown',
      tooltip: 'Item',
      icon: 'done',
      state: 'material',
      sub: []
    });
  }


  // navigate to state after clicking sidebar
  navigateToState(state){
    if(sessionStorage.getItem('databox_test_query_bool')){
      sessionStorage.removeItem('databox_test_query_bool');
      sessionStorage.removeItem('databox_test_query');
      this.router.navigate([`/${state}`]);
    } else this.router.navigate([`/${state}`])
  }
}