import React from 'react'
import {Link} from 'react-router';
import empty from '../images/empty-cart.png';
import './NoNotes.css';

const NoNotes = () => {
  return (
    <div className='nonotes'>
        <img src={empty} alt="Wow, such empty"/>
        <div className='emptytext'>No Notes yet</div>
        <Link className='crtnew' to='/create'>Create One !</Link>
    </div>
  )
}

export default NoNotes;