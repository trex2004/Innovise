import React, { useEffect, useState } from 'react';
import './SideProfile.css';
import { NavBar } from './NavBar';

export function TopNavbar() {
    return(
        <>
        <div className='border d-flex justify-content-between'>
            <button>left</button>
            <button>right</button>
        </div>
        </>
    )
}

export default TopNavbar;
