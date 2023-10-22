
import { useState } from 'react'
import './Contact.css'
import Nav from '../Nav/Nav'
import Sidebar from '../Sidebar/Sidebar'
import Product from '../Header/Product';
//import Fetchexceldata from '../Excel/Fetchexceldata';



function Contact() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
    return (
      <div className="Contact">
      
       <div className='grid-container'>
      <Nav OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <div className='fle'>
        
        <Product/>
      
      </div>
    </div>
  
      
      </div>
    );
  }
  
  export default Contact;
  