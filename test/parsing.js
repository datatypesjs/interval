import runTest from 'ava'
import expect from 'unexpected'
import moment from '@datatypes/moment'
import Duration from '@datatypes/duration'

import Interval from '../source/Interval'


function getYearInterval () {
	const startMoment = moment('2015')
	const endMoment = moment('2016')
	startMoment.string
	endMoment.string

	return {
		string: '2015--2016',
		start: startMoment,
		end: endMoment,
		duration: new Duration('P17544H0M0.0S'),
	}
}


runTest('2015/2016', test => {
	const interval = new Interval(test.title)
	expect(interval.object, 'to equal', getYearInterval())
})


runTest('2015--2016', test => {
	const interval = new Interval(test.title)
	expect(interval.object, 'to equal', getYearInterval())
})


runTest('2015-09--2015-11', test => {
	const interval = new Interval(test.title)
	const startMoment = moment('2015-09')
	const endMoment = moment('2015-11')
	startMoment.string
	endMoment.string

	const intervalObject = {
		string: test.title,
		start: startMoment,
		end: endMoment,
		duration: new Duration('P2184H0M0.0S'),
	}
	expect(interval.object, 'to equal', intervalObject)
})


runTest('2015-11-24--2015-11-30', test => {
	const startMoment = moment('2015-11-24')
	const endMoment = moment('2015-11-30')
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


runTest('2015-11-24T17:23:45.234Z--2015-11-30T09:11:14.567Z', test => {
	const interval = new Interval(test.title)
	const startMoment = moment('2015-11-24T17:23:45.234Z')
	const endMoment = moment('2015-11-30T09:11:14.567Z')
	startMoment.string
	endMoment.string

	expect(
		new Interval(test.title).object,
		'to equal',
		{
			string: test.title,
			start: startMoment,
			end: endMoment,
			duration: new Duration('P135H47M29.334S')
		}
	)
})
