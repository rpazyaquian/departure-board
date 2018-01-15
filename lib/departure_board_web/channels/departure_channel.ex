defmodule DepartureBoardWeb.DepartureChannel do
  use Phoenix.Channel

  def join("departure:data", _message, socket) do
    # TODO: figure out how to do this in a more robust way
    # this needs to finish in order to completely open the socket
    # but i also want to call DepartureBoard.Fetcher.get_data as part of this
    Process.send_after(DepartureBoard.Fetcher, :get_data, :timer.seconds(3))
    {:ok, socket}
  end

  def update_data(data) do
    DepartureBoardWeb.Endpoint.broadcast(
      "departure:data",
      "update",
      %{data: data}
    )
  end
end
