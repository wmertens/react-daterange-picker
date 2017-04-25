import React, {PropTypes} from 'react'

const handleYearChange = event => {
	this.props.onYearChange(parseInt(event.target.value, 10))
}

const renderYearChoice = year => {
	let {enabledRange} = this.props

	if (year < enabledRange.start.year()) {
		return null
	}

	if (year > enabledRange.end.year()) {
		return null
	}

	return (
		<option key={year} value={year}>
			{moment(year, 'YYYY').locale(this.props.locale).format('YYYY')}
		</option>
	)
}

const HeaderYear = ({firstOfMonth, currentYear, locale, disableNavigation, enabledRange}) => {
	let y = firstOfMonth.year()
	if (currentYear === y) {
		return false
	}
	let years = Immutable.Range(y - 5, y).concat(Immutable.Range(y, y + 10))
	let choices = years.map(renderYearChoice)
	let modifiers = {year: true}
	return (
		<span className={this.cx({element: 'MonthHeaderLabel', modifiers})}>
			{firstOfMonth.locale(locale).format('YYYY')}
			{disableNavigation ?
				null :
				<select
					className={this.cx({element: 'MonthHeaderSelect'})}
					value={y}
					onChange={handleYearChange}
				>
					{choices.toJS()}
				</select>}
		</span>
	)
}
HeaderYear.propTypes = {
	firstOfMonth: CustomPropTypes.moment,
	locale: React.PropTypes.string,
	disableNavigation: React.PropTypes.bool,
	enabledRange: CustomPropTypes.momentRange,
}
