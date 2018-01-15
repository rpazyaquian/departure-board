# worker for fetching the data on a particular period of time

defmodule DepartureBoard.Fetcher do
  use GenServer

  def start_link do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init (_) do
    {:ok, %{data: get_data()}}
  end

  defp get_data(_) do
    case HTTPoison.get("http://developer.mbta.com/lib/gtrtfs/Departures.csv") do
        %{:ok, %HTTPoison.Response{body: body}} ->
          IO.puts body
          # TODO: call DepartureBoardWeb.DepartureChannel.update_data(data) with data
        %{:error, %HTTPoison.Error{reason: reason}} ->
          IO.inspect reason
    end

    Process.send_after(self(), :get_data, :timer.seconds(60 * 3))
  end

end
