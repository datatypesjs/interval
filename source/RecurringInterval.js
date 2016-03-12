import Interval from './Interval'


export default class RecurringInterval extends Interval {

	constructor (intervalString) {
		const separator = '--'
		intervalString = intervalString.replace(/\//g, separator)
		const fragments = intervalString.split(separator)
		const numberOfRecurrences = Number(fragments.shift().substr(1))

		super(fragments.join(separator))

		this._isoString = intervalString
		this._numberOfRecurrences = numberOfRecurrences
	}

	clone () {
		return new RecurringInterval(this.string)
	}

	get numberOfRecurrences () { return this._numberOfRecurrences }
	set numberOfRecurrences (recurrences) {
		this._numberOfRecurrences = recurrences
	}


	get string () {
		if (!this._isoString) {
			this._isoString = 'R' + this.numberOfRecurrences +
				'--' + super.string
		}

		return this._isoString
	}

	get object () {
		return Object.assign(
			super.object,
			{
				numberOfRecurrences: this.numberOfRecurrences
			}
		)
	}
}
