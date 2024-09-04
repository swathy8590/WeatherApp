import { latLng } from "leaflet"


export const initializer =
{
  theme: {
    backgroundColor: localStorage.getItem("theme") !== null ? JSON.parse(localStorage.getItem("theme")).backgroundColor : "#241F43",
    color: localStorage.getItem("theme") !== null ? JSON.parse(localStorage.getItem("theme")).color : "#E1E1E1",
    BorderColor: localStorage.getItem("theme") !== null ? JSON.parse(localStorage.getItem("theme")).BorderColor : "#C5C5C5",
    colorMode: localStorage.getItem("theme") !== null ? JSON.parse(localStorage.getItem("theme")).colorMode : "dark",
    selectColor: localStorage.getItem("theme") !== null ? JSON.parse(localStorage.getItem("theme")).selectColor : '#766EAC',
    mainBackgroundColor: localStorage.getItem("theme") !== null ? JSON.parse(localStorage.getItem("theme")).mainBackgroundColor : '#000000',
    drawerOpen: false,


  },


  // theme: {
  //   backgroundColor: "#241F43",
  //   color: "#E1E1E1",
  //   BorderColor: "#C5C5C5",
  //   colorMode: "dark",
  //   selectColor: '#766EAC'
  // },
  api: {
    weatherData: "",
    currentLatlang: "",
    searchName: [],
    searchData: null,
    cardCurrentLatlang: ""
  },





}


export const reducefn = (value, action) => {
  console.log(value)

  switch (action.type) {
    case "whiteMOde":

      localStorage.setItem('theme', JSON.stringify({
        backgroundColor: value.theme.backgroundColor === "#fff" ? "#201C38" : "#fff",
        color: value.theme.color === "#343746" ? "#E1E1E1" : "#343746",
        BorderColor: value.theme.BorderColor === "#F5F5F5" ? "#C5C5C5" : "#F5F5F5",
        colorMode: value.theme.colorMode === "dark" ? "light" : "dark",
        selectColor: value.theme.selectColor === "#766EAC" ? "#C8BFFF" : "#766EAC",
        mainBackgroundColor: value.theme.mainBackgroundColor === '#000000' ? '#FDFDFD' : '#000000'

      }));

      return {
        ...value, theme: {
          backgroundColor: value.theme.backgroundColor === "#fff" ? "#201C38" : "#fff",
          color: value.theme.color === "#343746" ? "#E1E1E1" : "#343746",
          BorderColor: value.theme.BorderColor === "#F5F5F5" ? "#C5C5C5" : "#F5F5F5",
          colorMode: value.theme.colorMode === "dark" ? "light" : "dark",
          selectColor: value.theme.selectColor === "#766EAC" ? "#C8BFFF" : "#766EAC",
          mainBackgroundColor: value.theme.mainBackgroundColor === '#000000' ? '#FDFDFD' : '#000000'
        }
      }

    case "weatherapi":
      return {
        ...value, api: { ...value.api, weatherData: action.payload }

      }
    case "current-latlng":
      return {
        ...value, api: { ...value.api, currentLatlang: action.payload }

      }
    case "location-name":
      return {
        ...value, api: { ...value.api, searchName: [...action.payload] }

      }

    case "search-data":
      return {
        ...value, api: { ...value.api, searchData: action.payload }

      }

    case "geoLocation":
      return {
        ...value, api: { ...value.api, cardCurrentLatlang: action.payload }

      }
    case "drawerOpen":
      console.log(action.payload)
      return {
        ...value, theme: { ...value.theme, drawerOpen: action.payload }

      }




    default: return value;

  }

}