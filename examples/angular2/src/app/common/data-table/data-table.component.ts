import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IColumn} from './column.model';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html'
})

export class DataTableComponent implements OnInit {
  @Input() rowData: Observable<Array<any>>;

  sourceRows: Array<object> = [];

  @Input() columns: Array<IColumn> = [];
  @Output() rowClick = new EventEmitter();

  filters = {};
  sort = {
    sortColumn: '',
    sortDirection: ''
  };

  pagination = {
    currentPage: 1,
    pageSize: 5
  };


  ngOnInit() {
    this.rowData.subscribe(value => {
      this.sourceRows = value.slice();
    });
  }

  handleFilterKeyUp(event: any) {
    const element = (<HTMLInputElement> event.target);
    const columnKey = element.name;

    this.filters[columnKey] = element.value.toLocaleLowerCase();
  }

  handleHeaderClick(columnKey) {
    const {sortColumn, sortDirection} = this.sort;

    if (sortColumn !== columnKey) {
      this.sort = {
        sortColumn: columnKey,
        sortDirection: '+'
      };
    } else {
      this.sort.sortDirection = sortDirection === '+' ? '-' : '+';
    }
  }

  getFilteredAndSortedRows() {
    return sortRows(
      filterRows(this.sourceRows, this.filters),
      this.sort.sortColumn,
      this.sort.sortDirection
    );
  }

  getPagesCount() {
    return Math.ceil(this.getFilteredAndSortedRows().length / this.pagination.pageSize);
  }

  getPages() {
    return new Array(this.getPagesCount());
  }

  changePage(page: number) {
    const shouldChangePage = this.pagination.currentPage !== page
      && page > 0
      && page <= this.getPagesCount();

    if (shouldChangePage) {
      this.pagination.currentPage = page;
    }
  }

  getVisibleRows() {
    const filteredAndSortedRows = this.getFilteredAndSortedRows();
    const rowsCount = filteredAndSortedRows.length;
    const {pagination: {currentPage, pageSize}} = this;
    const startIndex = Math.max(0, currentPage - 1) * pageSize;
    const endIndex = Math.min(currentPage * pageSize, rowsCount);

    return filteredAndSortedRows.slice(startIndex, endIndex);
  }

  handleRowClick(row) {
    this.rowClick.emit(row);
  }

  getSortClass(columnKey) {
    const {sortColumn, sortDirection} = this.sort;
    const isSortedByColumn = sortColumn === columnKey;

    return {
      'fa-sort': !isSortedByColumn,
      'fa-sort-desc': isSortedByColumn && sortDirection === '-',
      'fa-sort-asc': isSortedByColumn && sortDirection === '+',
    };
  }

  isFirstPage() {
    return this.pagination.currentPage === 1;
  }

  isLastPage() {
    return this.sourceRows.length <= this.pagination.currentPage * this.pagination.pageSize;
  }
}

function filterRows(rows, filters) {
  return rows.filter(row => {
    let includeRow = true;

    for (const columnKey in filters) {
      if (filters.hasOwnProperty(columnKey)) {
        const filterTerm = filters[columnKey];
        const cellValue = row[columnKey];
        const hasFilterTerm = !!filterTerm;
        const hasCellValue = !!cellValue;

        if (hasFilterTerm) {
          if (hasCellValue) {
            includeRow = cellValue.toString().toLocaleLowerCase().indexOf(filterTerm) !== -1;
          } else {
            includeRow = false;
          }
        }

        if (!includeRow) {
          break;
        }
      }
    }

    return includeRow;
  });
}

function sortRows(rows, sortColumn, sortDirection) {
  return rows
    .slice()
    .sort((a, b) => {
      if (a[sortColumn] > b[sortColumn]) {
        return sortDirection === '+' ? 1 : -1;
      } else if (a[sortColumn] < b[sortColumn]) {
        return sortDirection === '-' ? 1 : -1;
      }

      return 0;
    });
}
