import React from 'react';
import './app-header.css';

const AppHeader = ({liked, allPosts}) =>{
    return (
        <div className="app-header d-flex">
            <h1>Marta Kozak</h1>
    <h2>{allPosts} items, {liked} likes</h2>
        </div>
    )
}

export default AppHeader;