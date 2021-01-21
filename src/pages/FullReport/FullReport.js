import React from 'react'
import { connect } from 'react-redux'
import './FullReport.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'

const FullReport = (props) => {
    const { setLocation } = props
    const forecastToday = !setLocation ? null : setLocation.forecast.forecastday[0]

    const getWeekDay = (day) => {
        switch (new Date(day.date).getDay()) {
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

    const getTime = (time) => {
        let hour = new Date(time.time_epoch * 1000).getHours()
        let morningOrNight = 'AM'
        if(hour > 11){
            morningOrNight = 'PM'
            hour = hour - 12
        }
        if(hour === 0){
            hour = 12
        }
        return `${hour}:00 ${morningOrNight}`

    }
    return (
        <>
            {!forecastToday ?
                <Redirect to='/' />
                :
                <div className='fullReportCont'>
                    <div className='fullReportFlex'>

                        <div className='header'>
                            <h3>Mon, July 6 <span className='tempType'>º F</span></h3>
                        </div>
                        <div className='mainInfo'>
                            <div className='infoColumnLeft'>
                                <h4>{setLocation.location.name}</h4>
                                <span className='temp'>{setLocation.current.temp_f}º</span>
                                <div className='highLow'>
                                    <span className='high'> <FontAwesomeIcon icon={faChevronUp} /> {forecastToday.day.maxtemp_f}</span>
                                    <span className='low'><FontAwesomeIcon icon={faChevronDown} /> {forecastToday.day.mintemp_f}</span>
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
                            {forecastToday.hour.filter((hour, i) => {
                                return setLocation.current.last_updated_epoch <= hour.time_epoch       
                            }).slice(0,5).map((hour, i) => {
                                return (
                                    <div key={i}>
                                        <span>{getTime(hour)}</span>
                                        <span>{hour.temp_f} º</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='threeDay'>
                            {setLocation.forecast.forecastday.map((day, i) => {
                                return (
                                    <div key={i} className='row'>
                                        <span className='weekday'>{getWeekDay(day)}</span>
                                        <span className='icon'><img alt="weather icon" src={day.day.condition.icon}/></span>
                                        <div className='highLow'><span><FontAwesomeIcon icon={faChevronUp} /> {day.day.maxtemp_f}</span> <span><FontAwesomeIcon icon={faChevronDown} /> {day.day.mintemp_f}</span></div>
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