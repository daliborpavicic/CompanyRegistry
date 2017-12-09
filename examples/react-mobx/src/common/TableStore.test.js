import { observable } from 'mobx';
import { TableStore } from './TableStore';

describe('TableStore', () => {
  const columns = [
    {key: 'postalCode', name: 'Postal Code'},
    {key: 'name', name: 'Name'},
  ];

  const initialData = [
    {"_id": "21000", "postalCode": "21000", "name":"Novi Sad"},
    {"_id": "11000", "postalCode": "11000", "name":"Beograd"},
    {"_id": "24000", "postalCode": "24000", "name":"Subotica"},
  ];

  const dataStore = observable({
    data: observable.shallowArray(initialData)
  });

  const columnKey1 = columns[0].key;
  const columnKey2 = columns[1].key;

  const tableStore = new TableStore({
    columns,
    dataGetter: () => dataStore.data,
    initialSort: columnKey1
  });

  it('should initialize a new table store', () => {
    expect(tableStore).toBeDefined();
  });

  it('should sort the data by any column ascending or descending', () => {
    expect(tableStore.isColumnSortedAsc(columnKey1)).toBe(true);

    expect(tableStore.sortedData[0]._id).toBe(initialData[1]._id);
    expect(tableStore.sortedData[1]._id).toBe(initialData[0]._id);
    expect(tableStore.sortedData[2]._id).toBe(initialData[2]._id);

    tableStore.updateSort(columnKey1);

    expect(tableStore.sortedData[0]._id).toBe(initialData[2]._id);
    expect(tableStore.sortedData[1]._id).toBe(initialData[0]._id);
    expect(tableStore.sortedData[2]._id).toBe(initialData[1]._id);

    tableStore.updateSort(columnKey2);

    expect(tableStore.sortedData[0]._id).toBe(initialData[1]._id);
    expect(tableStore.sortedData[1]._id).toBe(initialData[0]._id);
    expect(tableStore.sortedData[2]._id).toBe(initialData[2]._id);
  });

  it('should initialize filters for each column to an empty string', () => {
    columns.forEach(column => {
      const columnKey = column.key;

      expect(tableStore.getColumnFilterValue(columnKey)).toBe('');
    });
  });

  it('should set a value to a column filter', () => {
    tableStore.setColumnFilterValue(columnKey1, '00');
    expect(tableStore.getColumnFilterValue(columnKey1)).toBe('00');

    tableStore.setColumnFilterValue(columnKey2, 'S');
    expect(tableStore.getColumnFilterValue(columnKey2)).toBe('S');
  });

  it('should paginate the data', () => {
    const moreData = [
      {"_id": "34000", "postalCode": "34000", "name":"Kragujevac"},
      {"_id": "22000", "postalCode": "22000", "name":"Sremska Mitrovica"},
      {"_id": "31000", "postalCode": "31000", "name":"Užice"}
    ];

    const tableStore = new TableStore({
      columns,
      dataGetter: () => initialData.concat(moreData),
      initialSort: columnKey1
    });

    expect(tableStore.data.length).toBe(6);
    expect(tableStore.pagesCount).toBe(2);
    expect(tableStore.visibleData.length).toBe(5);
    expect(tableStore.isCurrentPageFirst).toBe(true);

    tableStore.setCurrentPage(2);
    expect(tableStore.visibleData.length).toBe(1);
    expect(tableStore.isCurrentPageLast).toBe(true);
  });
});