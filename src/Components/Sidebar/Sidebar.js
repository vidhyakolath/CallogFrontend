import React from 'react'
import 
{ BsGrid1X2Fill, BsFillTelephoneFill,BsFillArchiveFill,BsArrowBarRight
  }
 from 'react-icons/bs'
 import './Sidebar.css'
 import { Link,useNavigate } from 'react-router-dom'

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const auth=localStorage.getItem('user');
    const Naigate=useNavigate();
    const LOgout=()=>{
        localStorage.clear();
        Naigate('/Signup');
    }
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsFillTelephoneFill  className='icon_header'/> Logo
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='icon'/> Total contacts
                </a>
            </li>
            <li className='sidebar-list-item'>
                
            <BsArrowBarRight className='icon'/>
                    { auth?<Link  onClick={LOgout} to="/Signup">Logout</Link>:
                    <Link to="/Signup"> Signup  </Link> }
                
            </li>
            
            
            
            
        </ul>
    </aside>
  )
}

export default Sidebar