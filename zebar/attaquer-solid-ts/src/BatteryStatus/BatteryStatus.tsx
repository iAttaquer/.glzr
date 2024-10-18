import { Component } from "solid-js";
import { BatteryOutput } from "zebar";

interface BatteryStatusProps {
  battery: BatteryOutput;
}

const BatteryStatus: Component<BatteryStatusProps> = (props) => {
  const getBatteryIcon = () => {
    switch (props.battery?.state) {
      case "full":
        return (
          <img
            src="./assets/icons/icons8-battery-max-charged-32.png"
            class="i-battery"
            width="20"
            height="20"
          ></img>
        );
      case "charging":
        return (
          <img
            src="./assets/icons/icons8-battery-charging-32.png"
            class="i-battery"
            width="20"
            height="20"
          ></img>
        );
      case "discharging":
        if (props.battery.chargePercent > 90)
          return (
            <img
              src="./assets/icons/icons8-battery-4-32.png"
              class="i-battery"
              width="20"
              height="20"
            ></img>
          );
        if (props.battery.chargePercent > 70)
          return (
            <img
              src="./assets/icons/icons8-battery-3-32.png"
              class="i-battery"
              width="20"
              height="20"
            ></img>
          );
        if (props.battery.chargePercent > 40)
          return (
            <img
              src="./assets/icons/icons8-battery-2-32.png"
              class="i-battery"
              width="20"
              height="20"
            ></img>
          );
        if (props.battery.chargePercent > 15)
          return (
            <img
              src="./assets/icons/icons8-battery-1-32.png"
              class="i-battery"
              width="20"
              height="20"
            ></img>
          );
        return (
          <img
            src="./assets/icons/icons8-battery-32.png"
            class="i-battery"
            width="20"
            height="20"
          ></img>
        );
    }
  };
  const getBatteryUsageRate = (chargePercent: number) => {
    if (chargePercent > 70) return "low-usage";
    if (chargePercent > 40) return "medium-usage";
    if (chargePercent > 15) return "high-usage";
    return "extreme-usage";
  };
  return (
    <div
      classList={{
        template: true,
        battery: true,
        [getBatteryUsageRate(props.battery?.chargePercent)]: true,
      }}
    >
      {getBatteryIcon()}
      {Math.round(props.battery?.chargePercent)}%
    </div>
  );
};

export default BatteryStatus;