import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";
import { Window } from "glazewm";

interface ApplicationProps {
  glazewm: GlazeWmOutput;
  window: Window;
}

const Application: Component<ApplicationProps> = (props) => {
  const IconApps = {
    process: (
      <img src="./assets/icons/icons8-application-32.png" class="app-icon" />
    ),
    brave: <img src="./assets/icons/icons8-brave-32.png" class="app-icon" />,
    Discord: (
      <img src="./assets/icons/icons8-discord-new-32.png" class="app-icon" />
    ),
    explorer: (
      <img
        src="./assets/icons/icons8-file-explorer-new-32.png"
        class="app-icon"
      />
    ),
    WindowsTerminal: (
      <img src="./assets/icons/icons8-terminal-32.png" class="app-icon" />
    ),
    zed: <img src="./assets/icons/zed.png" class="app-icon" />,
    Cursor: <img src="./assets/icons/cursor.png" class="app-icon" />,
    Code: (
      <img
        src="./assets/icons/icons8-visual-studio-code-insides-32.png"
        class="app-icon"
      />
    ),
    devenv: (
      <img src="./assets/icons/icons8-visual-studio-32.png" class="app-icon" />
    ),
    ApplicationFrameHost: (
      <img src="./assets/icons/icons8-settings-32.png" class="app-icon" />
    ),
    Spotify: (
      <img src="./assets/icons/icons8-spotify-32.png" class="app-icon" />
    ),
    msedgewebview2: (
      <img src="./assets/icons/icons8-edge-32.png" class="app-icon" />
    ),
    steamwebhelper: (
      <img src="./assets/icons/icons8-steam-32.png" class="app-icon" />
    ),
    Messenger: (
      <img
        src="./assets/icons/icons8-facebook-messenger-32.png"
        class="app-icon"
      />
    ),
    SystemInformer: (
      <img src="./assets/icons/systeminformer-32x32.png" class="app-icon" />
    ),
    MediBangPaintPro: (
      <img src="./assets/icons/icons8-medibang-paint-32.png" class="app-icon" />
    ),
    "Docker Desktop": (
      <img src="./assets/icons/icons8-docker-32.png" class="app-icon" />
    ),
    obs64: <img src="./assets/icons/icons8-obs-32.png" class="app-icon" />,
    sublime_text: (
      <img src="./assets/icons/icons8-sublime-text-32.png" class="app-icon" />
    ),
    FanSpeedSetting: (
      <img src="./assets/icons/icons8-fan-32.png" class="app-icon" />
    ),
    "7zFM": <img src="./assets/icons/icons8-7zip-32.png" class="app-icon" />,
    Obsidian: <img src="./assets/icons/Obsidian-32.png" class="app-icon" />,
    AutoHotkeyUX: (
      <img src="./assets/icons/AutoHotkeyUX-32.png" class="app-icon" />
    ),
    Signal: <img src="./assets/icons/Signal-32.png" class="app-icon" />,
    "Universal x86 Tuning Utility": (
      <img
        src="./assets/icons/Universal-x86-Tuning-Utility-32.png"
        class="app-icon"
      />
    ),
    windhawk: <img src="./assets/icons/windhawk-32.png" class="app-icon" />,
    VirtualBox: <img src="./assets/icons/VirtualBox-32.png" class="app-icon" />,
    vmware: (
      <img
        src="./assets/icons/VMware-Workstation-Pro-32.png"
        class="app-icon"
      />
    ),
    "Feather Launcher": (
      <img src="./assets/icons/Feather-Launcher-32.png" class="app-icon" />
    ),
    dnplayer: <img src="./assets/icons/LDPlayer-9-32.png" class="app-icon" />,
    Postman: <img src="./assets/icons/Postman-32.png" class="app-icon" />,
  };
  return (
    <button
      classList={{
        element: true,
        focus: props.window.hasFocus,
      }}
      onClick={() => {
        props.glazewm.runCommand(
          `shell-exec %userprofile%/.glzr/zebar/attaquer-solid-ts/dist/assets/scripts/FocusWindow.ahk ${props.window.handle}`,
        );
      }}
    >
      {IconApps[props.window.processName] ?? IconApps["process"]}
    </button>
  );
};

export default Application;
