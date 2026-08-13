# attaquer

A minimal, dark top bar for **[GlazeWM](https://github.com/glzr-io/glazewm)** on Windows 11, built with SolidJS + TypeScript.

Workspaces, tiling direction, binding modes, open-app icons, media controls, system stats, system tray and clock — all in a 38px strip that stays out of the way.
---

## Widgets in this pack

| Widget | Description |
|---|---|
| **top-bar** | Current design. Includes keyboard layout indicator and animated workspace / binding-mode chips. |
| **top-bar-old** | Previous, flatter design. Kept for anyone who preferred it. |

Each widget ships presets for a primary and a secondary monitor.

## What's on the bar

**Left**
- **Windows button** — opens the Start menu (VBScript)
- **Search button** — opens Windows Search (AutoHotkey)
- **Workspaces** — GlazeWM workspaces; click to focus, `+` jumps to the next free workspace
- **Tiling direction** — click to toggle horizontal / vertical
- **Binding modes** — active GlazeWM binding modes; click a chip to exit it
- **Media** — current track title and artist with previous / play-pause / next

**Center**
- **Open apps** — icons of windows on the displayed workspaces; click to focus a window (AutoHotkey)

**Right**
- **System tray** — click the chevron to expand hidden icons; left and right click are passed through to the icon
- **CPU** — usage % with a colored ring; click opens System Informer *(5s)*
- **RAM** — usage % with a colored ring; click opens Mem Reduct *(5s)*
- **Weather** — condition icon and temperature in °C
- **Network** — Wi-Fi / Ethernet icon with download and upload rate; click opens the quick settings panel *(2s)*
- **Keyboard** — active layout language code *(top-bar only)*
- **Volume** — scroll to change volume, hover for the slider, click opens the sound output menu
- **Battery** — charge ring and percentage, tooltip with time till full / empty *(10s)*
- **Clock** — `HH:mm` with the date underneath; click opens the notification center

Stat colors shift green → yellow → orange → red as usage rises.

## Requirements

| | |
|---|---|
| **GlazeWM** | Required — workspaces, binding modes and open-app icons come from it |
| **AutoHotkey** | Required for the search, network, volume and open-app buttons: `winget install AutoHotkey.AutoHotkey` |
| **Mem Reduct** | Optional — opened by the RAM button (`C:\Program Files\Mem Reduct\memreduct.exe`) |

The CaskaydiaMono Nerd Font is bundled with the pack, so no font install is needed.

## Setup

1. Install the pack from the Zebar marketplace and enable the `top-bar` widget from the Zebar tray icon.
2. Leave room for the bar in `glazewm/config.yaml`:

```yaml
gaps:
  outer_gap:
    top: '38 px'
```

3. Launch Zebar together with GlazeWM:

```yaml
general:
  startup_commands: ['shell-exec zebar']
  shutdown_commands: ['shell-exec taskkill /IM zebar.exe /F']
```

Sizing is tuned for **1080p at 125% display scale** (32px of content in a 38px window). On other resolutions adjust the preset height in Zebar's settings and the `outer_gap.top` to match.

## Credits

- Font — [CaskaydiaMono Nerd Font](https://www.nerdfonts.com/font-downloads)
- Icons — [Icons8](https://icons8.com/icons)
- Scripts — [AutoHotkey](https://www.autohotkey.com), VBScript
- Built on [Zebar](https://github.com/glzr-io/zebar) and [GlazeWM](https://github.com/glzr-io/glazewm) by [glzr.io](https://github.com/glzr-io)
