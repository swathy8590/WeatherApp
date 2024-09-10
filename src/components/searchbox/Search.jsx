import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../pages/home/Home";
import { Autocomplete, Divider, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useSpeech } from "react-text-to-speech";

function Search() {
  const { state, dispatch, mediaQuery } = useContext(Context);
  const { REACT_APP_SEARCH, REACT_APP_SEARCH_API_KEY } = process.env;
  const [transcript, setTranscript] = useState("");
  const [voice, setVoice] = useState("");
  const {
    Text, // Component that returns the modified text property
    speechStatus, // String that stores current speech status
    isInQueue, // Boolean that stores whether a speech utterance is either being spoken or present in queue
    start, // Function to start the speech or put it in queue
    pause, // Function to pause the speech
    stop, // Function to stop the speech or remove it from queue
  } = useSpeech({ text: voice });
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  useEffect(() => {
    if (!SpeechRecognition) {
      alert("Speech Recognition API is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep recognizing speech
    recognition.interimResults = false; // Only capture final results
    recognition.lang = "en-US"; // Set language

    recognition.onresult = async (event) => {
      const lastResultIndex = event.results.length - 1;
      const spokenText = event.results[lastResultIndex][0].transcript;
      console.log("Recognized text:", spokenText);
      handleSearch(spokenText);
      //   await axios
      //     .get(
      //       `${REACT_APP_SEARCH}/search?q=${spokenText}&api_key=${REACT_APP_SEARCH_API_KEY}`
      //     )
      //     .then((response) => response)
      //     .then((response) => {
      //       const locationName = response.data.map(
      //         (val, inx) => val.display_name
      //       );
      //       dispatch({ type: "location-name", payload: locationName });
      //       const searchData = response.data.map((val, inx) => val);
      //       dispatch({ type: "search-data", payload: searchData });
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognition.onend = () => {
      recognition.start(); // Restart recognition if it ends
    };

    // Automatically start recognition when the component mounts
    recognition.start();

    // Clean up: stop recognition when the component unmounts
    return () => {
      recognition.stop();
    };
  }, []);

  const handleSearch = async (e) => {
    await axios
      .get(
        `${REACT_APP_SEARCH}/search?q=${e}&api_key=${REACT_APP_SEARCH_API_KEY}`
      )
      .then((response) => response)
      .then((response) => {
        const locationName = response.data.map((val, inx) => val.display_name);
        dispatch({ type: "location-name", payload: locationName });
        const searchData = response.data.map((val, inx) => val);
        dispatch({ type: "search-data", payload: searchData });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e, value) => {
    const searchLatLng =
      state && state.api.searchData.filter((val) => val.display_name === value);
    setVoice(
      `Your Destination Place is ${value} and Latitude is ${JSON.stringify(
        searchLatLng[0].lat
      )} and Longitude ${JSON.stringify(searchLatLng[0].lon)}`
    );

    dispatch({
      type: "current-latlng",
      payload: { lat: searchLatLng[0].lat, lng: searchLatLng[0].lon },
    });
  };

  useEffect(() => start(), [voice]);

  console.log(state.api.searchName);

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          width: !mediaQuery.mobile ? 300 : "73%",
          background: state.theme?.backgroundColor,
          position: "absolute",
          top: "20px",
          marginLeft: !mediaQuery.mobile ? "20px" : "70px",
          border: "1px solid state.theme?.borderColor",
          zIndex: 999,
          backdropFilter: ` blur(5px) saturate(180%)`,
          webkitBackdropFilter: `blur(20px) saturate(180%)`,
        }}
      >
        <Autocomplete
          autoComplete={true}
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          slotProps={{
            paper: {
              sx: {
                backgroundColor: state.theme?.backgroundColor,
                color: state.theme.color,
                minHeight: "35px",
              },
            },
          }}
          renderOption={(props, options) => {
            return (
              <>
                <span
                  key={options}
                  {...props}
                  style={{
                    backgroundColor: state.theme?.backgroundColor,
                    color: state.theme.color,
                    minHeight: "35px",
                  }}
                >
                  {options}
                </span>
                <Divider
                  sx={{
                    bgcolor: state.theme.colorMode === "dark" ? "#36324f" : "",
                  }}
                />
              </>
            );
          }}
          options={state.api.searchName}
          onChange={(e, value) => handleChange(e, value)}
          renderInput={(params) => (
            <TextField
              {...params}
              style={{ color: "red" }}
              autoFocus
              placeholder="Search Location"
              der="search location"
              value={state.api.searchName}
              InputProps={{
                style: { color: state.theme?.color },
                ...params.InputProps,
                type: "search",
                onChange: (e) => handleSearch(e.target.value),
              }}
            />
          )}
        />
      </Stack>
    </>
  );
}

export default Search;
