import momentFromString, {add, subtract} from '@datatypes/moment'
import Duration from '@datatypes/duration'


export default class Interval {
	constructor (intervalString) {
		// Use -- as default separator
		const separator = '--'
		intervalString = intervalString.replace(/\//g, separator)
		const items = intervalString.split(separator)

		if (!items) {
			throw new Error(
				'A valid interval string must be used for instantiation ' +
				'and not "' + intervalString + '"'
			)
		}

		this._isoString = intervalString

		// e.g. P1D--2015-11-25
		if (items[0].startsWith('P')) {
			this._duration = new Duration(items[0])
			this._end = momentFromString(items[0])
			this._start = subtract(this._end, this._duration)
		}
		// e.g. 2015-11-25--P1D
		else if (items[1].startsWith('P')) {
			this._duration = new Duration(items[1])
			this._start = momentFromString(items[0])
			this._end = add(this._start, this._duration)
		}
		// e.g. 2015-11-25--2015-11-26
		else {
			const simplified0 = items[0].replace(/[0-9]/g, 0)
			const simplified1 = items[1].replace(/[0-9]/g, 0)

			if ( // the parts don't have the same pattern
				(simplified0 !== simplified1) ||
				// or part 2 doesn't start with a year
				!/^[0-9]{4}/.test(items[1])
			) {
				// part 2 is an incomplete representation
				// and must be completed
				// e.g. 2015-12-11--15 => 2015-12-11--2015-12-15
				items[1] = items[0].slice(0, -items[1].length) + items[1]
			}

			this._start = momentFromString(items[0])
			this._end = momentFromString(items[1])
			this._duration = this._start.maximumOffset(this._end)
		}
	}

	clone () {
		return new Interval(this.string)
	}

	get start () { return this._start }
	set start (start) {
		delete this._duration
		delete this._isoString
		this._start = start
	}

	get end () { return this._end }
	set end (end) {
		delete this._duration
		delete this._isoString
		this._end = end
	}

	get duration () { return this._duration }
	set duration (duration) {
		delete this._end
		delete this._isoString
		this._duration = duration
	}

	contains (momentOrInstant) {
		// is Instant
		if (typeof momentOrInstant.getTime === 'function') {
			// not `<=`, as `upperLimit` is exclusive
			return (momentOrInstant >= this.start.lowerLimit) &&
				(momentOrInstant < this.end.upperLimit)
		}
		// is Moment
		else {
			return (momentOrInstant.lowerLimit >= this.start.lowerLimit) &&
				(momentOrInstant.upperLimit <= this.end.upperLimit)
		}
	}

	get string () {
		if (!this._isoString) {
			this._isoString = this.start + '--' + this.end
		}

		return this._isoString
	}

	toString () { return this.string }
	toJSON () { return this.string }


	get object () {
		return {
			string: this.string,
			start: this.start,
			end: this.end,
			duration: this.duration,
		}
	}

	toObject () {
		return this.object
	}
}
