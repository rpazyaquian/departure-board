import React, {Component} from "react"

import DepartureTable from "./departureTable.js"

class DepartureBoard extends Component {
  constructor(props) {
    super(props)
    this.state = { departures: [] }
  }

  componentDidMount() {
    // once the component is ready, wire up the channel connection
    let channel = this.props.channel

    channel.on("update", (data) => {
      this.setState({departures: data.data})
    })

    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })
  }

  render() {
    // NOTE: is there a nicer way to do this?
    return (
      <div>
        {this.state.departures.length < 1 ? "Loading data..." : <DepartureTable departures={this.state.departures} />}
      </div>
    )
  }
}

export default DepartureBoard
