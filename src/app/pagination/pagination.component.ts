import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() elementsNumber: number;
  @Input() elementsOnPage: number;
  @Output() settingsChanged = new EventEmitter();
  pageCount: number;
  pageNumber = 1;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    this.pageCount = Math.ceil(this.elementsNumber / this.elementsOnPage);
    // this.triggerSettingsChanged(0, this.elementsOnPage);
  }

  pageIndexes() {
    return Array.from({length: this.pageCount}, (v, k) => k + 1);
  }

  pageChanged(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.settingsChanged.emit({ paginationStart: (this.pageNumber - 1) * this.elementsOnPage, elementsOnPage: this.elementsOnPage });
  }

  elementsOnPageChanged(elementsOnPage: number) {
    // this.elementsOnPage = elementsOnPage;
    // this.pageCount = Math.ceil(this.elementsNumber / elementsOnPage);
    this.settingsChanged.emit({ paginationStart: 0, elementsOnPage: +elementsOnPage });
  }
}
