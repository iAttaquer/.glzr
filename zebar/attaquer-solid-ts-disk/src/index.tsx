/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { createStore } from "solid-js/store";
import * as zebar from "zebar";
import { For } from "solid-js";
import { DiskOutput } from "zebar";

const providers = zebar.createProviderGroup({
  disk: { type: "disk", refreshInterval: 10000 },
});

render(() => <App />, document.getElementById("root")!);

function App() {
  const [output, setOutput] = createStore(providers.outputMap);

  providers.onOutput((outputMap) => setOutput(outputMap));

  console.log(output.disk?.disks[0]);
  console.log(output.disk?.disks[1]);

  const DiskInfo = (disk: DiskOutput["disks"][0]) => {
    const DiskIcon = () => {
      if (disk.driveType === "HDD") {
        return (
          <img
            src="./assets/icons/icons8-hdd-32.png"
            width="20"
            height="20"
          ></img>
        );
      } else {
        return (
          <img
            src="./assets/icons/icons8-ssd-32.png"
            width="20"
            height="20"
          ></img>
        );
      }
    };
    return (
      <div class="disk">
        <span class="line">
          {DiskIcon()} 
          {disk.mountPoint}
        </span>
        <span>
          Free • 
          {Math.round(disk.availableSpace.siValue)} 
          {disk.availableSpace.siUnit}
        </span>
        <span>
          Total • 
          {Math.round(disk.totalSpace.siValue)} 
          {disk.totalSpace.siUnit}
        </span>
        <div class="progress-bar">
          <div class={`progress-fill`} style={{ width: `
            ${(disk.totalSpace.bytes - disk.availableSpace.bytes)/disk.totalSpace.bytes*100}%` }}></div>
        </div>
      </div>
    );
  };
  return (
    <div class="app">
      <div class="widget">
        <div class="disks-info">
          <For each={output.disk?.disks}>{(disk) => DiskInfo(disk)}</For>
        </div>
      </div>
    </div>
  );
}
