# worker for fetching the data on a particular period of time

NimbleCSV.define(DepartureParser, separator: ",")

defmodule DepartureBoard.Fetcher do
  use GenServer

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
        body
        |> DepartureParser.parse_string
        |> Enum.map(fn [timestamp, origin, trip, destination, scheduled_time, lateness, track, status] ->
          %{timestamp: timestamp, origin: origin, trip: trip, destination: destination, scheduled_time: scheduled_time, lateness: lateness, track: track, status: status}
        end)
        |> DepartureBoardWeb.DepartureChannel.update_data
      {:error, %HTTPoison.Error{reason: reason}} ->
        IO.inspect reason
    end

    Process.send_after(self(), :get_data, (1000 * 60 * 3))  # 180 seconds / 3 min
  end
end
