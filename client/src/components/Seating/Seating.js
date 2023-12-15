import React from 'react'
import {ToggleButtonGroup, ToggleButton, Button} from '@mui/material'
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import {Badge} from '@mui/material';


const Seating = () => {
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

    return (
        <div className="container">
            <div className="d-flex align-items-center">
                <Header />

                <Link className="link user-seating" to="/user">
                    <Badge color="primary">
                        <span style={{ color: 'black' }}>Manage User</span>
                    </Badge>
                </Link>

                <Link className="link logout-seating" to="/">
                    <Badge color="primary">
                        <span style={{ color: 'black' }}>Logout</span>
                    </Badge>
                </Link>

        </div>
        <div className="d-flex justify-content-center align-items-center">
            <h3 className="black-text">Choose the table you want to order!</h3>
        </div>
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            className="container d-flex flex-wrap justify-content-center"
            style={{padding:20, marginBottom: 30}}
        >
            <ToggleButton size="large" value="web">1</ToggleButton>
            <ToggleButton value="android">2</ToggleButton>
            <ToggleButton value="ios">3</ToggleButton>
            <ToggleButton value="eb">4</ToggleButton>
            <ToggleButton value="anroi">5</ToggleButton>
            <ToggleButton value="is">6</ToggleButton>
            <ToggleButton value="wb">7</ToggleButton>
            <ToggleButton value="anroid">8</ToggleButton>
            <ToggleButton value="io">9</ToggleButton>
            <ToggleButton value="iof">10</ToggleButton>
        </ToggleButtonGroup>
        <Link to="/menu">
        <Button 
            fullWidth 
            disableElevation 
            variant="contained"
            className="continue-button"
            >CONTINUE</Button>
            </Link>
        </div>
    )
}

export default Seating