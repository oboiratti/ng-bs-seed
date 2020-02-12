import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {
  @Input() title: string
  @Input() formGroup: FormGroup
  @Input() saveBtnText: string
  @Output() save = new EventEmitter<any>()
  @Output() closeForm = new EventEmitter<any>()
  @Output() delete = new EventEmitter<any>()

  constructor() {}

  ngOnInit() {}

  doSave() {
    this.save.emit()
  }

  doCloseForm() {
    this.closeForm.emit()
  }

  doDelete(id: any) {
    this.delete.emit(id)
  }
}
