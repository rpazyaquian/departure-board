import React, {Component} from "react"
import _ from "lodash"
import DepartureItem from "./departureItem.js"

class DepartureTable extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>TimeStamp</th>
            <th>Origin</th>
            <th>Trip</th>
            <th>Destination</th>
            <th>Scheduled Time</th>
            <th>Lateness</th>
            <th>Track</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {_.map(this.props.departures, (departure) => <DepartureItem departure={departure} />)}
        </tbody>
      </table>
    )
  }
}

export default DepartureTable
