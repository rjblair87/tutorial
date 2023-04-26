import React from 'react'
import "./Modal.css"

function Modal({closeModal}) {
  return (
    
    
    <div>
      <div className='modalContainer'>
      <button onClick={()=> closeModal(false)}> X </button>
      Make Payment
      <div>
        <button Click={()=> closeModal(false)}> Cancel </button>
        <button> Submit Payment </button>

      </div>
      </div>
      
    </div>  
  )
}

export default Modal