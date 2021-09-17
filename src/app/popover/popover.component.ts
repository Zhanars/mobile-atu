import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})

export class PopoverComponent implements OnInit {

  constructor() { }
  public language(message: string){
    alert(message);
  }
  ngOnInit() {}

}
