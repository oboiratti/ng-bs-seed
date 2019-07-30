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
        title: 'Call Logs',
        query: 'reports/calllogs/list',
        columns: ['code', 'name', 'phoneNumber', 'gender', 'subscriberType', 'region', 'district', 'location', 'primaryCommodity'],
        data: [],
        filters: [
          { label: 'Area', type: 'select', model: 'areaId', lookupUrl: 'area/selectget', lookupStore: 'areas' },
          { label: 'Topic', type: 'select', model: 'topicId', lookupUrl: 'topic/selectget', lookupStore: 'topics' },
          { label: 'Pillar', type: 'select', model: 'pillarId', lookupUrl: 'pillar/selectget', lookupStore: 'pillars' },
          { label: 'Region', type: 'select', model: 'regionId', lookupUrl: 'region/selectget', lookupStore: 'regions' },
          { label: 'District', type: 'select', model: 'districtId', lookupUrl: 'district/selectget', lookupStore: 'districts' },
          { label: 'Location', type: 'text', model: 'location' },
          { label: 'Campaign', type: 'select', model: 'campaignId', lookupUrl: 'campaign/selectget', lookupStore: 'campaigns' },
          { label: 'Commodity', type: 'select', model: 'commodityId', lookupUrl: 'commodity/selectget', lookupStore: 'commodities' },
          { label: 'Program', type: 'select', model: 'programId', lookupUrl: 'program/selectget', lookupStore: 'programs' },
          { label: 'Type', type: 'select', model: 'typeId', lookupUrl: 'subscribertype/selectget', lookupStore: 'subscriberTypes' },
          { label: 'Call Date', type: 'date', model: 'callDate' }
        ],
        downloadWordUrl: 'reports/calllogs/word',
        downloadExcelUrl: 'reports/calllogs/excel',
        downloadPdfUrl: 'reports/calllogs/pdf'
      },
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
      },
      {
        title: 'Sustainability Status',
        query: 'reports/sustainabilitystatus/list',
        columns: ['code', 'name', 'phoneNumber', 'gender', 'subscriberType', 'location', 'district', 'region', 'program', 'status'],
        data: [],
        filters: [
          { label: 'Area', type: 'select', model: 'areaId', lookupUrl: 'area/selectget', lookupStore: 'areas' },
          { label: 'Topic', type: 'select', model: 'topicId', lookupUrl: 'topic/selectget', lookupStore: 'topics' },
          { label: 'Pillar', type: 'select', model: 'pillarId', lookupUrl: 'pillar/selectget', lookupStore: 'pillars' },
          { label: 'Region', type: 'select', model: 'regionId', lookupUrl: 'region/selectget', lookupStore: 'regions' },
          { label: 'District', type: 'select', model: 'districtId', lookupUrl: 'district/selectget', lookupStore: 'districts' },
          { label: 'Program', type: 'select', model: 'programId', lookupUrl: 'program/selectget', lookupStore: 'programs' },
          { label: 'Location', type: 'text', model: 'location' },
          { label: 'Phone Number', type: 'text', model: 'phoneNumber' },
          { label: 'Gender', type: 'select', model: 'gender', lookupUrl: 'region/selectgender', lookupStore: 'gender' },
          { label: 'Status', type: 'select', model: 'status', lookupUrl: 'region/sustainabilitystatuses', lookupStore: 'statuses' },
          { label: 'Date From', type: 'date', model: 'dateFrom' },
          { label: 'Date To', type: 'date', model: 'dateTo' }
        ],
        downloadWordUrl: 'reports/sustainabilitystatus/word',
        downloadExcelUrl: 'reports/sustainabilitystatus/excel',
        downloadPdfUrl: 'reports/sustainabilitystatus/pdf'
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
