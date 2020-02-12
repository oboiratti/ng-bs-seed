import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit {
  pageSizes = [10, 20, 50, 100]
  @Input() size: number
  @Input() info: string
  @Output() sizeChange = new EventEmitter<number>()
  @Output() loadMore = new EventEmitter<any>()

  constructor() {}

  ngOnInit() {}

  doSizeChange() {
    this.sizeChange.emit(this.size)
  }

  doLoadMore() {
    this.loadMore.emit()
  }
}
