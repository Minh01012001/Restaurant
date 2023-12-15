import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {ButtonGroup, Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
    const [cart, setCart] = useState([]);
    const [isLoading, setLoading] = useState(false);
    function add(id) {
        props.addItem(id)
    }

    function subtract(id) {
        props.subtractQuantity(id)
    }

    const getCart = async () => {
        await axios.get('http://localhost:5000/api/carts')
            .then(res => setCart(res.data.data))
    }

    useEffect(() => {
        if (!isLoading) getCart()
        setLoading(true)
    }, [isLoading])

    const handlePayment = (id) => {
        // navigate(`/client/src/components/Bill/Bill.js`);
    };
    return (
        <div>
            <div className="mt-4">
                <h1>CART</h1>
            </div>
            <div className="container">
            <table className="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '50px' }}>#</th>
                       
                            <th scope="col" style={{ width: '150px' }}>Name</th>
            
                            <th scope="col" style={{ width: '80px' }}>Type</th>
                            <th scope="col" style={{ width: '100px' }}>Price (vnd)</th>
                            <th scope="col" style={{ width: '20px' }}>Quantity</th>
                            <th scope="col" style={{ width: '150px' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={item.id}>
                                <td style={{ borderLeft: '1px solid #dee2e6', verticalAlign: 'middle' }}>{index + 1}</td>
                            
                                <td style={{ textAlign: 'left', borderLeft: '1px solid #dee2e6', verticalAlign: 'middle' }}>{item.name}</td>
                                
                                <td style={{ borderLeft: '1px solid #dee2e6', verticalAlign: 'middle' }}>{item.type}</td>
                                <td style={{ borderLeft: '1px solid #dee2e6', verticalAlign: 'middle' }}>{item.price}</td>
                              
                                <td style={{ borderLeft: '1px solid #dee2e6', borderRight: '1px solid #dee2e6', verticalAlign: 'middle' }}>
                                    <div className="counter" style={{ marginTop: 20, marginRight: 7 }}>
                                        <span className="quan">{item.quantity}</span>
                                        <ButtonGroup
                                            variant="none"
                                            size="10"
                                            sx={{
                                                border: 1,
                                            }}
                                            >
                                                <Button
                                                size="small"
                                                    sx={{width: 3}}
                                                    aria-label="increase"
                                                    onClick={() => {
                                                    add(item.id);
                                                    }}
                                                >
                                                    <AddIcon fontSize="5" />
                                                </Button>
                                                <Button
                                                size="small"
                                                sx={{width: 3}}
                                                    aria-label="reduce"
                                                    onClick={() => {
                                                    subtract(item.id);
                                                    }}
                                                >
                                                    <RemoveIcon fontSize="5" />
                                                </Button>
                                       </ButtonGroup>
                                    </div>
                                    
                                </td>
                                <td style={{ borderLeft: '1px solid #dee2e6', borderRight: '1px solid #dee2e6', verticalAlign: 'middle' }}>
                                    <div className="counter" style={{ marginTop: 20, marginRight: 7 }}>
                                        <span className="quan">{item.total}</span>
                                        
                                        
                                    </div>
                                    
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/bill">
                    <button className='btn btn-success' style={{ marginLeft: '10px' }} onClick={() => handlePayment()}>
                        Payment
                    </button>
                </Link>
            </div>
        </div>
    )
}


export default Cart