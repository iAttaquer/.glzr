import "./style.css";
import { Component } from "solid-js";
import { BatteryOutput } from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";

interface BatteryStatusProps {
  battery: BatteryOutput;
}

const RADIUS = 9;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const BatteryStatus: Component<BatteryStatusProps> = (props) => {
  const getBatteryUsageRate = (chargePercent: number) => {
    if (chargePercent > 70) return "low-usage";
    if (chargePercent > 40) return "medium-usage";
    if (chargePercent > 15) return "high-usage";
    return "extreme-usage";
  };

  const getBatteryIcon = () => {
    switch (props.battery?.state) {
      case "full":
        return <img src="./assets/icons/icons8-battery-max-charged-32.png" class="i-battery" width="16" height="16" />;
      case "charging":
        return <img src="./assets/icons/icons8-battery-charging-32.png" class="i-battery" width="16" height="16" />;
      case "discharging":
        if (props.battery.chargePercent > 90)
          return <img src="./assets/icons/icons8-battery-4-32.png" class="i-battery" width="16" height="16" />;
        if (props.battery.chargePercent > 70)
          return <img src="./assets/icons/icons8-battery-3-32.png" class="i-battery" width="16" height="16" />;
        if (props.battery.chargePercent > 40)
          return <img src="./assets/icons/icons8-battery-2-32.png" class="i-battery" width="16" height="16" />;
        if (props.battery.chargePercent > 15)
          return <img src="./assets/icons/icons8-battery-1-32.png" class="i-battery" width="16" height="16" />;
        return <img src="./assets/icons/icons8-battery-32.png" class="i-battery" width="16" height="16" />;
    }
  };

  const circleOffset = () => {
    const usage = Math.min(
      100,
      Math.max(0, Math.round(props.battery?.chargePercent) || 0),
    );
    return CIRCUMFERENCE * (1 - usage / 100);
  };

  const BatteryTime = () => {
    let result = "";
    if (props.battery?.state === "charging") {
      const hours = Math.trunc(props.battery?.timeTillFull / 3600000);
      if (hours) result += "Charging: " + hours + "h ";
      result +=
        Math.trunc((props.battery?.timeTillFull % 3600000) / 60000) +
        "min left";
    } else if (props.battery?.state === "discharging") {
      const hours = Math.trunc(props.battery?.timeTillEmpty / 3600000);
      if (hours) result += "Discharging: " + hours + "h ";
      result +=
        Math.trunc((props.battery?.timeTillEmpty % 3600000) / 60000) +
        "min left";
    } else {
      result += "idle";
    }
    return result;
  };

  const { isActive, handleClick } = useAnimatedClick();

  return (
    <button
      classList={{
        battery: true,
        [getBatteryUsageRate(props.battery?.chargePercent)]: true,
        "clicked-animated": isActive(),
      }}
      title={BatteryTime()}
      onClick={handleClick}
    >
      <span class="content">
        {getBatteryIcon()}
        <svg class="bat-ring" width="22" height="22" viewBox="0 0 22 22">
          <circle class="bat-ring-track" cx="11" cy="11" r={RADIUS} />
          <circle
            class="bat-ring-progress"
            cx="11"
            cy="11"
            r={RADIUS}
            transform="rotate(-90 11 11)"
            style={{
              "stroke-dasharray": `${CIRCUMFERENCE}`,
              "stroke-dashoffset": `${circleOffset()}`,
            }}
          />
          <text
            class="bat-ring-text"
            x="11"
            y="11"
            text-anchor="middle"
            dominant-baseline="central"
          >
            {Math.round(props.battery?.chargePercent)}
          </text>
        </svg>
      </span>
    </button>
  );
};

export default BatteryStatus;
