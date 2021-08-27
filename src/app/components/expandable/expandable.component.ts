import { Component, AfterViewInit, Input, ViewChild,  ElementRef, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements AfterViewInit  {
  @ViewChild('expandWrapper', { read: ElementRef }) expandWrapper: ElementRef;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('expanded') expanded = false;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('expandHeight') expandHeight = '150px';

  constructor(public renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.expandWrapper.nativeElement, 'max-height', this.expandHeight);
  }

}

