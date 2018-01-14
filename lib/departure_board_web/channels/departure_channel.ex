defmodule HelloWeb.DepartureChannel do
  use Phoenix.Channel

  def join("departure:data", _message, socket) do
    {:ok, socket}
  end
end
