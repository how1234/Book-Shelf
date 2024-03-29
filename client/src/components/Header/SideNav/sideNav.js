import React from 'react'
import SideNav from 'react-simple-sidenav'
import SideNavItems from './sideNav_items'
 const Nav = (props) => {
     return (
         <SideNav
            showNav={props.showNav}
            onHideNav = {props.onHideNav}
            navStyle={{
                background:'#242424',
                maxWidth:'220px'
            }}
         >
             <SideNavItems></SideNavItems>
         </SideNav>
         
     ); 
 };

 export default Nav;