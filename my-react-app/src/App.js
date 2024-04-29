import React from 'react';
import Button from './components/Button/Button.js';

function App() {
    return (
        <div>
            <Button text="Je suis un bouton" onClick={() => console.log("Bouton cliqué !")} />
        </div>
    );
}

export default App;
