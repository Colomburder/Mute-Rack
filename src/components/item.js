import React from "react";

function Item({ item , onAdd}) {
  return (
    <div className="item">
      <img src={item.img} alt={item.title} />

      <h2>{item.title}</h2>

      <p>{item.desc}</p>

      <p>{item.category}</p>

      <p>${item.price}</p>

      <div className="add-to-cart" onClick={() => onAdd(item)}>+</div>
    </div>
  );
}

export default Item;