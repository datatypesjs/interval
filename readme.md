# Interval

Module for ISO 8601 based intervals and recurring intervals.


## Installation

```shell
npm install --save @datatypes/interval
```


## Usage

```js
import Interval, {RecurringInterval} from '@datatypes/interval'

const interval = new Interval('2015-09--2015-11')
const intervalObject = {
	string: test.title,
	start: momentFromString('2015-09'),
	end: momentFromString('2015-11'),
	duration: new Duration('P2184H0M0.0S'),
}

assert.deepEqual(interval.object, intervalObject)



const recurringInterval = new RecurringInterval('R3/2015-11-25T15/P1H30M')
const recurringIntervalObject = {
	string: 'R3--2015-11-25T15--P1H30M',
	numberOfRecurrences: 3,
	start:  momentFromString('2015-11-25T15'),
	end: momentFromString('2015-11-25T16:30'),
	duration: new Duration('P1H30M')
}

assert.deepEqual(recurringInterval.object, recurringIntervalObject)
```

Check out the test directory for more usage examples!
