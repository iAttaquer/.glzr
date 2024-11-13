/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { createStore } from "solid-js/store";
import * as zebar from "zebar";
import WindowsButton from "./Buttons/WindowsButton";
import SearchButton from "./Buttons/SearchButton";
import Workspaces from "./Workspaces/Workspaces";
import TilingBinding from "./TilingBinding/TilingBinding";
import WindowTitle from "./WindowTitle/WindowTitle";
import CurrentApps from "./CurrentApps/CurrentApps";
import SpotifyStatus from "./Spotify/SpotifyStatus";
import CpuStatus from "./CpuStatus/CpuStatus";
import MemoryStatus from "./MemoryStatus/MemoryStatus";
import WeatherStatus from "./WeatherStatus/WeatherStatus";
import NetworkStatus from "./NetworkStatus/NetworkStatus";
import BatteryStatus from "./BatteryStatus/BatteryStatus";
import TimeStatus from "./Time/TimeStatus";
import { AppProvider } from "./AppContext";
import Bateria from "./Batterynew/bateria";

const providers = zebar.createProviderGroup({
  glazewm: { type: "glazewm" },
  cpu: { type: "cpu", refreshInterval: 2000 },
  memory: { type: "memory", refreshInterval: 4000 },
  weather: { type: "weather", latitude: 50, longitude: 22 },
  network: { type: "network", refreshInterval: 2000 },
  battery: { type: "battery", refreshInterval: 10000 },
  date: { type: "date", formatting: "HH:mm" },
});

render(() => <App />, document.getElementById("root")!);

function App() {
  const [output, setOutput] = createStore(providers.outputMap);

  providers.onOutput((outputMap) => setOutput(outputMap));

  return (
    <AppProvider>
    <div class="app">
      <div class="left">
        <WindowsButton glazewm={output.glazewm} />
        <SearchButton glazewm={output.glazewm} />
        <Workspaces glazewm={output.glazewm} />
        <TilingBinding glazewm={output.glazewm} />
      </div>
      <div class="center">
        <CurrentApps glazewm={output.glazewm} />
      </div>
      <div class="right">
        <SpotifyStatus />
        <CpuStatus cpu={output.cpu} glazewm={output.glazewm} />
        <MemoryStatus memory={output.memory} glazewm={output.glazewm} />
        {output.weather && <WeatherStatus weather={output.weather} />}
        <NetworkStatus network={output.network} glazewm={output.glazewm} />
        <BatteryStatus battery={output.battery} />
        <TimeStatus date={output.date} glazewm={output.glazewm} />
      </div>
    </div>
    </AppProvider>
  );
}
