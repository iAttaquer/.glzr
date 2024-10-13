import React, {
  useState,
  useEffect,
} from 'https://esm.sh/react@18?dev';
import { createRoot } from 'https://esm.sh/react-dom@18/client?dev';
import * as zebar from 'https://esm.sh/zebar@2';

const providers = zebar.createProviderGroup({
  glazewm: { type: 'glazewm' },
  cpu: { type: 'cpu', refreshInterval: '2000' },
  memory: { type: 'memory', refreshInterval: '4000' },
  weather: { type: 'weather' },
  network: { type: 'network', refreshInterval: '2000' },
  battery: { type: 'battery', refreshInterval: '10000'},
  date: { type: 'date', formatting: 'HH:mm' },
});

createRoot(document.getElementById('root')).render(<App />);

function App() {
  const [output, setOutput] = useState(providers.outputMap);

  useEffect(() => {
    providers.onOutput(() => setOutput(providers.outputMap));
  }, []);

  // Change the color of the CPU bar based on usage.
  function getCpuUsageRate(cpuOutput) {
    if (cpuOutput.usage > 90) return 'extreme-usage';
    else if (cpuOutput.usage > 65) return 'high-usage';
    else if (cpuOutput.usage > 30) return 'medium-usage';
    else return 'low-usage';
  }

  // Change the color of the memory bar based on usage.
  function getMemoryUsageRate(memoryOutput) {
    if (memoryOutput.usage > 90) return 'extreme-usage';
    else if (memoryOutput.usage > 65) return 'high-usage';
    else if (memoryOutput.usage > 45) return 'medium-usage';
    else return 'low-usage';
  }

  // Get icon to show for current network status.
  function getNetworkIcon(networkOutput) {
    switch (networkOutput.defaultInterface?.type) {
      case 'ethernet':
        return <img src="./icons/icons8-wired-network-32.png" className="i-eth" width="20" height="20"></img>;
      case 'wifi':
        if (networkOutput.defaultGateway?.signalStrength >= 75) {
          return <img src="./icons/icons8-wifi-3-32.png" className="i-wifi" width="20" height="20"></img>;
        } else if (
          networkOutput.defaultGateway?.signalStrength >= 45
        ) {
          return <img src="./icons/icons8-wifi-2-32.png" className="i-wifi" width="20" height="20"></img>;
        } else if (
          networkOutput.defaultGateway?.signalStrength >= 5
        ) {
          return <img src="./icons/icons8-wifi-1-32.png" className="i-wifi" width="20" height="20"></img>;
        } else {
          return <img src="./icons/icons8-no-network-32.png" className="i-eth" width="20" height="20"></img>;
        }
      default:
        return (
          <img src="./icons/icons8-no-network-32.png" className="i-eth"  width="20" height="20"></img>
        );
    }
  }

  // Get icon to show for how much of the battery is charged.
  function getBatteryIcon(batteryOutput) {
    if (batteryOutput.state === 'full'){
      return <img src="./icons/icons8-battery-max-charged-32.png" width="20" height="20"></img>;
    } else if (batteryOutput.state === 'charging') {
      return <img src="./icons/icons8-battery-charging-32.png" width="20" height="20"></img>;
    } else if (batteryOutput.state === 'discharging') {
      if (batteryOutput.chargePercent > 90)
        return <img src="./icons/icons8-battery-4-32.png" width="20" height="20"></img>;
      if (batteryOutput.chargePercent > 70)
        return <img src="./icons/icons8-battery-3-32.png" width="20" height="20"></img>;
      if (batteryOutput.chargePercent > 45)
        return <img src="./icons/icons8-battery-2-32.png" width="20" height="20"></img>;
      if (batteryOutput.chargePercent > 15)
        return <img src="./icons/icons8-battery-1-32.png" width="20" height="20"></img>;
      return <img src="./icons/icons8-battery-32.png" width="20" height="20"></img>;
    }
  }

  // Change the color of the battery bar based on how much of the battery is charged.
  function getBatteryUsageRate(batteryOutput) {
    if (batteryOutput.chargePercent > 70)
      return 'low-usage';
    if (batteryOutput.chargePercent > 45)
      return 'medium-usage';
    if (batteryOutput.chargePercent > 15)
      return 'high-usage';
    return 'extreme-usage';
  }

  // Get icon to show for current weather status.
  function getWeatherIcon(weatherOutput) {
    switch (weatherOutput.status) {
      case 'clear_day':
        return <i className="nf nf-weather-day_sunny"></i>;
      case 'clear_night':
        return <i className="nf nf-weather-night_clear"></i>;
      case 'cloudy_day':
        return <i className="nf nf-weather-day_cloudy"></i>;
      case 'cloudy_night':
        return <i className="nf nf-weather-night_alt_cloudy"></i>;
      case 'light_rain_day':
        return <i className="nf nf-weather-day_sprinkle"></i>;
      case 'light_rain_night':
        return <i className="nf nf-weather-night_alt_sprinkle"></i>;
      case 'heavy_rain_day':
        return <i className="nf nf-weather-day_rain"></i>;
      case 'heavy_rain_night':
        return <i className="nf nf-weather-night_alt_rain"></i>;
      case 'snow_day':
        return <i className="nf nf-weather-day_snow"></i>;
      case 'snow_night':
        return <i className="nf nf-weather-night_alt_snow"></i>;
      case 'thunder_day':
        return <i className="nf nf-weather-day_lightning"></i>;
      case 'thunder_night':
        return <i className="nf nf-weather-night_alt_lightning"></i>;
    }
  }
  function getAppIcon(appName) {
    switch (appName) {
      case 'brave':
        return <img src="./icons/icons8-brave-32.png" className="app-icon"></img>;
      case 'Discord':
        return <img src="./icons/icons8-discord-new-32.png" className="app-icon"></img>;
      case 'explorer':
        return <img src="./icons/icons8-file-explorer-new-32.png" className="app-icon"></img>;
      case 'WindowsTerminal':
        return <img src="./icons/icons8-terminal-32.png" className="app-icon"></img>;
      case 'Code':
        return <img src="./icons/icons8-visual-studio-code-insides-32.png" className="app-icon"></img>;
      case 'devenv':
        return <img src="./icons/icons8-visual-studio-32.png" className="app-icon"></img>;
      case 'ApplicationFrameHost':
        return <img src="./icons/icons8-settings-32.png" className="app-icon"></img>;
      case 'Spotify':
        return <img src="./icons/icons8-spotify-32.png" className="app-icon"></img>;
      case 'msedgewebview2':
        return <img src="./icons/icons8-edge-32.png" className="app-icon"></img>;
      case 'steamwebhelper':
        return <img src="./icons/icons8-steam-32.png" className="app-icon"></img>;
      case 'Messenger':
        return <img src="./icons/icons8-facebook-messenger-32.png" className="app-icon"></img>;
      case 'SystemInformer':
        return <img src="./icons/systeminformer-32x32.png" className="app-icon"></img>;
      case 'MediBangPaintPro':
        return <img src="./icons/icons8-medibang-paint-32.png" className="app-icon"></img>;
      case 'Docker Desktop':
        return <img src="./icons/icons8-docker-32.png" className="app-icon"></img>;
      case 'obs64':
        return <img src="./icons/icons8-obs-32.png" className="app-icon"></img>;
      case 'sublime_text':
        return <img src="./icons/icons8-sublime-text-32.png" className="app-icon"></img>;
      case 'FanSpeedSetting':
        return <img src="./icons/icons8-fan-32.png" className="app-icon"></img>;
      case '7zFM':
        return <img src="./icons/icons8-7zip-32.png" className="app-icon"></img>;
      default:
        return <img src="./icons/icons8-application-32.png" className="app-icon"></img>;
    }
  }
  const IconApps = {
    process: <img src="./icons/icons8-application-32.png" className="app-icon"></img>,
    brave: <img src="./icons/icons8-brave-32.png" className="app-icon"></img>,
    Discord: <img src="./icons/icons8-discord-new-32.png" className="app-icon"></img>,
    explorer: <img src="./icons/icons8-file-explorer-new-32.png" className="app-icon"></img>,
    WindowsTerminal: <img src="./icons/icons8-terminal-32.png" className="app-icon"></img>,
    Code: <img src="./icons/icons8-visual-studio-code-insides-32.png" className="app-icon"></img>,
    devenv: <img src="./icons/icons8-visual-studio-32.png" className="app-icon"></img>,
    ApplicationFrameHost: <img src="./icons/icons8-settings-32.png" className="app-icon"></img>,
    Spotify: <img src="./icons/icons8-spotify-32.png" className="app-icon"></img>,
    msedgewebview2: <img src="./icons/icons8-edge-32.png" className="app-icon"></img>,
    steamwebhelper: <img src="./icons/icons8-steam-32.png" className="app-icon"></img>,
    Messenger: <img src="./icons/icons8-facebook-messenger-32.png" className="app-icon"></img>,
    SystemInformer: <img src="./icons/systeminformer-32x32.png" className="app-icon"></img>,
    MediBangPaintPro: <img src="./icons/icons8-medibang-paint-32.png" className="app-icon"></img>,
    "Docker Desktop": <img src="./icons/icons8-docker-32.png" className="app-icon"></img>,
    obs64: <img src="./icons/icons8-obs-32.png" className="app-icon"></img>,
    sublime_text: <img src="./icons/icons8-sublime-text-32.png" className="app-icon"></img>,
    FanSpeedSetting: <img src="./icons/icons8-fan-32.png" className="app-icon"></img>,
    "7zFM": <img src="./icons/icons8-7zip-32.png" className="app-icon" ></img>,
  };

  function renderChilds(child, index) {
    if (child.type === 'window') {
      return (
        <div className={`element ${child.hasFocus ? 'focus' : ''}`} key={index}>
          {getAppIcon(child.processName)}
        </div>
      );
    } else if (child.type === 'split') {
      return (
        <div key={`split-${index}`}>
          {child.children.map((subChild, subIndex) => 
            renderChilds(subChild, subIndex) // Używamy rekurencyjnie, przekazując subIndex jako key
          )}
        </div>
      );
    }
    return null;
  }


  return (
    <div className="app">
      <div className="left">
        <button className="logo"
          onClick={() => {
            output.glazewm.runCommand('shell-exec %userprofile%/.glzr/zebar/attaquer/scripts/OpenStartMenu.vbs')
          }}>
          <span className="content">
            
          </span>
        </button>
        <button className="search"
          onClick={() => {
            output.glazewm.runCommand('shell-exec %userprofile%/.glzr/zebar/attaquer/scripts/OpenWindowsSearch.ahk')
          }}>
          <span className="content">
            <img src="./icons/icons8-search-32.png" width="19" height="19"></img>
          </span>
        </button>
        {output.glazewm && (
          <>
            <div className="workspaces">
              {output.glazewm.currentWorkspaces.map(workspace => (
                <button
                  className={`workspace ${workspace.hasFocus && 'focused'} ${workspace.isDisplayed && 'displayed'}`}
                  onClick={() =>
                    output.glazewm.runCommand(
                      `focus --workspace ${workspace.name}`,
                    )
                  }
                  key={workspace.name}
                  id={workspace.name}
                >
                  <span className="workspace-icon">
                    {workspace.name === 'web'
                    ? <img src="./icons/icons8-brave-web-browser-32.png" alt="5" className="i-brave" height="16" width="16"></img>
                    : workspace.displayName ?? workspace.name}
                  </span>
                </button>
              ))}
            </div>
            <div className="template">
              <button
              className={`toggle-tiling-direction ${output.glazewm.tilingDirection === 'horizontal' ? 'horizontal' : 'vertical'}`}
              onClick={() =>
                output.glazewm.runCommand('toggle-tiling-direction')}>
                <span className="tiling-direction">
                  
                </span>
              </button>
            </div>
            <div className="template">
              {output.glazewm.bindingModes.map(bindingMode => (
                <span className="binding-mode">
                  {bindingMode.displayName ?? bindingMode.name}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="center">
        {/* {output.glazewm && (
          <>
          {output.glazewm.focusedWorkspace.children.map(
            (window) =>
            window.hasFocus && (
              <div className="current-window" key={window.id}>
                {window.title && (
                  window.title?.length > 90
                  ? window.title.slice(0, 90) + '...'
                  : window.title
                )}
              </div>
              )
            )}
          </>
        )} */}
        {output.glazewm && (
          output.glazewm.allWorkspaces.map((workspace) =>
            workspace.isDisplayed && (
              <div className="template" key={workspace.name}>
                {workspace.children.map((child, index) => (
                  renderChilds(child, index)
                ))}
              </div>
            )
          )
        )}
      </div>

      <div className="right">
        {output.cpu && (
            <button className={`cpu ${getCpuUsageRate(output.cpu)}`}
              onClick={() =>{
                output.glazewm.runCommand('shell-exec %ProgramFiles%/SystemInformer/SystemInformer.exe');
              }}>
                <span className="content">
                  <span className="i-cpu">
                    
                  </span>
                  <span className="cpu-bar">
                    {Math.round(output.cpu.usage)}%
                  </span>
                </span>
            </button>
        )}
        {output.memory && (
          <button className={`memory ${getMemoryUsageRate(output.memory)}`}
            onClick={() => {
              output.glazewm.runCommand('shell-exec %ProgramFiles%/Mem Reduct/memreduct.exe')
            }}>
              <span className="content">
                <span className="i"></span>
                <div className="labels">
                  <span className="label total">
                    <span>USED</span>
                    { Math.round(output.memory.usedMemory / 1024 / 1024 / 1024) }G
                  </span>
                  <span className="label total">
                    <span>TOT</span>
                    { Math.round(output.memory.totalMemory / 1024 / 1024 / 1024) }G
                  </span>
                </div>
                <span className="mem-bar"> {Math.round(output.memory.usage)}%</span>
              </span>
          </button>
        )}
        {output.weather && (
          <div className="template weather">
            {getWeatherIcon(output.weather)}
            {Math.round(output.weather.celsiusTemp)}°C
          </div>
        )}
        {output.network && (
          <button className="network"
            onClick={() => {
              output.glazewm.runCommand('shell-exec %userprofile%/.glzr/zebar/attaquer/scripts/OpenActionCenter.ahk');
            }}>
              <span className="content">
                {getNetworkIcon(output.network)}
                <div className="labels">
                  <span className="label">
                    <span className="ii"></span>
                    <span className="net-line">{ output.network.traffic.received.siValue } { output.network.traffic.received.siUnit }</span>
                  </span>
                  <span className="label">
                    <span className="ii"></span>
                    <span className="net-line">{ output.network.traffic.transmitted.siValue } { output.network.traffic.transmitted.siUnit }</span>
                  </span>
                </div>
              </span>
          </button>
        )}

        {output.battery && (
          <div className={`template battery ${getBatteryUsageRate(output.battery)}`}>
            {getBatteryIcon(output.battery)}
            {Math.round(output.battery.chargePercent)}%
          </div>
        )}

        {output.date && (
          <button className="date"
            onClick={() => {
              output.glazewm.runCommand('shell-exec explorer.exe ms-actioncenter://');
            }}>
            <span className="content">
              <img src="./icons/icons8-time-32.png" className="i-time" width="17" height="17"></img>
              <span className="time">{output.date?.formatted}</span>
            </span>
          </button>
        )}

      </div>
    </div>
  );
}