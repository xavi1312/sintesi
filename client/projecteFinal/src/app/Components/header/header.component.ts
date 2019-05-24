import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() nouElement = new EventEmitter();
  @Input('titol') titol: String;

  constructor() { }

  ngOnInit() {
  }

  enviarEvent() {
    this.nouElement.emit();
  }

}
