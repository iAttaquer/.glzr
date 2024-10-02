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
    memory: { type: 'memory', refreshInterval: '3000' },
    weather: { type: 'weather' },
  });

  createRoot(document.getElementById('root')).render(<App />);

  function App() {
    const [output, setOutput] = useState(providers.outputMap);

    useEffect(() => {
      providers.onOutput(() => setOutput(providers.outputMap));
    }, []);

    // Get icon to show for current network status.
    function getNetworkIcon(networkOutput) {
      switch (networkOutput.defaultInterface?.type) {
        case 'ethernet':
          return <i className="nf nf-md-ethernet_cable"></i>;
        case 'wifi':
          if (networkOutput.defaultGateway?.signalStrength >= 80) {
            return <i className="nf nf-md-wifi_strength_4"></i>;
          } else if (
            networkOutput.defaultGateway?.signalStrength >= 65
          ) {
            return <i className="nf nf-md-wifi_strength_3"></i>;
          } else if (
            networkOutput.defaultGateway?.signalStrength >= 40
          ) {
            return <i className="nf nf-md-wifi_strength_2"></i>;
          } else if (
            networkOutput.defaultGateway?.signalStrength >= 25
          ) {
            return <i className="nf nf-md-wifi_strength_1"></i>;
          } else {
            return <i className="nf nf-md-wifi_strength_outline"></i>;
          }
        default:
          return (
            <i className="nf nf-md-wifi_strength_off_outline"></i>
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
            
          {output.date?.formatted}
          {output.network && (
            <div className="network">
              {getNetworkIcon(output.network)}
              {output.network.defaultGateway?.ssid}
            </div>
          )}

          {output.memory && (
            <div className="memory">
              <i className="nf nf-fae-chip"></i>
              {Math.round(output.memory.usage)}%
            </div>
          )}

          {output.cpu && (
            <div className="cpu">
              <i className="nf nf-oct-cpu"></i>

              {/* Change the text color if the CPU usage is high. */}
              <span
                className={output.cpu.usage > 85 ? 'high-usage' : ''}
              >
                {Math.round(output.cpu.usage)}%
              </span>
            </div>
          )}

          {output.battery && (
            <div className="battery">
              {/* Show icon for whether battery is charging. */}
              {output.battery.isCharging && (
                <i className="nf nf-md-power_plug charging-icon"></i>
              )}
              {getBatteryIcon(output.battery)}
              {Math.round(output.battery.chargePercent)}%
            </div>
          )}

          {output.weather && (
            <div className="weather">
              {getWeatherIcon(output.weather)}
              {Math.round(output.weather.celsiusTemp)}°C
            </div>
          )}
        </div>
      </div>
    );
  }