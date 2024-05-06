import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Header(props) {
    return (
        <div className='main-header'>
            <AppBar position='sticky' className='nav-bar'>
                <div className='nav-container'>
                    <img className='logo' src='https://images.squarespace-cdn.com/content/v1/650bf3ee96714871f4364ce8/77e20a8e-6555-4c3b-84fd-817f06fa88b6/PFC+Logo+-+High+Res..png?format=750w'/>
                    <h1 className='nav-heading'>PFC MarketPlace</h1>
                    <div className='nav-info'>
                        <AccountCircleIcon color="primary" fontSize="large" />
                        <span>Mantej Singh</span>
                    </div>

                </div>

            </AppBar>
        </div>
    );
}

export default Header;