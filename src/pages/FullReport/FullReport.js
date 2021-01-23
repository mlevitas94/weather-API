import React, { useState } from 'react'
import { connect } from 'react-redux'
import './FullReport.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'

const FullReport = (props) => {
    const { setLocation } = props
    const forecastToday = !setLocation ? null : setLocation.forecast.forecastday[0]

    const [tempType, setTempType] = useState('F')

    const getWeekDay = (day) => {
        switch (day.getDay()) {
            case 0:
                return 'Sunday'
            case 1:
                return 'Monday'
            case 2:
                return 'Tuesday'
            case 3:
                return 'Wednesday'
            case 4:
                return 'Thursday'
            case 5:
                return 'Friday'
            case 6:
                return 'Saturday'
            default:
                return

        }
    }

    const getMonth = (month) => {
        switch (month.getMonth()) {
            case 0:
                return 'January'
            case 1:
                return 'Februrary'
            case 2:
                return 'March'
            case 3:
                return 'April'
            case 4:
                return 'May'
            case 5:
                return 'June'
            case 6:
                return 'July'
            case 7:
                return 'August'
            case 8:
                return 'September'
            case 9:
                return 'October'
            case 10:
                return 'November'
            case 11:
                return 'December'
            default:
                return

        }
    }

    const getTime = (time) => {
        let hour = new Date(time.time).getHours()
        let morningOrNight = 'AM'
        if (hour > 11) {
            morningOrNight = 'PM'
            hour = hour - 12
        }
        if (hour === 0) {
            hour = 12
        }
        return `${hour}:00 ${morningOrNight}`

    }

    const getDate = (date) => {
        const selectedDate = new Date(date)
        return `${getWeekDay(selectedDate)}, ${getMonth(selectedDate)} ${selectedDate.getDate()}`
    }

    const timeCompare = () => {
       const currentHour = new Date(setLocation.location.localtime).getHours()
       return [...forecastToday.hour, ...setLocation.forecast.forecastday[1].hour].filter(hour => {
        return currentHour <= new Date(hour.time).getHours()
    }).slice(0, 5)

    }
    return (
        <>
            {!forecastToday ?
                <Redirect to='/' />
                :
                <div className='fullReportCont'>
                    <div className='fullReportFlex'>

                        <div className='header'>
                            <h3>{getDate(setLocation.location.localtime)} <span className='tempType' onClick={() => { setTempType(tempType === 'F' ? 'C' : 'F') }}>º {tempType}</span></h3>
                        </div>
                        <div className='mainInfo'>
                            <div className='infoColumnLeft'>
                                <h4>{setLocation.location.name}</h4>
                                <span className='temp'>{tempType === 'F' ? setLocation.current.temp_f : setLocation.current.temp_c}º</span>
                                <div className='highLow'>
                                    <span className='high'> <FontAwesomeIcon icon={faChevronUp} /> {tempType === 'F' ? forecastToday.day.maxtemp_f : forecastToday.day.maxtemp_c}</span>
                                    <span className='low'><FontAwesomeIcon icon={faChevronDown} /> {tempType === 'F' ? forecastToday.day.mintemp_f : forecastToday.day.mintemp_c}</span>
                                </div>
                                <div className='description'>
                                    {forecastToday.day.condition.text}
                                </div>
                            </div>
                            <div className='divider'></div>
                            <div className='infoColumnRight'>
                                <div>
                                    <span>Sunrise</span>
                                    <span>{forecastToday.astro.sunrise}</span>
                                </div>
                                <div>
                                    <span>Sunset</span>
                                    <span>{forecastToday.astro.sunset}</span>
                                </div>
                                <div>
                                    <span>Precipitation</span>
                                    <span>{forecastToday.day.daily_chance_of_rain} %</span>
                                </div>
                                <div>
                                    <span>Snow</span>
                                    <span>{forecastToday.day.daily_chance_of_snow} %</span>
                                </div>
                                <div>
                                    <span>Humidity</span>
                                    <span>{forecastToday.day.avghumidity} %</span>
                                </div>
                                <div>
                                    <span>Wind MPH</span>
                                    <span>{forecastToday.day.maxwind_mph}</span>
                                </div>
                            </div>
                        </div>
                        <div className='hourly'>
                            {timeCompare().map((hour, i) => {
                                return (
                                    <div key={i}>
                                        <span>{getTime(hour)}</span>
                                        <span>{tempType === 'F' ? hour.temp_f : hour.temp_c} º</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='threeDay'>
                            {setLocation.forecast.forecastday.map((day, i) => {
                                return (
                                    <div key={i} className='row'>
                                        <span className='weekday'>{getWeekDay(new Date(day.date))}</span>
                                        <span className='icon'><img alt="weather icon" src={day.day.condition.icon} /></span>
                                        <div className='highLow'><span><FontAwesomeIcon icon={faChevronUp} /> {tempType === 'F' ? day.day.maxtemp_f : day.day.maxtemp_c}</span> <span><FontAwesomeIcon icon={faChevronDown} /> {tempType === 'F' ? day.day.mintemp_f : day.day.mintemp_c}</span></div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                </div>
            }

        </>
    )
}

export default connect(state => {
    return {
        setLocation: state.setLocation
    }
})(FullReport)