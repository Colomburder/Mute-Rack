import React from "react";
import Item from "./item";

function Items({ items, onAdd }) {
  return (
    <main>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onAdd={onAdd}
        />
      ))}
    </main>
  );
}

export default Items;