import "./style.css";
import { Component } from "solid-js";
import { NetworkOutput } from "zebar";
import { GlazeWmOutput } from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";

interface NetworkStatusProps {
  network: NetworkOutput;
  glazewm: GlazeWmOutput | null;
}

const formatSpeed = (bytes: number): string => {
  const kb = bytes / 1024;
  if (kb >= 1024) {
    const mb = kb / 1024;
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb >= 100 ? Math.round(mb) : mb.toFixed(1)} MB`;
  }
  return `${Math.round(kb)} KB`;
};

const NetworkStatus: Component<NetworkStatusProps> = (props) => {
  const { isActive, handleClick } = useAnimatedClick();

  const handleOpenActionCenterClick = () => {
    handleClick();
    props.glazewm?.runCommand(
      "shell-exec %userprofile%/.glzr/zebar/attaquer-solid-ts/dist/topbar/assets/scripts/OpenActionCenter.ahk",
      // "shell-exec %userprofile%/AppData/Roaming/zebar/downloads/iattaquer.attaquer@2.0.0/dist/topbar/assets/scripts/OpenActionCenter.ahk",
    );
  };
  const getNetworkIcon = () => {
    switch (props.network.defaultInterface?.type) {
      case "ethernet":
        return (
          <img
            src="./assets/icons/icons8-wired-network-64.png"
            class="i-eth"
            width="20"
            height="20"
          ></img>
        );
      case "wifi":
        if ((props.network.defaultGateway?.signalStrength ?? 0) >= 75) {
          return (
            <img
              src="./assets/icons/icons8-wifi-3-32.png"
              class="i-wifi"
              width="20"
              height="20"
            ></img>
          );
        } else if ((props.network.defaultGateway?.signalStrength ?? 0) >= 45) {
          return (
            <img
              src="./assets/icons/icons8-wifi-2-32.png"
              class="i-wifi"
              width="20"
              height="20"
            ></img>
          );
        } else if ((props.network.defaultGateway?.signalStrength ?? 0) >= 5) {
          return (
            <img
              src="./assets/icons/icons8-wifi-1-32.png"
              class="i-wifi"
              width="20"
              height="20"
            ></img>
          );
        } else {
          return (
            <img
              src="./assets/icons/icons8-no-network-32.png"
              class="i-eth"
              width="20"
              height="20"
            ></img>
          );
        }
      default:
        return (
          <img
            src="./assets/icons/icons8-no-network-32.png"
            class="i-eth"
            width="20"
            height="20"
          ></img>
        );
    }
  };
  return (
    <button
      class={`network ${isActive() ? "clicked-animated" : ""}`}
      onClick={handleOpenActionCenterClick}
    >
      <span class="content">
        {getNetworkIcon()}
        <div class="labels">
          <span class="label">
            <span class="ii"></span>
            <span class="net-line">
              {formatSpeed(props.network?.traffic?.received.bytes ?? 0)}
            </span>
          </span>
          <span class="label">
            <span class="ii"></span>
            <span class="net-line">
              {formatSpeed(props.network?.traffic?.transmitted.bytes ?? 0)}
            </span>
          </span>
        </div>
      </span>
    </button>
  );
};

export default NetworkStatus;
