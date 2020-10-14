import React from 'react';
import { NavLink } from 'react-router-dom'

function Header(props){

    return (
        <div className='ui sidebar overlay left inverted visible'>  
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
        </div>
    )
}

export default Header