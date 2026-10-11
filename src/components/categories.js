import React, { Component } from "react";

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [
        { key: "all", name: "All" },
        { key: "Dynamics & Drive", name: "Dynamics & Drive" },
        { key: "Time & Space", name: "Time & Space" },
        { key: "Modulation & Color", name: "Modulation & Color" },
        { key: "Mastering", name: "Mastering" },
      ],
    };
  }

  render() {
    return (
      <div className="categories">
        {this.state.categories.map((category) => (
          <div
            className="category"
            key={category.key}
            role="button"
            tabIndex={0}
            onClick={() => this.props.chooseCategory(category.key)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                this.props.chooseCategory(category.key);
              }
            }}
          >
            {category.name}
          </div>
        ))}
      </div>
    );
  }
}

export default Categories;