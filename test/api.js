import runTest from 'ava'
import expect from 'unexpected'
import moment from '@datatypes/moment'

import Interval from '../source/index'


runTest('clone', test => {
	const interval = new Interval('2015-11--2015-12')
	const clone = interval.clone()

	expect(interval.object, 'to equal', clone.object)
})
