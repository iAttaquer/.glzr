import { createContext, useContext, createSignal } from "solid-js";

const AppContext = createContext();

export function AppProvider(props) {
    const [spotifyTitle, setSpotifyTitle] = createSignal(undefined);

    return (
        <AppContext.Provider value={{ spotifyTitle, setSpotifyTitle }}>
            {props.children}
        </AppContext.Provider>
    );
}
export function useAppContext() {
    return useContext(AppContext);
}