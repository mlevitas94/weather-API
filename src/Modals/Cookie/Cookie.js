import React from 'react'
import '../Modal.scss'

const Cookie = () => {
    const acceptCookies = () => {
        localStorage.setItem('recent', JSON.stringify([]))
        localStorage.setItem('saved', JSON.stringify([]))
        document.querySelector('.cookie').style.display = 'none'
    }
    return (
        <div className='modalCont cookie'>
            <div className='infoFlex'>
                This site uses cookies to save selected search results on your browser for the next visit. <br />You may accept or decline the use of these cookies.
                <div>
                    <button onClick={() => { acceptCookies() }}>Accept</button>
                    <button onClick={() => { document.querySelector('.cookie').style.display = 'none' }}>Decline</button>
                </div>
            </div>
        </div>
    )
}

export default Cookie