import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  ButtonGroup,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const router = useNavigate();
  const { _id } = useParams();

  const addItem = (id) => {
    const newCart = cart.map((cart) => {
      if (cart.id === id) {
        return { ...cart, quantity: cart.quantity + 1 };
      }
      return cart;
    });
    setCart(newCart);
  };

  const subtractItem = (id) => {
    const newCart = cart.map((cart) => {
      if (cart.id === id) {
        if (cart.quantity !== 0) {
          return { ...cart, quantity: cart.quantity - 1 };
        }
      }
      return cart;
    });
    setCart(newCart);
  };

  const getCart = async () => {
    await axios
      .get("http://localhost:5000/api/carts")
      .then((res) => setCart(res.data.data))
      .catch(() => {
        console.log("err");
      });
  };

  useEffect(() => {
    if (!isLoading) getCart();
    setLoading(true);
  }, [isLoading]);

  const handlePayment = () => {
    router("/payment");
  };
  return (
    <div>
      <div className="mt-4">
        <h1>CART / {_id}</h1>
      </div>
      <div className="container">
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col" style={{ width: "50px" }}>
                #
              </th>

              <th scope="col" style={{ width: "150px" }}>
                Name
              </th>

              <th scope="col" style={{ width: "80px" }}>
                Type
              </th>
              <th scope="col" style={{ width: "100px" }}>
                Price (vnd)
              </th>
              <th scope="col" style={{ width: "20px" }}>
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}>
                  {index + 1}
                </td>

                <td
                  style={{
                    textAlign: "left",
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}>
                  {item.name}
                </td>

                <td
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}>
                  {item.type}
                </td>
                <td
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}>
                  {item.price}
                </td>

                <td
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    borderRight: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "16px",
                    }}>
                    <IconButton
                      size="small"
                      aria-label="increase"
                      onClick={() => {
                        addItem(item.id);
                      }}>
                      <AddIcon />
                    </IconButton>
                    <Typography sx={{ fontSize: "18px" }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      aria-label="reduce"
                      onClick={() => {
                        subtractItem(item.id);
                      }}>
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/payment">
          <button
            className="btn btn-success"
            style={{ marginLeft: "10px" }}
            onClick={() => handlePayment()}>
            Payment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
