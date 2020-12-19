import { Component } from '@angular/core';

import * as moment from 'moment-timezone';
import 'moment/locale/pt-br';

@Component({
  selector: 'jv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dio-jv-weather';

  constructor() {
    moment.locale('pt-br');
  }

}
