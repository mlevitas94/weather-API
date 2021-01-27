import React, { useEffect } from 'react'
import './Home.scss'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
const Home = (props) => {

    useEffect(() => {
        if (localStorage.getItem('recent') === null) {
            props.setRecents([])
        } else {
            const key = process.env.REACT_APP_KEY
            const recentsRequest = JSON.parse(localStorage.getItem('recent')).map(latLong => {
                const options = {
                    params: {
                        key,
                        q: latLong,
                    }
                }
                return Axios.request(`http://api.weatherapi.com/v1/current.json`, options)
            })
            Promise.all(recentsRequest).then(results => props.setRecents(results))
        }
    }, [])


    const autoComplete = (e) => {
        props.setSearchValue(e.target.value)
        if (e.target.value.length < 2) {
            return
        }
        const key = process.env.REACT_APP_KEY
        const options = {
            params: {
                key,
                q: e.target.value
            }
        }
        Axios.request(`http://api.weatherapi.com/v1/search.json`, options).then(res => {
            props.setSearchedLocations(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getFullReport = (location) => {
        const key = process.env.REACT_APP_KEY
        const options = {
            params: {
                key,
                q: `${location.lat},${location.lon}`,
                days: 3
            }
        }
        Axios.request(`http://api.weatherapi.com/v1/forecast.json`, options).then(res => {
            res.data.length === 0 ? props.setSelected([]) : props.setSelected(res.data)
            if (localStorage.getItem('recent') === null || localStorage.getItem('saved') === null) {
                return
            }

            let recents = JSON.parse(localStorage.getItem('recent'))
            if (recents.length === 5) {
                recents.pop()
            }

            localStorage.setItem('recent', JSON.stringify([`${location.lat},${location.lon}`, ...recents]))
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
                console.log(location.name, document.querySelector('.highlight').innerHTML)
                if (location.name === document.querySelector('.highlight').innerText) {
                    getFullReport(location)
                }
            });
        }

    }
    return (
        <>
            {
                !props.setLocation
                    ?
                    <div className='homeCont'>
                        <div className='middleFlex'>
                            <h1>Weather API</h1>
                            <div className='recents'>
                                {
                                    props.recents === null
                                        ?
                                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                        :
                                        props.recents.map((recent, i )=> {
                                            console.log(recent)
                                            return(
                                                <div key={i} className='recentCont' onClick={() => {getFullReport(recent.data.location)}}>
                                                    <span className='name'>{recent.data.location.name}</span>
                                                    <img alt='weather icon' src={recent.data.current.condition.icon}/>
                                                    <span>{recent.data.current.temp_f} º F</span>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                            <div className='searchBar'>
                                <input maxLength="100" type='text' placeholder="Enter ZIP or name"
                                    value={props.searcheQuery}
                                    onChange={(e) => { autoComplete(e) }}
                                    onKeyUp={(e) => { arrowNavigation(e) }}
                                    onBlur={() => { document.querySelector('.autoCompleteCont').style.display = 'none' }}
                                    onFocus={() => { document.querySelector('.autoCompleteCont').style.display = 'block' }} />
                                <div className='autoCompleteCont'>
                                    {
                                        props.searchedLocations.length === 0 && props.searchQuery.length > 2 ?
                                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
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
                        </div>
                    </div>
                    :
                    <Redirect to={`/${props.setLocation.location.name}`} />
            }

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