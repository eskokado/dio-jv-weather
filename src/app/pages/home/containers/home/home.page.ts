import { CityTypeaheadItem } from './../../../../shared/models/city-typeahead-item.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';

import { select, Store } from '@ngrx/store';

import * as fromHomeActions from '../../state/home.actions' ;
import * as fromHomeSelectors from '../../state/home.selectors';
import { CityWeather } from 'src/app/shared/models/weather.model';
import { Bookmark } from './../../../../shared/models/bookmark.model';
import { takeUntil } from 'rxjs/operators';
import { Units } from 'src/app/shared/models/units.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  cityWeather: CityWeather;
  cityWeather$: Observable<CityWeather>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  isCurrentFavorite$: Observable<boolean>;

  unit$: Observable<Units>;

  searchControl: FormControl;
  searchControlWithAutocomplete: FormControl;

  text: string;

  private componentDestroyed$ = new Subject();

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.searchControl = new FormControl('', Validators.required);
    this.searchControlWithAutocomplete = new FormControl(undefined);

    this.searchControlWithAutocomplete.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((value: CityTypeaheadItem) => {
        if (!!value) {
          this.store.dispatch(fromHomeActions.loadCurrentWeatherById({id: value.geonameid.toString()}));
        }
      });

    this.cityWeather$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeather));
    this.cityWeather$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(value => this.cityWeather = value);
    this.loading$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherLoading));
    this.error$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeatherError));
  }

  doSearch() {
    const query = this.searchControl.value;
    this.store.dispatch(fromHomeActions.loadCurrentWeather( { query } ));
  }

  onToggleBookmark() {
    const bookmark = new Bookmark();
    bookmark.id = this.cityWeather.city.id;
    bookmark.name = this.cityWeather.city.name;
    bookmark.country = this.cityWeather.city.country;
    bookmark.coord = this.cityWeather.city.coord;
    this.store.dispatch(fromHomeActions.toggleBookmark({ entity: bookmark }));
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }
}
