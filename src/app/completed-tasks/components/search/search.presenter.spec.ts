import { fakeAsync, tick } from '@angular/core/testing';

import { Subscription } from 'rxjs';

import { SearchPresenter } from './search.presenter';

describe('SearchPresenter', () => {
  let presenter: SearchPresenter;

  beforeEach(() => {
    presenter = new SearchPresenter();
  });

  describe('emits search terms', () => {
    const debounceTime = 300;
    let searchTermsSpy: jest.Mock<any, any>;
    let searchTermsSubscription: Subscription;

    beforeEach(() => {
      searchTermsSpy = jest.fn();
      searchTermsSubscription =
        presenter.searchTerms$.subscribe(searchTermsSpy);
    });

    afterEach(() => {
      searchTermsSubscription.unsubscribe();
    });

    it('when a user searches for a term longer than 2 characters', fakeAsync(() => {
      const threeCharacters = '123';

      presenter.search(threeCharacters);
      tick(debounceTime);

      expect(searchTermsSpy).toHaveBeenCalledTimes(1);
      expect(searchTermsSpy).toHaveBeenCalledWith(threeCharacters);
    }));

    it('when a user searches for an empty string', fakeAsync(() => {
      const emptyString = '';

      presenter.search(emptyString);
      tick(debounceTime);

      expect(searchTermsSpy).toHaveBeenCalledTimes(1);
      expect(searchTermsSpy).toHaveBeenCalledWith(emptyString);
    }));

    it(`after ${debounceTime} milliseconds of inactivity`, fakeAsync(() => {
      const elektra = 'elektra';

      presenter.search(elektra);
      tick(debounceTime - 1);

      expect(searchTermsSpy).not.toHaveBeenCalled();
      tick(1);

      expect(searchTermsSpy).toHaveBeenCalledTimes(1);
    }));

    it(`that is the latest preceeded by at most ${
      debounceTime - 1
    } milliseconds of inactivity`, fakeAsync(() => {
      const medusa = 'medusa';
      const wasp = 'wasp';

      presenter.search(medusa);
      tick(debounceTime - 1);
      presenter.search(wasp);

      expect(searchTermsSpy).not.toHaveBeenCalled();
      tick(debounceTime);

      expect(searchTermsSpy).toHaveBeenCalledTimes(1);
      expect(searchTermsSpy).toHaveBeenCalledWith(wasp);
    }));

    it('and ignores duplicates', fakeAsync(() => {
      const sheHulk = 'she-hulk';

      presenter.search(sheHulk);
      tick(debounceTime - 1);
      presenter.search(sheHulk);

      expect(searchTermsSpy).not.toHaveBeenCalled();
      tick(300);

      expect(searchTermsSpy).toHaveBeenCalledTimes(1);
      expect(searchTermsSpy).toHaveBeenCalledWith(sheHulk);
    }));

    it('but duplicates reset the inactivity period', fakeAsync(() => {
      const scarletWitch = 'scarlet witch';

      presenter.search(scarletWitch);
      tick(debounceTime - 1);
      presenter.search(scarletWitch);
      tick(1);

      expect(searchTermsSpy).not.toHaveBeenCalled();
      tick(300);

      expect(searchTermsSpy).toHaveBeenCalledTimes(1);
    }));

    it('search cleared', fakeAsync(() => {
      const emptyString = '';

      presenter.clearSearch();
      tick(debounceTime);

      expect(searchTermsSpy).toHaveBeenCalledTimes(1);
      expect(searchTermsSpy).toHaveBeenCalledWith(emptyString);
    }));

    it('initial search term set', fakeAsync(() => {
      const henry = 'henry';

      presenter.initialSearchTerm(henry);
      tick(debounceTime);

      expect(searchTermsSpy).toHaveBeenCalledTimes(1);
      expect(searchTermsSpy).toHaveBeenCalledWith(henry);
    }));
  });

  describe('does not emit search terms', () => {
    const debounceTime = 300;
    let searchTermsSpy: jest.Mock<any, any>;
    let searchTermsSubscription: Subscription;

    beforeEach(() => {
      searchTermsSpy = jest.fn();
      searchTermsSubscription =
        presenter.searchTerms$.subscribe(searchTermsSpy);
    });

    afterEach(() => {
      searchTermsSubscription.unsubscribe();
    });

    it('when a user searches for 1 character', fakeAsync(() => {
      const oneCharacter = '1';

      presenter.search(oneCharacter);
      tick(debounceTime);

      expect(searchTermsSpy).not.toHaveBeenCalled();
    }));

    it('when a user searches for 2 characters', fakeAsync(() => {
      const twoCharacters = '12';

      presenter.search(twoCharacters);
      tick(debounceTime);

      expect(searchTermsSpy).not.toHaveBeenCalled();
    }));
  });
});
