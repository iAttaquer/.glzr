#Requires AutoHotkey v2.0
#SingleInstance Force

windowID := A_Args[1]
if WinExist("ahk_id " windowID) {
    WinActivate("ahk_id " windowID)
}
ExitApp()
