import { extendObservable, action } from 'mobx';

export function TableStore({
  columns = [],
  dataGetter = () => [],
  initialSort = ''
}) {
  const initialFilters = columns.reduce((filters, column) => {
    filters[column.key] = '';

    return filters;
  }, {});

  extendObservable(this, {
    sort: {
      sortedColumn: initialSort,
      isSortedAsc: true,
    },
    filters: initialFilters,
    get data() { return dataGetter(); },
    get filteredData() {
      const filters = this.filters;

      return this.data.filter(item => {
        let includeRow = true;

        for (const columnKey in filters) {
          const filterTerm = filters[columnKey];
          const cellValue = item[columnKey];
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

        return includeRow;
      });
    },
    get sortedData() {
      const { sortedColumn, isSortedAsc } = this.sort;

      if(sortedColumn === '') {
        return this.filteredData;
      }

      const sortedData = this.filteredData.slice().sort((a, b) => {
        const cellA = a[sortedColumn];
        const cellB = b[sortedColumn];

        return cellA.localeCompare(cellB);
      });

      if(!isSortedAsc) {
        sortedData.reverse();
      }

      return sortedData;
    },
    pagination: {
      currentPage: 1,
      pageSize: 5
    },
    get pagesCount() {
      return Math.ceil(this.filteredData.length / this.pagination.pageSize);
    },
    get visibleData() {
      const currentPage = this.pagination.currentPage;
      const pageSize = this.pagination.pageSize;

      const startIndex = Math.max(0, currentPage - 1) * pageSize;
      const endIndex = Math.min(currentPage * pageSize, this.sortedData.length);

      return this.sortedData.slice(startIndex, endIndex);
    },
    get isCurrentPageFirst() {
      return this.pagination.currentPage === 1;
    },
    get isCurrentPageLast() {
      return this.filteredData.length <= this.pagination.currentPage * this.pagination.pageSize;
    }
  });

  this.columns = columns;
}

TableStore.prototype = {
  isColumnSorted(columnKey) {
    return this.sort.sortedColumn === columnKey;
  },

  isColumnSortedAsc(columnKey) {
    return this.isColumnSorted(columnKey) && this.sort.isSortedAsc;
  },

  updateSort: action(function(columnKey) {
    if(this.isColumnSorted(columnKey)) {
      this.sort.isSortedAsc = !this.sort.isSortedAsc;
    } else {
      this.sort.sortedColumn = columnKey;
      this.sort.isSortedAsc = true;
    }
  }),

  getColumnFilterValue(columnKey) {
    return this.filters[columnKey];
  },

  setColumnFilterValue: action(function(columnKey, newValue) {
    this.filters[ columnKey] = newValue;
  }),

  getCurrentPage() {
    return this.pagination.currentPage;
  },

  isCurrentPage(pageNumber) {
    return this.getCurrentPage() === pageNumber;
  },

  setCurrentPage: action(function(pageNumber) {
    this.pagination.currentPage = pageNumber;
  }),

  goToPreviousPage: action(function() {
    if(!this.isCurrentPageFirst) {
      this.setCurrentPage(this.pagination.currentPage - 1);
    }
  }),

  goToNextPage: action(function() {
    if(!this.isCurrentPageLast) {
      this.setCurrentPage(this.pagination.currentPage + 1);
    }
  }),
};