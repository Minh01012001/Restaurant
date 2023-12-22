import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button, IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const router = useNavigate();

  const addToCart = async (id) => {
    await axios.post("http://localhost:5001/api/carts/create", {
      cart: {
        item_id: id,
      },
    });
    // window.location.reload();
  };

  const subtractToCart = async (id) => {
    await axios.delete(`http://localhost:5001/api/carts/delete/${id}`);
    // window.location.reload();
  };

  const groupByName = (data) => {
    const groupedItems = {};
    data.forEach((item) => {
      if (!groupedItems[item.name]) {
        groupedItems[item.name] = { ...item };
      } else {
        groupedItems[item.name].quantity += item.quantity;
      }
    });
    return Object.values(groupedItems);
  };

  const getCart = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/carts");
      const cartData = response.data.data;
      const groupedCart = groupByName(cartData);
      setCart(groupedCart);
      const totalValue = groupedCart.reduce((total, item) => {
        const itemTotal = item.price * item.quantity;
        return total + itemTotal;
      }, 0);
      setTotal(totalValue);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    if (!isLoading) getCart();
    setLoading(true);
  }, [isLoading]);

  const handlePayment = () => {
    router("/payment");
  };
  const tableValue = localStorage.getItem("table");
  return (
    <div>
      <div className="mt-4">
        <h1>CART / TABLE {tableValue}</h1>
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
                  }}
                >
                  {index + 1}
                </td>

                <td
                  style={{
                    textAlign: "left",
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  {item.name}
                </td>

                <td
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  {item.type}
                </td>
                <td
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  {item.price}
                </td>

                <td
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    borderRight: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <IconButton
                      size="small"
                      aria-label="increase"
                      onClick={() => {
                        addToCart(item.menu_id);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                    <Typography sx={{ fontSize: "18px" }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      aria-label="reduce"
                      onClick={() => {
                        subtractToCart(item.id);
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ backgroundColor: "#fff", color: "#000" }}>
          Total: {total} (vnd)
        </p>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/menu");
            }}
          >
            Back
          </Button>

          <Link to="/payment">
            <button
              className="btn btn-success"
              style={{ marginLeft: "10px" }}
              onClick={() => handlePayment()}
            >
              Payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
