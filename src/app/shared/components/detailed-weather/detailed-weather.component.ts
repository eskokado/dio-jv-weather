import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Units } from '../../models/units.enum';
import { unitToSymbol } from '../../utils/units.utils';

import { Weather } from './../../models/weather.model';

@Component({
  selector: 'jv-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedWeatherComponent  {

  @Input() weather: Weather;
  @Input() unit: Units;

  get weatherIcon(): string {
    return `http://openweathermap.org/img/wn/${ this.weather.icon }@2x.png`;
  }

  get unitSymbol(): string {
    return unitToSymbol(this.unit);
  }
}
