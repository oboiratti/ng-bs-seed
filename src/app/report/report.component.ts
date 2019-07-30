import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';
import { ReportService } from './report.service';
import { takeUntil, finalize } from 'rxjs/operators';

interface ReportConfig {
  title: string
  query: string
  columns: any
  data: any
  filters?: any
  downloadWordUrl?: string
  downloadExcelUrl?: string
  downloadPdfUrl?: string
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  reports: ReportConfig[]
  selectedReport: ReportConfig
  @BlockUI() blockUi: NgBlockUI
  unsubscribe$ = new Subject<void>()
  params: any

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reports = [
      {
        title: 'Subscriber List',
        query: 'reports/subscriberslist/list',
        columns: ['code', 'name', 'phoneNumber', 'gender', 'subscriberType', 'region', 'district', 'location', 'primaryCommodity'],
        data: [],
        filters: [
          { label: 'Region', type: 'select', model: 'regionId', lookupUrl: 'region/selectget', lookupStore: 'regions' },
          { label: 'District', type: 'select', model: 'districtId', lookupUrl: 'district/selectget', lookupStore: 'districts' },
          { label: 'Location', type: 'text', model: 'location' },
          { label: 'Commodity', type: 'select', model: 'commodityId', lookupUrl: 'commodity/selectget', lookupStore: 'commodities' },
          { label: 'Program', type: 'select', model: 'programId', lookupUrl: 'program/selectget', lookupStore: 'programs' },
          { label: 'Type', type: 'select', model: 'typeId', lookupUrl: 'subscribertype/selectget', lookupStore: 'subscriberTypes' }
        ],
        downloadWordUrl: 'reports/subscriberslist/word',
        downloadExcelUrl: 'reports/subscriberslist/excel',
        downloadPdfUrl: 'reports/subscriberslist/pdf'
      }
    ]
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  getReportData(params: any) {
    this.blockUi.start('Loading...')
    this.params = params
    this.reportService.getReport(this.selectedReport.query, params)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => this.blockUi.stop())
      )
      .subscribe(res => {
        if (res.success) {
          this.selectedReport.data = res.data
        }
      })
  }
}
