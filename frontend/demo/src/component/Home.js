import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function Home() {
    return (
        <div className="App">
            <h2> Welocome to Our Website</h2>

            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Link to="/customer-registration">
                    <Button variant="outlined">Customer Registration</Button>
                </Link>
                <Link to="/admin-registration">
                    <Button variant="outlined">Admin Registration</Button>
                </Link>
            </div>
        </div>
    )
}

export default Home