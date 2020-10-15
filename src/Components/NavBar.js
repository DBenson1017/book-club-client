import React from 'react';
import { NavLink } from 'react-router-dom'
import { Segment, Divider } from 'semantic-ui-css'

function NavBar() {
    return (
            <div classNames='App-header'>
            <NavLink to='/profile'>
                <span>Profile</span>
            </NavLink>
            <NavLink to='/search'>
                <span>Search</span>
            </NavLink>
            <NavLink to='/library'>
                <span>Library</span>
            </NavLink>
            <NavLink to='/users'>
                <span>Community</span>
            </NavLink>
            <NavLink to='/books'>
                <span>Community Books</span>
            </NavLink>
            </div>
    )

}

export default NavBar