import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Injectable()
export class SearchPresenter {
  public searchControl: FormControl = new FormControl('');

  private searchTerms: Subject<string> = new Subject();

  public searchTerms$: Observable<string> = this.searchTerms.pipe(
    // if term length = 0 or greater than 2
    filter((res) => res.length === 0 || res.length > 2),

    // wait 300ms after each keystroke before considering the term
    debounceTime(300),

    // ignore new term if same as previous term
    distinctUntilChanged()
  );

  constructor() {
    this.searchControl.valueChanges.forEach((value: string) => {
      this.searchTerms.next(value);
    });
  }
  // make property?

  public initialSearchTerm(searchTerm: string) {
    this.searchControl.setValue(searchTerm);
  }

  public clearSearch() {
    this.searchControl.setValue('');
  }

  public search(term: string): void {
    this.searchTerms.next(term);
  }
}
