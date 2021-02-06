import React, { useEffect, useState } from 'react'
import './Home.scss'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import ModalMessage from '../../Modals/modalMessage/ModalMessage'
import functions from '../../functions/functions'
const Home = (props) => {

    const [modal, setModal] = useState(null)


    useEffect(() => {
        props.setSelected(null)
        if (localStorage.getItem('recent') === null) {
            props.setRecents([])
        } else {
            const key = process.env.REACT_APP_KEY
            const recentsRequest = JSON.parse(localStorage.getItem('recent')).map(loca => {
                const options = {
                    params: {
                        key,
                        q: loca.latLong,
                    }
                }
                return Axios.request(`https://api.weatherapi.com/v1/current.json`, options)
            })
            Promise.all(recentsRequest).then(results => props.setRecents(results))
        }
    }, [])


    const autoComplete = (e) => {
        props.setSearchValue(e.target.value)
        if (e.target.value.length < 3) {
            return props.setSearchedLocations([])
        }
        const key = process.env.REACT_APP_KEY
        const options = {
            params: {
                key,
                q: e.target.value
            }
        }
        Axios.request(`https://api.weatherapi.com/v1/search.json`, options).then(res => {
            if (res.data.length === 0) {
                return props.setSearchedLocations(null)
            }
            props.setSearchedLocations(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getFullReport = (location) => {
        const key = process.env.REACT_APP_KEY
        props.setSelected('loading')
        props.setSearchValue('')
        props.setSearchedLocations([])
        const options = {
            params: {
                key,
                q: `${location.lat},${location.lon}`,
                days: 3
            }
        }
        Axios.request(`https://api.weatherapi.com/v1/forecast.json`, options).then(res => {
            res.data.length === 0 ? props.setSelected([]) : props.setSelected(res.data)
            if (localStorage.getItem('recent') === null || localStorage.getItem('saved') === null) {
                return
            }

            let recents = JSON.parse(localStorage.getItem('recent'))
            //compare by city name here from adding city name to each cookie item. bottom of this response
            if (recents.filter(loca => loca.name === res.data.location.name).length > 0) {
                return
            }

            if (recents.length === 4) {
                recents.pop()
            }
            //change to object which contains city name.
            localStorage.setItem('recent', JSON.stringify([{ name: res.data.location.name, latLong: `${location.lat},${location.lon}` }, ...recents]))
        }).catch(err => {
            console.log(err)
        })
    }

    const arrowNavigation = (e) => {
        if (e.keyCode === 38 || e.keyCode === 40) {
            const droppedDown = document.querySelectorAll('.bar');
            if (droppedDown) {
                let currentHighlight = 0;
                droppedDown.forEach((bar, i) => {
                    if (bar.classList.contains('highlight')) {
                        currentHighlight = i;
                    }
                    bar.classList.remove('highlight')
                });
                if (e.keyCode === 38) {
                    if (currentHighlight === 0) {
                        return droppedDown[droppedDown.length - 1].classList.add('highlight')
                    }
                    droppedDown[currentHighlight - 1].classList.add('highlight')
                } else if (e.keyCode === 40) {
                    if (currentHighlight === droppedDown.length - 1) {
                        return droppedDown[0].classList.add('highlight')
                    }
                    droppedDown[currentHighlight + 1].classList.add('highlight')
                } else {
                    return
                }
            }
        }
        if (e.keyCode === 13) {
            props.searchedLocations.forEach(location => {
                if (location.name === document.querySelector('.highlight').innerText) {
                    getFullReport(location)
                }
            });
        }

    }

    const showPosition = (positionResponse) => {
        if (positionResponse.code) {
            switch (positionResponse.code) {
                case 1:
                    setModal('off')
                    props.setSelected(null)
                    break;
                default:
                    setModal('error')
                    props.setSelected(null)
            }

        } else if (positionResponse.coords) {
            const location = {
                lat: positionResponse.coords.latitude,
                lon: positionResponse.coords.longitude
            }
            getFullReport(location)
        }
    }


    return (
        <>
            {
                !props.setLocation
                    ?
                    <div className='homeCont'>
                        <div className='middleFlex'>
                            <h1>ML Weather</h1>
                            <div className='searchBar'>
                                <input maxLength="100" type='text' placeholder="City or Zip"
                                    value={props.searcheQuery}
                                    onChange={(e) => { autoComplete(e) }}
                                    onKeyUp={(e) => { arrowNavigation(e) }}
                                    onBlur={() => { document.querySelector('.autoCompleteCont').style.display = 'none' }}
                                    onFocus={() => { document.querySelector('.autoCompleteCont').style.display = 'block' }} />
                                <button onClick={() => {
                                    props.setSelected('loading')
                                    navigator.geolocation.getCurrentPosition(showPosition, showPosition, {
                                        enableHighAccuracy: false,
                                        timeout: 10000,
                                    })
                                }}>
                                    <FontAwesomeIcon icon={faLocationArrow} />
                                </button>
                                <span className='credit'>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API" target='_blank' rel="noreferrer">WeatherAPI.com</a></span>
                                <div className='autoCompleteCont'>
                                    {
                                        props.searchedLocations === null ?
                                            <span className='noLocations'>Could not find any locations</span>
                                            :
                                            props.searchedLocations.length === 0 && props.searchQuery.length > 2 ?
                                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                                :
                                                props.searchedLocations?.map((location, i) => {
                                                    return (
                                                        i > 4 ? null :
                                                            <div key={i} className={`bar ${i === 0 ? 'highlight' : null}`} onMouseDown={() => {
                                                                getFullReport(location)
                                                            }}>
                                                                <span>{location.name}</span>
                                                            </div>
                                                    )
                                                })
                                    }

                                </div>
                            </div>
                            <div className='recents'>
                                {
                                    props.recents === null
                                        ?
                                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                        :
                                        props.recents.map((recent, i) => {
                                            return (
                                                <div key={i} className='recentCont' onClick={() => { getFullReport(recent.data.location) }}>
                                                    <span className='lastUpdated'>Last updated: {functions.lastUpdatedFormat(recent.data.current.last_updated)} <br/> </span>
                                                    <span className='name'>{recent.data.location.name}</span>
                                                    <img alt='weather icon' src={recent.data.current.condition.icon} />
                                                    <span>{recent.data.current.temp_f} º F</span>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        </div>
                    </div>
                    :
                    props.setLocation === 'loading'
                        ?
                        <div className="lds-ring fullReportLoader"><div></div><div></div><div></div><div></div></div>
                        :
                        <Redirect push to={`/${props.setLocation.location.name}`} />
            }
            { modal !== null ? <ModalMessage type={modal} setModal={setModal} /> : null}
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchValue: (value) => { dispatch({ type: 'SET_QUERY', payload: value }) },
        setSearchedLocations: (locations) => { dispatch({ type: 'SET_LOCATIONS', payload: locations }) },
        setSelected: (data) => { dispatch({ type: 'SET_SELECTED', payload: data }) },
        setRecents: (data) => { dispatch({ type: 'SET_RECENTS', payload: data }) }
    }
}

export default connect(state => {
    return {
        searchedLocations: state.searchedLocations,
        searchQuery: state.searchQuery,
        setLocation: state.setLocation,
        recents: state.recents
    }
}, mapDispatchToProps)(Home)