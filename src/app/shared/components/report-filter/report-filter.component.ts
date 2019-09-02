import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReportFilterService } from './report-filter.service';

@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss']
})
export class ReportFilterComponent implements OnInit, OnChanges {

  model = { size: 50 }
  @Input() filters: any = []
  @Output() generate = new EventEmitter<any>()
  lookups: any = {}

  constructor(private reportFilterService: ReportFilterService) { }

  ngOnInit() { }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.filters) {
      const diff = this.filters.filter(
        (item: any) =>
          item.label !==
          (this.lookups[item.lookupStore] &&
            this.lookups[item.lookupStore].label)
      )
      console.log(this.filters, diff, this.lookups)
      this.loadLookups(diff)
    }
  }

  generateReport() {
    this.generate.emit(this.model)
  }

  private loadLookups(filters: []) {
    filters
      .filter((item: any) => item.type === 'select')
      .map((item: any) => {
        this.reportFilterService.fetch(item.lookupUrl).subscribe(res => {
          if (res.success) {
            this.lookups[item.lookupStore] = {
              label: item.label,
              data: res.data
            }
          }
        })
      })
  }
}
