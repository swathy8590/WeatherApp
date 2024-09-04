import { createTheme } from "@mui/material/styles";

export const THEME = createTheme(
    {
        typography: {
            //  fontFamily: ["Montserrat", 'sans-serif'].join(','),
            fontSize: 13,
            h2: {
                fontSize: "60px",
                fontWeight: "bold",
            }
        },
    }
)