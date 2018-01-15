# worker for fetching the data on a particular period of time

defmodule DepartureBoard.Fetcher do
  use GenServer

  alias NimbleCSV.RFC4180, as: CSV

  def start_link do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init (_) do
    {:ok, %{data: get_data()}}
  end

  def handle_info(:get_data, state) do
    get_data()
    {:noreply, state}
  end

  defp get_data() do
    case HTTPoison.get("http://developer.mbta.com/lib/gtrtfs/Departures.csv") do
      {:ok, %HTTPoison.Response{body: body}} ->
        CSV.parse_stream body
        |> DepartureBoardWeb.DepartureChannel.update_data
      {:error, %HTTPoison.Error{reason: reason}} ->
        IO.inspect reason
    end

    Process.send_after(self(), :get_data, :timer.seconds(60 * 3))
  end
end
