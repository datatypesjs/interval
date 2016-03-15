# Interval

Module for ISO 8601 based intervals and recurring intervals.


## Installation

```shell
npm install --save @datatypes/interval
```


## Usage

As separator string it can either be used `--` or `/`.
It's recommended to use `--` due to the possibility to use it in
file names and URLs.

Import interval into your modules like this (ES2015 style):

```js
import Interval, {RecurringInterval} from '@datatypes/interval'
```


### `<start moment>--<end moment>`

```js
const interval = new Interval('2015-09--2015-11')
const intervalObject = {
	string: test.title,
	start: momentFromString('2015-09'),
	end: momentFromString('2015-11'),
	duration: new Duration('P2184H0M0.0S'),
}

assert.deepEqual(interval.object, intervalObject)
```


### `<start moment>--<incomplete end moment>`

```js
const interval = new Interval('2015-11-24--30')
const intervalObject = {
	string: test.title,
	start: momentFromString('2015-11-24'),
	end: momentFromString('2015-11-30'),
	duration: new Duration('P168H0M0.0S'),
}

assert.deepEqual(interval.object, intervalObject)
```


### `R<number of recurrences>--<start moment>--<duration>`

```js
const recurringInterval = new RecurringInterval('R3--2015-11-25T15--P1H30M')
const recurringIntervalObject = {
	string: 'R3--2015-11-25T15--P1H30M',
	numberOfRecurrences: 3,
	start:  momentFromString('2015-11-25T15'),
	end: momentFromString('2015-11-25T16:30'),
	duration: new Duration('P1H30M')
}

assert.deepEqual(recurringInterval.object, recurringIntervalObject)
```

**Check out the test directory for more usage examples!**
