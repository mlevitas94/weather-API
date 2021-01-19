import React from 'react'
import { connect } from 'react-redux'
import './FullReport.scss'

const FullReport = () => {
    return (
        <div className='fullReportCont'>
            <div className='header'>
                <h3>Mon, July 6</h3>
                <div className='tempType'>C</div>
            </div>
            <div className='mainInfo'>
                <div className='infoColumnLeft'>
                    <h4>City</h4>
                    <span className='temp'>33 *</span>
                    <div className='highLow'>
                        <span className='high'>44</span>
                        <span className='low'>22</span>
                    </div>
                    <div className='description'>
                        Sunny
                    </div>
                </div>
            </div>
            <div className='hourly'>
                <div>
                    <span>Now</span>
                    <span>28 *</span>
                </div>
                <div>
                    <span>Now</span>
                    <span>28 *</span>
                </div>
                <div>
                    <span>Now</span>
                    <span>28 *</span>
                </div>
                <div>
                    <span>Now</span>
                    <span>28 *</span>
                </div>
                <div>
                    <span>Now</span>
                    <span>28 *</span>
                </div>
            </div>
            <div className='threeDay'>
                <div className='row'>
                    <span>Tuesday</span>
                    <span>%</span>
                    <div className='highLow'><span>44</span> <span>22</span></div>
                </div>
                <div className='row'>
                    <span>Tuesday</span>
                    <span>%</span>
                    <div className='highLow'><span>44</span> <span>22</span></div>
                </div>
                <div className='row'>
                    <span>Tuesday</span>
                    <span>%</span>
                    <div className='highLow'><span>44</span> <span>22</span></div>
                </div>
            </div>

        </div>
    )
}

export default connect()(FullReport)