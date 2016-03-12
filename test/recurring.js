import runTest from 'ava'
import expect from 'unexpected'
import momentFromString from '@datatypes/moment'
import Duration from '@datatypes/duration'

import RecurringInterval from '../source/RecurringInterval'


runTest('R3/2015-11-25T15/P1H30M', test => {
	const interval = new RecurringInterval(test.title)
	const startMoment = momentFromString('2015-11-25T15')
	const endMoment = momentFromString('2015-11-25T16:30')
	startMoment.string

	const intervalObject = {
		string: 'R3--2015-11-25T15--P1H30M',
		numberOfRecurrences: 3,
		start: startMoment,
		end: endMoment,
		duration: new Duration('P1H30M')
	}
	expect(interval.object, 'to equal', intervalObject)
})
