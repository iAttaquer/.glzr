import "./style.css";
import { Component } from "solid-js";
import { NetworkOutput } from "zebar";
import { GlazeWmOutput } from "zebar";

interface NetworkStatusProps {
  network: NetworkOutput;
  glazewm: GlazeWmOutput;
}

const NetworkStatus: Component<NetworkStatusProps> = (props) => {
  const getNetworkIcon = () => {
    switch (props.network?.defaultInterface.type) {
      case "ethernet":
        return (
          <img
            src="./assets/icons/icons8-wired-network-32.png"
            class="i-eth"
            width="20"
            height="20"
          ></img>
        );
      case "wifi":
        if (props.network.defaultGateway?.signalStrength >= 75) {
          return (
            <img
              src="./assets/icons/icons8-wifi-3-32.png"
              class="i-wifi"
              width="20"
              height="20"
            ></img>
          );
        } else if (props.network.defaultGateway?.signalStrength >= 45) {
          return (
            <img
              src="./assets/icons/icons8-wifi-2-32.png"
              class="i-wifi"
              width="20"
              height="20"
            ></img>
          );
        } else if (props.network.defaultGateway?.signalStrength >= 5) {
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
      class="network"
      onClick={() => {
        props.glazewm.runCommand(
          "shell-exec %userprofile%/.glzr/zebar/attaquer-solid-ts/dist/assets/scripts/OpenActionCenter.ahk"
        );
      }}
    >
      <span class="content">
        {getNetworkIcon()}
        <div class="labels">
          <span class="label">
            <span class="ii"></span>
            <span class="net-line">
              {props.network?.traffic.received.siValue}{" "}
              {props.network?.traffic.received.siUnit}
            </span>
          </span>
          <span class="label">
            <span class="ii"></span>
            <span class="net-line">
              {props.network?.traffic.transmitted.siValue}{" "}
              {props.network?.traffic.transmitted.siUnit}
            </span>
          </span>
        </div>
      </span>
    </button>
  );
};

export default NetworkStatus;
