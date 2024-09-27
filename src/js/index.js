'use strict'

import hello from "./modules/hello"

import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

new AirDatepicker('#date');

// Or init with {inline: true} on <input> or <div> elements


console.log(hello)

console.log('Hello')