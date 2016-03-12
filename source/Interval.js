import moment, {add, subtract} from '@datatypes/moment'
import Duration from '@datatypes/duration'


export default class Interval {
	constructor (intervalString) {
		// Use -- as default separator
		const separator = '--'
		intervalString = intervalString.replace(/\//g, separator)
		const items = intervalString.split(separator)

		if (items) {
			this._isoString = intervalString

			// e.g. P1D--2015-11-25
			if (items[0].startsWith('P')) {
				this._duration = new Duration(items[0])
				this._end = moment(items[0])
				this._start = subtract(this._end, this._duration)
			}
			// e.g. 2015-11-25--P1D
			else if (items[1].startsWith('P')) {
				this._duration = new Duration(items[1])
				this._start = moment(items[0])
				this._end = add(this._start, this._duration)
			}
			// e.g. 2015-11-25--2015-11-26
			else {
				this._start = moment(items[0])
				this._end = moment(items[1])
				this._duration = this._start.maximumOffset(this._end)
			}
		}
		else {
			throw new Error('No interval string was passed')
		}
	}

	clone () {
		return new Interval(this.string)
	}

	get start () { return this._start }
	set start (start) {
		delete this._duration
		this._start = start
	}

	get end () { return this._end }
	set end (end) {
		delete this._duration
		this._end = end
	}

	get duration () { return this._duration }
	set duration (duration) {
		delete this._end
		this._duration = duration
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
