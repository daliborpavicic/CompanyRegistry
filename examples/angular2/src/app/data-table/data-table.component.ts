import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'data-table',
    templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnInit {
    @Input() rowData: Array<Object> = [];
    @Input() columns: Array<Object> = [];
    @Output() rowClick = new EventEmitter();

    filters = {};
    sort = {
        sortColumn: '',
        sortDirection: ''
    };

    visibleRows: Array<Object> = [];

    ngOnInit() {
        this.visibleRows = this.rowData ? this.rowData.slice() : [];
    }

    handleFilterKeyUp(event: any) {
        const element = (<HTMLInputElement> event.target);
        const columnKey = element.name;

        this.filters[columnKey] = element.value.toLocaleLowerCase();
        this.visibleRows = filterRows(this.rowData, this.filters);
    }

    handleHeaderClick(columnKey) {
        const { visibleRows } = this;
        const {sortColumn, sortDirection} = this.sort;

        if (sortColumn !== columnKey) {
            this.sort = {
                sortColumn: columnKey,
                sortDirection: '+'
            };
        } else {
            this.sort.sortDirection = sortDirection === '+' ? '-' : '+';
        }

        this.visibleRows = sortRows(visibleRows, this.sort.sortColumn, this.sort.sortDirection);
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
}

function filterRows(rows, filters) {
    return rows.filter(row => {
        let includeRow = true;

        for (const columnKey in filters) {
            if (filters.hasOwnProperty(columnKey)) {
                const columnFilter = filters[columnKey];
                const cellValue = row[columnKey];

                if (!!columnFilter && cellValue.toString().toLocaleLowerCase().indexOf(columnFilter) === -1) {
                    includeRow = false;
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
