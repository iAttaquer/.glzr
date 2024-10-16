import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";

interface SearchButtonProps {
  glazewm: GlazeWmOutput;
}

const SearchButton: Component<SearchButtonProps> = (props) => {
  return (
    <button
      class="search"
      onclick={() => {
        props.glazewm.runCommand(
          "shell-exec %userprofile%/.glzr/zebar/attaquer-solid-ts/dist/assets/scripts/OpenWindowsSearch.ahk"
        );
        console.log("Search")
      }}
    >
      <span class="content">
        <img src="./assets/icons/icons8-search-32.png" width="19" height="19"></img>
      </span>
    </button>
  );
};

export default SearchButton;
