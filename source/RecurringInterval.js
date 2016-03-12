import Interval from './Interval'


export default class RecurringInterval extends Interval {
	constructor (intervalString) {
		const intervalSeparator = intervalString.includes('--') ? '--' : '/'
		const fragments = intervalString.split(intervalSeparator)
		const numberOfRepetitions = Number(fragments.shift().substr(1))

		super(fragments.join(intervalSeparator))

		this._isoString = intervalString
		this._numberOfRepetitions = numberOfRepetitions
	}

	clone () {
		return new RecurringInterval(this.isoString)
	}


	get isoString () {
		if (!this._isoString) {
			this._isoString = 'R' + this.numberOfRepetitions +
				'--' + super.string
		}

		return this._isoString
	}

	get object () {
		return Object.assign(
			super.object,
			{
				numberOfRepetitions: this.numberOfRepetitions
			}
		)
	}
}
