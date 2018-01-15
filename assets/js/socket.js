import {Socket} from "phoenix"

const updateDepartureBoard = (data) => {
  console.log("update the departure board here")
  console.log(data)
}

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

let departureChannel = socket.channel("departure:data", {})
let departureBoard = document.querySelector('#departure-board')

departureChannel.on("update", (data) => updateDepartureBoard(data))

departureChannel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket
