/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { createStore } from "solid-js/store";
import * as zebar from "zebar";

const providers = zebar.createProviderGroup({
  battery: { type: "battery", refreshInterval: 10000 },
});

render(() => <App />, document.getElementById("root")!);

function App() {
  const [output, setOutput] = createStore(providers.outputMap);

  providers.onOutput((outputMap) => setOutput(outputMap));

  const BatteryState = () => {
    if (output.battery?.state === 'discharging') {
      return ("On battery...");
    }
    else if (output.battery?.state === 'charging') {
      return (<>
        <span class="charging-icon">⚡️</span> Charging...
      </>);
    }
    else if (output.battery?.state === 'full') {
      return (<>
        <span class="charging-icon">⚡️</span> Fully charged
      </>);
    }
    else {
      return ("Unknown");
    }
  }
  const BatteryTime = () => {
    let result = ' • ';
    if (output.battery?.state === 'charging') {
      const hours = Math.trunc(output.battery?.timeTillFull / 3600000);
      if (hours) {
        result += hours + " h ";
      }
      result += Math.trunc(output.battery?.timeTillFull % 3600000 / 60000) + " min left"
    }
    else if (output.battery?.state === 'discharging') {
      const hours = Math.trunc(output.battery?.timeTillEmpty / 3600000);
      if (hours) {
        result += hours + " h ";
      }
      result += Math.trunc(output.battery?.timeTillEmpty % 3600000 / 60000) + " min left"
    }
    else {
      result += "idle";
    }
    return result;
  };
  const ProgressColor = () => {
    if (output.battery?.isCharging == true) return "charging";
    if (output.battery?.chargePercent > 70) return "full"
    if (output.battery?.chargePercent > 40) return "half";
    if (output.battery?.chargePercent > 15) return "low";
    return "very-low";
  };
  return (
    <div class="app">
      <div class="widget">
      <div class="charging-info">
        <span>{BatteryState()}</span>
        <span>
          {Math.round(output.battery?.chargePercent)}%
          {BatteryTime()}
        </span>
        <span><span class="health-icon"></span> • {Math.round(output.battery?.healthPercent)}%</span>
      </div>
      <div class="progress-labels">
        <span class="left">0</span>
        <span class="center">50</span>
        <span class="right">100</span>
      </div>
      <div class="progress-bar">
        <div class={`progress-fill ${ProgressColor()}`} style={{ width: `${output.battery?.chargePercent}%` }}></div>
      </div>
    </div>
    </div>
  );
}
