import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { TableStore } from './TableStore';

class TableComponent extends Component {
  constructor() {
    super();
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePageNumberClick = this.handlePageNumberClick.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleHeaderClick(event) {
    const columnKey = event.target.dataset.columnKey;

    this.props.tableStore.updateSort(columnKey);
  }

  handleFilterChange(event) {
    const columnKey = event.target.name;
    const newValue = event.target.value;

    this.props.tableStore.setColumnFilterValue(columnKey, newValue);
  }

  handlePreviousPageClick() {
    this.props.tableStore.goToPreviousPage();
  }

  handleNextPageClick() {
    this.props.tableStore.goToNextPage();
  }

  handlePageNumberClick(event) {
    const pageNumber = +event.target.dataset.pageNumber;

    this.props.tableStore.setCurrentPage(pageNumber);
  }

  handleRowClick(event) {
    const targetItemId = event.target.dataset.itemId;

    this.props.onClickRow(targetItemId);
  }

  render() {
    const { tableStore } = this.props;
    const { columns } = tableStore;
    const pageNumberListItems = [];

    for (let i = 0; i < tableStore.pagesCount; i++) {
      const pageNumber = i + 1;
      const isCurrentPage = tableStore.isCurrentPage(pageNumber);

      const pageNumberListItem = (
        <li
          key={pageNumber}
          className={`${isCurrentPage ? "active" : ""}`}
        >
          <a
            className="link"
            data-page-number={pageNumber}
            onClick={this.handlePageNumberClick}
          >
            {pageNumber}
          </a>
        </li>
      );

      pageNumberListItems.push(pageNumberListItem);
    }

    return (
      <div>
        <table className="table table-hover table-bordered">
          <thead>
          <tr>
            {columns.map(column => {
              const columnKey = column.key;

              const sortIndicator = tableStore.isColumnSorted(columnKey)
                ? tableStore.isColumnSortedAsc(columnKey) ? '↓' : '↑'
                : '↕';

              return (
                <th key={columnKey} data-column-key={columnKey} onClick={this.handleHeaderClick}>
                  {sortIndicator} {column.name}
                </th>
              );
            })}
          </tr>
          <tr>
            {columns.map(column => {
              const columnKey = column.key;

              return (
                <td key={columnKey}>
                  <input
                    name={columnKey}
                    value={tableStore.getColumnFilterValue(columnKey)}
                    placeholder={`${column.name}...`}
                    className="form-control"
                    onChange={this.handleFilterChange}
                  />
                </td>
              );
            })}
          </tr>
          </thead>
          <tbody>
          {tableStore.visibleData.map((item) => {
            const cells = tableStore.columns.map(column => {
              const columnKey = column.key;
              const itemId = item._id;

              return (
                <td key={`${itemId}_${columnKey}`} data-item-id={itemId}>
                  {item[ columnKey ]}
                </td>
              );
            });

            return (
              <tr key={item._id} onClick={this.handleRowClick}>
                {cells}
              </tr>
            );
          })}
          </tbody>
        </table>
        <ul className="pagination">
          <li className={`${tableStore.isCurrentPageFirst ? "disabled" : ""}`}>
            <a className="link" aria-label="Previous" onClick={this.handlePreviousPageClick}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pageNumberListItems}
          <li className={`${tableStore.isCurrentPageLast ? "disabled" : ""}`}>
            <a className="link" aria-label="Next" onClick={this.handleNextPageClick}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    );
  };
};

TableComponent.propTypes = {
  tableStore: PropTypes.instanceOf(TableStore).isRequired,
  onClickRow: PropTypes.func
};

TableComponent.defaultProps = {
  onClickRow: (rowId) => { console.log(rowId); }
};

export const Table = inject()(observer(TableComponent));