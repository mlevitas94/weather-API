import React from 'react'
import '../Modal.scss'

const ModalMessage = () => {
    return (
        <div className='modalCont location'>
            <div className='infoFlex'>
                This site uses cookies to save selected search results on your browser for the next visit. <br />You may accept or decline the use of these cookies.
                <div>
                    <button onClick={() => { document.querySelector('.location').style.display = 'none'}}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default ModalMessage