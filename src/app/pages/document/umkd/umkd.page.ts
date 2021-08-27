import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-umkd',
  templateUrl: './umkd.page.html',
  styleUrls: ['./umkd.page.scss'],
})
export class UmkdPage{

  public items: any = [];
  constructor() {
    this.items = [
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false }
    ];
  }
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        // eslint-disable-next-line eqeqeq
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

}
