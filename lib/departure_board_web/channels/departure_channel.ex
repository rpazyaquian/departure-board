defmodule DepartureBoardWeb.DepartureChannel do
  use Phoenix.Channel

  def join("departure:data", _message, socket) do
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
