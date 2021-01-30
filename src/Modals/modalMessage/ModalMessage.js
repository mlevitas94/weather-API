import React from 'react'
import '../Modal.scss'

const ModalMessage = () => {
    return (
        <div className='modalCont location'>
            <div className='infoFlex'>
                Your location is turned off for this site. You can turn in back on by following these links :  <br />
                <a href="https://support.google.com/chrome/answer/142065?co=GENIE.Platform%3DDesktop&hl=en" target="_blank" rel="noreferrer">Google Chrome</a>
                <br/>
                <a href="https://support.apple.com/en-us/HT203033" target="_blank" rel="noreferrer"> Safari / Apple</a>
                <div>
                    <button onClick={() => { document.querySelector('.location').style.display = 'none'}}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default ModalMessage