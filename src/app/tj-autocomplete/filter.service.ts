import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {

  isActive: boolean = false;
  fieldName: string;
  fieldKeyName: string;

  get suggestions() {
    if (this.subset != null) {
      return this.subset;
    }
    return this.superset;
  }

  private superset: Object[];
  private subset: Object[];
  private previousQuery: string;

  constructor() { }

  clean() {
    this.superset = null;
    this.previousQuery = null;
  }

  setSupersetData(superset: Object[]) {
    this.superset = superset;
    this.subset = null;
  }

  setPreviousQuery(query: string) {
    this.previousQuery = query;
  }

  canFilter(query: string): boolean {
    return this.isActive
      && this.hasFieldName()
      && this.isValidQuery(query);
  }

  private hasFieldName(): boolean {
    return this.fieldName != null;
  }

  private isValidQuery(query: string): boolean {
    return this.previousQuery != null && query.startsWith(this.previousQuery);
  }

  filter(query: string) {
    if (!this.canFilter(query)) { return; }
    if (this.hasKey(query)) {
      this.subset = this.filterByField(query, this.superset, this.fieldKeyName);
    } else {
      this.subset = this.filterByField(query, this.superset, this.fieldName);
    }
  }

  private hasKey(query): boolean {
    return this.fieldKeyName != null && !isNaN(query);
  }

  private filterByField(query: string, items: Object[], fieldName: string): Object[] {
    return items.filter(item =>
      item[fieldName].toLowerCase().startsWith(query.toLowerCase())
    );
  }

}
