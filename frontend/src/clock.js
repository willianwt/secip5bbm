import React from 'react';


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString(),
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    clearInterval(this.intervalID);
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleString(),
    });
  }


  render() {
    const { time } = this.state;
    return (
      <p className="App-clock">
        The time is
        {' '}
        { time }
.
      </p>
    );
  }
}
export default Clock;
