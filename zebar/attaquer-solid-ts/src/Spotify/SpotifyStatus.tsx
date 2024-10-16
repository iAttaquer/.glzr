import "./style.css";
import { Component } from "solid-js";
import { useAppContext } from "../AppContext";

const SpotifyStatus: Component<{}> = () => {
  const { spotifyTitle } = useAppContext();

  return (
    <>
      {spotifyTitle() && (
        <div class="template spotify">
          <img
            src="./assets/icons/icons8-spotify-32.png"
            height="23"
            width="23"
          />
          {spotifyTitle()}
        </div>
      )}
    </>
  );
};

export default SpotifyStatus;
