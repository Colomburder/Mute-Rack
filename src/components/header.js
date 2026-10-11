import React, { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import Order from "./order";

const showOrders = (props) => {
  const summa = props.orders.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  return (
    <div>
      {props.orders.map((item) => (
        <Order
          key={item.id}
          item={item}
          onDelete={props.onDelete}
        />
      ))}

      <p className="summa">
        Total: {new Intl.NumberFormat("en-US").format(summa)}$
      </p>
    </div>
  );
};

const showNothing = () => (
  <div className="empty">
    <h2>Your cart is empty</h2>
    <p>Add a plugin to get started.</p>
  </div>
);

export default function Header(props) {
  const [cartOpen, setCartOpen] = useState(false);

  const orders = props.orders || [];

  return (
    <header>
      <div className="header-content">
        <a className="logo" href="#home" aria-label="Mute & Rack home">
          Mute&Rack
        </a>

        <nav aria-label="Main navigation">
          <ul className="nav">
            <li>
              <a href="#plugins">PLUGINS</a>
            </li>

            <li>
              <a href="#about">ABOUT US</a>
            </li>

            <li>
              <a href="#contact">CONTACT</a>
            </li>
          </ul>
        </nav>

        <FaShoppingBasket
          className={`shop-cart-button ${
            cartOpen ? "active" : ""
          }`}
          role="button"
          tabIndex={0}
          aria-label={cartOpen ? "Close cart" : "Open cart"}
          aria-expanded={cartOpen}
          onClick={() => setCartOpen((prev) => !prev)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setCartOpen((prev) => !prev);
            }
          }}
        />

        {cartOpen && (
          <div className="shop-cart">
            {orders.length > 0
              ? showOrders({
                  orders,
                  onDelete: props.onDelete,
                })
              : showNothing()}
          </div>
        )}
      </div>
    </header>
  );
}