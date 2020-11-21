import React, { Component } from "react";

class Properties extends Component {
  state = {
    loading: true
  };
  async componentDidMount() {
    const url = "all_properties";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.properties);
  }
  render() {
    return <div>All Properties</div>;
  }
}

export default Properties;