import React from 'react';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      clicked: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log('this is a test');
    this.setState({
      clicked: !this.state.clicked
    });
  }

  render() {
    const hiddenPartUntilClick = this.state.clicked ? (
      <div>
        <h1>Hello World!</h1>
      </div>
    ) : null;

    return (
      <div>
        <button onClick={this.onClick}>Click here to toggle</button>
        {hiddenPartUntilClick}
      </div>
    );
  }
}

export default App;