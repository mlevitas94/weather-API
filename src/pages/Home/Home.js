import React from 'react'
import './Home.scss'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
const Home = (props) => {


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

    const getFullReport = (locationLatLong) => {
        const key = process.env.REACT_APP_KEY
        const options = {
            params: {
                key,
                q: locationLatLong,
                days: 3
            }
        }
        Axios.request(`http://api.weatherapi.com/v1/forecast.json`, options).then(res => {
            res.data.length === 0 ? props.setSelected([]) : props.setSelected(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const arrowNavigation = (e) => {
        if (e.keyCode === 38 || e.keyCode === 40) {
            const droppedDown = document.querySelectorAll('.bar');
            if (droppedDown) {
                let currentHighlight;
                droppedDown.forEach((bar, i) => {
                    if (bar.classList.contains('highlight')) {
                        currentHighlight = i;
                    }
                    bar.classList.remove('highlight')
                });
                if (!currentHighlight) {
                    droppedDown[0]?.classList.add('highlight')
                } else if (e.keyCode === 38) {
                    droppedDown[currentHighlight + 1].classList.add('highlight')
                } else if (e.keyCode === 40) {
                    droppedDown[currentHighlight - 1].classList.add('highlight')
                } else {
                    return
                }
            }
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
                            <div className='searchBar'>
                                <input maxLength="100" type='text'
                                    value={props.searcheQuery}
                                    onChange={(e) => { autoComplete(e) }}
                                    onKeyUp={(e) => { arrowNavigation(e) }}
                                    onBlur={(e) => {

                                        document.querySelector('.autoCompleteCont').style.display = 'none'
                                    }}
                                    onFocus={() => { document.querySelector('.autoCompleteCont').style.display = 'block' }} />
                                <div className='autoCompleteCont'>
                                    {
                                        props.searchedLocations.length === 0 && props.searchQuery.length > 2 ?
                                            <div>Loading</div>
                                            :
                                            props.searchedLocations?.map((location, i) => {
                                                return (
                                                    i > 4 ? null :
                                                        <div key={i} className='bar' onMouseDown={() => {
                                                            getFullReport(`${location.lat},${location.lon}`, location)
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
        setSelected: (data) => { dispatch({ type: 'SET_SELECTED', payload: data }) }
    }
}

export default connect(state => {
    return {
        searchedLocations: state.searchedLocations,
        searchQuery: state.searchQuery,
        setLocation: state.setLocation
    }
}, mapDispatchToProps)(Home)