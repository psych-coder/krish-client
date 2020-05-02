import React from "react";

class Child extends React.Component {
  handleLangChange = () => {
      console.log("clicked");
    this.props.onSelectLanguage("gokul");
  };

  render() {
    return (
      <div>
        <button onClick={this.handleLangChange}>Lang</button>
      </div>
    );
  }
}

export default Child;
