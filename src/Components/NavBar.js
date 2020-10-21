import React from 'react';
import { NavLink } from 'react-router-dom'

class NavBar extends React.Component{

render(){

    return (
            <div id='header'>
            <NavLink to='/'>
                <span>Login/Logout</span>
            </NavLink>
            <NavLink to='/profile'>
                <span>Profile</span>
            </NavLink>
            <NavLink to='/search'>
                <span>Search</span>
            </NavLink>
            <NavLink to='/library'>
                <span>Library</span>
            </NavLink>
            <NavLink to='/recommendations'>
                <span>Recommendations</span>
            </NavLink>
            <NavLink to='/books'>
                <span>Community Books</span>
            </NavLink>
            </div>
    )
}

}

export default NavBar