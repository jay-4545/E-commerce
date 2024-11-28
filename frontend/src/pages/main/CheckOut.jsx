import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CartItems from "../../components/main/checkout/CartItems";
import AddressForm from "../../components/main/checkout/AddressForm";

function CheckOut() {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const { cartItems } = useSelector((store) => {
    return store.cart;
  });

  const handleBuy = async (e) => {
    const orderItems = cartItems.map((product) => {
      return { product: product._id, qty: product.qty };
    });

    const shippingAddress = address;

    const result = await fetch("http://localhost:5000/orders", {
      method: "POST",
      body: JSON.stringify({ orderItems, shippingAddress }),
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await result.json();
  };

  return (
    <div className="flex flex-col gap-4">
      <Box>
        <CartItems />
      </Box>
      <Box>
        <AddressForm address={address} setAddress={setAddress} />
      </Box>
      <Button
        disabled={!cartItems.length}
        variant="contained"
        className="w-full block"
        LinkComponent={Link}
        onClick={handleBuy}
      >
        Proceed to Buy
      </Button>
    </div>
  );
}

export default CheckOut;
