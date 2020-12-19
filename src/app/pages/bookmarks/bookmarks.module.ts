import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookmarksPage } from './containers/bookmarks/bookmarks.page';
import { bookmarkReducer } from './state/bookmarks.reducer';
import { BookmarksEffects } from './state/bookmarks.effects';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [BookmarksPage],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature('bookmarks', bookmarkReducer),
    EffectsModule.forFeature([BookmarksEffects]),
    ComponentsModule,
  ]
})
export class BookmarksModule { }
