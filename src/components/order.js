import React, { Component } from "react";
import { FaTrash } from "react-icons/fa";

class Order extends Component {
  render() {
    const { item, onDelete } = this.props;

    return (
      <div className="item">
        <img src={item.img} alt={item.title} />

        <h2>{item.title}</h2>

        <p>{item.category}</p>

        <p>${item.price}</p>

        <FaTrash
          className="delete-icon"
          onClick={() => onDelete(item.id)}
        />
      </div>
    );
  }
}

export default Order;