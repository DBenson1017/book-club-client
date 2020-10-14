import React from 'react';
import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <ul>
            <NavLink to='/profile'>
                <li>Profile</li>
            </NavLink>
            <NavLink to='/search'>
                <li>Search</li>
            </NavLink>
            <NavLink to='/library'>
                <li>Library</li>
            </NavLink>
            <NavLink to='/users'>
                <li>Community</li>
            </NavLink>
            <NavLink to='/books'>
                <li>Community Books</li>
            </NavLink>
        </ul>
    )

}

export default NavBar