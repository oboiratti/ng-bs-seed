import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() authenticated: boolean
  @Output() toggle = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  doToggle() {
    this.toggle.emit()
  }
}
