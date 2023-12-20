import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

const Item = () => {
    const { name } = useParams();
    const [item, setItem] = useState({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const getItem = async () => {
                await axios.get(`http://localhost:5001/api/menu/${name}`)
                .then(res => setItem(res.data.data))
            
        };

        if (!isLoading) {
            getItem();
            setLoading(true);
        }
    }, [isLoading, name]);

    return (
        <div>
            <div key={item.id}>
                <h1>
                    <button className='btn btn-success'>{item.name}</button>
                    {item.description}
                    {item.imageURL}
                    {item.price}
                    {item.type}
                </h1>
            </div>
        </div>
    );
};

export default Item;