import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-boto-fixe-bottom',
  templateUrl: './boto-fixe-bottom.component.html',
  styleUrls: ['./boto-fixe-bottom.component.scss']
})
export class BotoFixeBottomComponent implements OnInit {
  @Output() public nouElement = new EventEmitter();

  enviarEvent(): void {
    this.nouElement.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
