import React from "react";

interface HomeState {
  response: string;
}

interface HomeProps {}

export class Home extends React.Component<HomeProps, HomeState> {
  constructor(homeProps: HomeProps) {
    super(homeProps);
    this.state = {} as HomeState;
  }

  async componentDidMount() {
    let jsonResponse = "";

    try {
      const response = await fetch(`http://192.168.0.171:4000/api/invoices/1`);
      jsonResponse = await response.json();
      this.setState({ response: JSON.stringify(jsonResponse) });
    } catch (e) {
      this.setState({ response: "Error calling the API" });
    }
  }

  render() {
    return (
      <div>
        <p>{this.state.response}</p>
      </div>
    );
  }
}
