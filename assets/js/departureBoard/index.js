import React, {Component} from "react"
import moment from "moment"

import DepartureTable from "./departureTable.js"

class DepartureBoard extends Component {
  constructor(props) {
    super(props)
    this.state = { departures: [], lastUpdated: null }
  }

  componentDidMount() {
    // once the component is ready, wire up the channel connection
    let channel = this.props.channel

    channel.on("update", (data) => {
      let updateTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
      this.setState({departures: data.data, lastUpdated: updateTime})
    })

    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })
  }

  render() {
    // NOTE: is there a nicer way to do this?
    return (
      <div>
        <h1>MBTA Departure Board</h1>
        {this.state.lastUpdated ? <h4> Last Updated: {this.state.lastUpdated} </h4> : ''}
        {this.state.departures.length < 1 ? "Loading data..." : <DepartureTable departures={this.state.departures} />}
      </div>
    )
  }
}

export default DepartureBoard
