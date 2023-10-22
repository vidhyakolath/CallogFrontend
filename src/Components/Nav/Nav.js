import React from 'react';
import 
 { BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import './Nav.css'
function Nav({OpenSidebar}) {
   return(
    <header className='header'>
    <div className='menu-icon'>
    <BsJustify className='icon' onClick={OpenSidebar}/>
    </div>
    <div className='header-left'>
        
    </div>
    <div className='header-right'>
        
        
        <BsFillEnvelopeFill className='icon'/>
        <BsPersonCircle className='icon'/>
    </div>
</header>
   )
  }
  
  export default Nav;
  