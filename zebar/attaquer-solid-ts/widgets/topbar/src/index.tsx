/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { Show } from "solid-js";
import { createStore } from "solid-js/store";
import * as zebar from "zebar";
import WindowsButton from "./Buttons/WindowsButton";
import SearchButton from "./Buttons/SearchButton";
import Workspaces from "./Workspaces/Workspaces";
import TilingBinding from "./TilingBinding/TilingBinding";
import WindowTitle from "./WindowTitle/WindowTitle";
import CurrentApps from "./CurrentApps/CurrentApps";
import VolumeStatus from "./VolumeStatus/VolumeStatus";
import MediaStatus from "./Media/MediaStatus";
import CpuStatus from "./CpuStatus/CpuStatus";
import MemoryStatus from "./MemoryStatus/MemoryStatus";
import WeatherStatus from "./WeatherStatus/WeatherStatus";
import NetworkStatus from "./NetworkStatus/NetworkStatus";
import BatteryStatus from "./BatteryStatus/BatteryStatus";
import TimeStatus from "./Time/TimeStatus";
import Systray from "./Systray/Systray";
import KeyboardStatus from "./KeyboardStatus/KeyboardStatus";

const providers = zebar.createProviderGroup({
  glazewm: { type: "glazewm" },
  cpu: { type: "cpu", refreshInterval: 5000 },
  memory: { type: "memory", refreshInterval: 5000 },
  weather: { type: "weather" },
  network: { type: "network", refreshInterval: 2000 },
  battery: { type: "battery", refreshInterval: 10000 },
  date: { type: "date", formatting: "HH:mm ccc d LLLL y" },
  media: { type: "media" },
  audio: { type: "audio" },
  systray: { type: "systray" },
  keyboard: { type: "keyboard" },
});

render(() => <App />, document.getElementById("root")!);

function App() {
  const [output, setOutput] = createStore(providers.outputMap);

  providers.onOutput((outputMap) => setOutput(outputMap));

  return (
    <div class="app">
      <div class="left">
        <WindowsButton glazewm={output.glazewm} />
        <SearchButton glazewm={output.glazewm} />
        <Workspaces glazewm={output.glazewm} />
        <TilingBinding glazewm={output.glazewm} />
        <Show when={output.media}>
          {(media) => <MediaStatus media={media()} />}
        </Show>
      </div>
      <div class="center">
        <Show when={output.glazewm}>
          {(glazewm) => <CurrentApps glazewm={glazewm()} />}
        </Show>
      </div>
      <div class="right">
        <Show when={output.systray}>
          {(systray) => (
            <Systray systray={systray()} glazewm={output.glazewm} />
          )}
        </Show>
        <Show when={output.cpu}>
          {(cpu) => <CpuStatus cpu={cpu()} glazewm={output.glazewm} />}
        </Show>
        <Show when={output.memory}>
          {(memory) => <MemoryStatus memory={memory()} />}
        </Show>
        <Show when={output.weather}>
          {(weather) => <WeatherStatus weather={weather()} />}
        </Show>
        <Show when={output.network}>
          {(network) => (
            <NetworkStatus network={network()} glazewm={output.glazewm} />
          )}
        </Show>
        <Show when={output.keyboard}>
          {(keyboard) => <KeyboardStatus keyboard={keyboard()} />}
        </Show>
        <Show when={output.audio}>
          {(audio) => <VolumeStatus audio={audio()} glazewm={output.glazewm} />}
        </Show>
        <Show when={output.battery}>
          {(battery) => <BatteryStatus battery={battery()} />}
        </Show>
        <TimeStatus date={output.date} />
      </div>
    </div>
  );
}
