import runTest from 'ava'
import expect from 'unexpected'
import momentFromString from '@datatypes/moment'
import Duration from '@datatypes/duration'

import Interval from '../source/index'


runTest('2015-11-24--30', test => {
	const startMoment = momentFromString('2015-11-24')
	const endMoment = momentFromString('2015-11-30')
	startMoment.string
	endMoment.string

	expect(
		new Interval(test.title).object,
		'to equal',
		{
			string: test.title,
			start: startMoment,
			end: endMoment,
			duration: new Duration('P168H0M0.0S'),
		}
	)
})


runTest('2015-11-24T18:30--21:45', test => {
	const startMoment = momentFromString('2015-11-24T18:30')
	const endMoment = momentFromString('2015-11-24T21:45')
	startMoment.string
	endMoment.string

	expect(
		new Interval(test.title).object,
		'to equal',
		{
			string: test.title,
			start: startMoment,
			end: endMoment,
			duration: new Duration('P3H16M0.0S'),
		}
	)
})
