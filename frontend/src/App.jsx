import React from 'react';
import Popup from './components/Popup';
import BlockedPage from './components/BlockedPage';

const App = () => {
    // Determine which component to render based on the current page
    const isBlockedPage = window.location.pathname.includes('blocked');

    return (
        <div className="app">
            {isBlockedPage ? <BlockedPage /> : <Popup />}
        </div>
    );
};

export default App;
