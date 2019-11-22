import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <nav class="navbar  navbar navbar-expand-md navbar-dark bg-standard">
            <a className="navbar-brand" href="/">Manager Game</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
                <ul class="navbar-nav d-flex justify-content-between">
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link text-light">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/games'} className="nav-link text-light">Games</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to={'/teams'} className="nav-link text-light">Teams</Link>
                        </li>
                </ul>
                <Link className="link-new-game mx-5" to={'/new_game'}>NEW GAME </Link>
            </div>
        </nav>
    )
}
 
export default Header;