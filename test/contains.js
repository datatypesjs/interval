import runTest from 'ava'
import expect from 'unexpected'
import momentFromString from '@datatypes/moment'

import Interval from '../source/index'


runTest('2015-11-01--2015-11-13 contains 2015-11-08', test => {
	const interval = new Interval('2015-11-01--13')
	const moment = momentFromString('2015-11-08')

	expect(interval.contains(moment), 'to be true')
})


runTest('2015-11-01--2015-11-13 contains 2015-11-01', test => {
	const interval = new Interval('2015-11-01--13')
	const moment = momentFromString('2015-11-01')

	expect(interval.contains(moment), 'to be true')
})


runTest('2015-11-01--2015-11-13 contains 2015-11-13', test => {
	const interval = new Interval('2015-11-01--13')
	const moment = momentFromString('2015-11-13')

	expect(interval.contains(moment), 'to be true')
})


runTest('2015-11-05--13 does not contain 2015-11-04 & 2015-11-14', test => {
	const interval = new Interval('2015-11-05--13')

	const momentBefore = momentFromString('2015-11-04')
	expect(interval.contains(momentBefore), 'to be false')

	const momentAfter = momentFromString('2015-11-14')
	expect(interval.contains(momentAfter), 'to be false')
})


runTest('2015-11-01--2015-11-13 contains 2015-11-08T00:00:00.000Z', test => {
	const interval = new Interval('2015-11-01--2015-11-13')
	const date = new Date('2015-11-08T00:00:00.000Z')

	expect(interval.contains(date), 'to be true')
})
