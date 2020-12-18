import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HomePage } from './home.page';
import { homeReducer } from './state/home.reducer';
import { HomeEffects } from './state/home.effects';



@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('home', homeReducer ),
    EffectsModule.forFeature([HomeEffects])
  ]
})
export class HomeModule { }
