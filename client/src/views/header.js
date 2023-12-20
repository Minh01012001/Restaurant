import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../img/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import axios from "axios";

const Header = () => {
  const tableValue = localStorage.getItem("table");
  const [lengthCart, lengthSetCart] = useState(0);
  const getCart = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/carts");
      lengthSetCart(response.data.data.length);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center">
            <a href="/">
              <img
                src={logo}
                alt="CMC"
                style={{ width: "150px", height: "auto", marginRight: "10px" }}
              />
            </a>
            <h1
              className="nav-item"
              style={{ color: "white", fontSize: "30px", margin: 0 }}>
              CMC Restaurant
            </h1>
          </div>

          <div>
            <Link className="btn btn-dark" to="/users">
              Users
            </Link>
            <Link className="btn btn-dark" to="/menu">
              Menu
            </Link>
            <Link className="btn btn-dark" to={`/cart/${tableValue}`}>
              <Badge badgeContent={lengthCart} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
