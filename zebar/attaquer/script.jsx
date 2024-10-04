import React, {
    useState,
    useEffect,
  } from 'https://esm.sh/react@18?dev';
  import { createRoot } from 'https://esm.sh/react-dom@18/client?dev';
  import * as zebar from 'https://esm.sh/zebar@2';

  const providers = zebar.createProviderGroup({
    network: { type: 'network', refreshInterval: '2000' },
    glazewm: { type: 'glazewm' },
    cpu: { type: 'cpu', refreshInterval: '2000' },
    date: { type: 'date', formatting: 'EEE d MMM t' },
    battery: { type: 'battery' },
    memory: { type: 'memory', refreshInterval: '4000' },
    weather: { type: 'weather' },
  });

  createRoot(document.getElementById('root')).render(<App />);

  function App() {
    const [output, setOutput] = useState(providers.outputMap);

    useEffect(() => {
      providers.onOutput(() => setOutput(providers.outputMap));
    }, []);

    function getCpuUsageRate(cpuOutput) {
      if (cpuOutput.usage > 90) return 'extreme-usage';
      else if (cpuOutput.usage > 65) return 'high-usage';
      else if (cpuOutput.usage > 30) return 'medium-usage';
      else return 'low-usage';
    }
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
          return <img src="./icons/icons8-wired-network-32.png" className="i-wifi" width="20" height="20"></img>;
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
      if (batteryOutput.chargePercent > 90)
        return <i className="nf nf-fa-battery_4"></i>;
      if (batteryOutput.chargePercent > 70)
        return <i className="nf nf-fa-battery_3"></i>;
      if (batteryOutput.chargePercent > 40)
        return <i className="nf nf-fa-battery_2"></i>;
      if (batteryOutput.chargePercent > 20)
        return <i className="nf nf-fa-battery_1"></i>;
      return <i className="nf nf-fa-battery_0"></i>;
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


    return (
      <div className="app">
        <div className="left">
          <div className="template logo">
            
          </div>
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
                      {workspace.displayName ?? workspace.name}
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
          {output.glazewm && (
            <>
            {output.glazewm.focusedWorkspace.children.map(
              (window) =>
              window.hasFocus && (
                <div className="current-window" key={window.id}>
                  {window.title.length > 90
                    ? window.title.slice(0, 90) + '...'
                    : window.title}
                    </div>
                  ),
              )}
            </>
          )}
        </div>

        <div className="right">
          {output.cpu && (
              <button className={`${getCpuUsageRate(output.cpu)}`}
                onClick={() =>{
                  output.glazewm.runCommand('shell-exec %ProgramFiles%/SystemInformer/SystemInformer.exe');
                }}>
                <span className="i-cpu">
                  
                </span>
                <span className="cpu-bar">
                  {Math.round(output.cpu.usage)}%
                </span>
              </button>
          )}
          {output.memory && (
            <div className={`template memory ${getMemoryUsageRate(output.memory)}`}>
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
            </div>
          )}
          {output.weather && (
            <div className="template weather">
              {getWeatherIcon(output.weather)}
              {Math.round(output.weather.celsiusTemp)}°C
            </div>
          )}
          {output.network && (
            <div className="template network">
                {getNetworkIcon(output.network)}
                {output.network.defaultGateway?.ssid}
            </div>
          )}

          {output.battery && (
            <div className="template battery">

              {getBatteryIcon(output.battery)}
              {Math.round(output.battery.chargePercent)}%
              
            </div>
          )}

        </div>
      </div>
    );
  }