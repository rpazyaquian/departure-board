import React, {Component} from "react"
import moment from "moment"

const DepartureItem = ({departure}) => {
  return (
    <tr>
      <td>{departure.origin}</td>
      <td>{departure.trip}</td>
      <td>{departure.destination}</td>
      <td>{moment.unix(departure.scheduled_time).format("h:mmA")}</td>
      <td>{departure.track}</td>
      <td>{departure.status}</td>
    </tr>
  )
}

export default DepartureItem
