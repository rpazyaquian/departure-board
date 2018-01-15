import React, {Component} from "react"

const DepartureItem = ({departure}) => {
  return (
    <tr>
      <td>{departure.timestamp}</td>
      <td>{departure.origin}</td>
      <td>{departure.trip}</td>
      <td>{departure.destination}</td>
      <td>{departure.scheduled_time}</td>
      <td>{departure.lateness}</td>
      <td>{departure.track}</td>
      <td>{departure.status}</td>
    </tr>
  )
}

export default DepartureItem
