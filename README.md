# Config for [GlazeWM](https://github.com/glzr-io/glazewm) and [Zebar](https://github.com/glzr-io/zebar)
![Screenshot 2024-10-08 104538](https://github.com/user-attachments/assets/f2441fe4-a1af-4b59-9a64-c93ca59e4bd2)

for 1080p resolution

## Used
Font: **CaskaydiaMono Nerd Font** <br>
https://www.nerdfonts.com/font-downloads

Icons: **Icons8** <br>
https://icons8.com/icons

Scripts: **AutoHotkey**, **VBScript** (in the system) <br>
https://www.autohotkey.com

Cpu button open [System Informer](https://systeminformer.sourceforge.io/) 

Memory button open [Mem Reduct](https://github.com/henrypp/memreduct)


## Instalation
if you want config only for Zebar just copy **attaquer** folder to zebar directory and activate widget using tray icon.
You also need to download [AutoHotkey](https://www.autohotkey.com/) to be able to use search and network buttons.
#### Quick installation of Ahk using the console:
```
winget install AutoHotkey.AutoHotkey
```
#### Instead of **System Informer** you probably want to use **Task Manager**. <br>
In the **index.jsx**:
```js
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
```
change this: ```%ProgramFiles%/SystemInformer/SystemInformer.exe``` <br>
to this: ```%windir%/system32/taskmgr.exe /7```
