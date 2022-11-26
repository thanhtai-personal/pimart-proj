import createMuiTheme from "@material-ui/core/styles/createTheme";

declare module "@material-ui/core/Typography/Typography" {
  interface TypographyPropsVariantOverrides {
    lightBold: true;
    bold: true;
    light: true;
    link: true;
  }
}

declare module "@material-ui/core/Button/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    success: true;
    danger: true;
    info: true;
  }
}

export const Colors = {
  bg: "#1C1D25",
  primary: "#3778FB",
  secondary: "#5EDB7C",
  white: "#ffffff",
  text: "white",
  info: "#A8DDFF",
  success: "#48CD85",
  textGray: "#C4C4C4",
  disabled: "#AAAAAA",
  drawer: "#23242E",
  border: "#30313F",
  block: "#23242E",
  textBox: "#23242E",
  link: "#3493FE",
  red: "#FB3737",
  //custom color (not in theme)
  layoutBg: "#142028",
  mainBg: "transparent",
  iconColor: "#cacedb",
  textColor: "#fff",
  strongColor: "#17c671", //green
  linkColor: "#00b8d8", //blue
  dangerColor: "#ea3943", //red
  activeItemColor: "rgba(255, 255, 255, 0.08)",
  hoverMaskBg: "rgba(255, 255, 255, 0.18)",
  iconColor2: "#818ea3",
  gray900: "#1C1C1C",
  gray800: "#2C2C2C",
  gray400: "#898989",
  gray200: "#E7E7E7",
  miniTextColor: "#A6A6A6",
  pink: "#EF426F",
  green: "#10E0BB",
  borderDark: "solid 1px rgba(255,255,255, 0.16)",
  tableRowBg2: "transparent",
  tableRowBg1: "transparent",
  boxShadowBlue03: "0 2px 5px rgb(55, 120, 251,0.3)",
  boxShadowBlue05: "0 2px 5px rgb(55, 120, 251,0.5)",
  boxShadowRed01: "0 5px 10px rgb(255,0,69,0.1)",
  tableHeaderBg: "#17171E",
  rowHoverBg: "#1D3647",
  orange200: "rgba(255, 204, 128, 0.22)",
};

export const createAppTheme = () => {
  const muiTheme = createMuiTheme({
    typography: {
      fontFamily: "Satoshi", // "Nunito Sans",
      caption: {
        fontSize: "14px",
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: Colors.text,
            fontSize: 14,
          },
        },
        variants: [
          {
            props: { variant: "bold" },
            style: {
              fontWeight: "bold",
              fontSize: 14,
            },
          },
          {
            props: { variant: "light" },
            style: {
              fontWeight: 400,
              fontSize: 14,
            },
          },
          {
            props: { variant: "link" },
            style: {
              fontWeight: "bold",
              fontSize: 14,
              color: Colors.link,
              cursor: "pointer",
            },
          },
        ],
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "primary" },
            style: {
              background: Colors.primary,
              borderRadius: "8px",
              color: "white",
              textTransform: "none",
              "&:hover": {
                background: Colors.primary,
              },
              "&.Mui-disabled": {
                backgroundColor: Colors.disabled,
                boxShadow: `none`,
                border: "none",
              },
            },
          },
          {
            props: { variant: "secondary" },
            style: {
              background: Colors.secondary,
              borderRadius: "8px",
              color: "white",
              textTransform: "none",
              "&:hover": {
                background: Colors.secondary,
              },
            },
          },

          {
            props: { variant: "danger" },
            style: {
              border: "2px solid #006188",
              borderRadius: 10,
              padding: "8px 30px",
              backgroundColor: "#FF0045",
              "&:hover": {
                backgroundColor: "rgba(255,0,69,0.8)",
                boxShadow: "0 5px 10px rgb(255,0,69,0.3)",
              },
              "&.Mui-disabled": {
                backgroundColor: Colors.disabled,
                boxShadow: `none`,
                border: "none",
              },
            },
          },
          {
            props: { variant: "success" },
            style: {
              border: "2px solid #21E49F",
              borderRadius: 10,
              padding: "8px 30px",
              backgroundColor: "#209382",
              "&:hover": {
                backgroundColor: "#21E49F",
              },
              "&.Mui-disabled": {
                backgroundColor: Colors.disabled,
                boxShadow: `none`,
                border: "none",
              },
            },
          },
        ],

        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          // disableRipple: false,
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {},
        },
      },
      MuiSelect: {
        defaultProps: {
          disableUnderline: true,
        },
        styleOverrides: {
          icon: {
            color: "white",
            right: `0px !important`,
          },
          root: {},
          outlined: {},
          select: {
            background: "rgba(0,0,0,0)",
          },
        },
      },

      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: Colors.block,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            backgroundColor: Colors.block,
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          root: {
            background: "rgba(0,0,0,0.6)",
            "& .MuiDialog-paperFullWidth": {
              width: "calc(100% - 24px)",
            },
            "& .MuiDialog-paper": {
              margin: 0,
              overflowX: "hidden",
              backgroundColor: "#1C1D25",
              borderRadius: 5,
            },
            "& .MuiDialogContent-root": {
              backgroundColor: "#1C1D25",
            },
          },
        },
      },

      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: "#737585 !important",
            "&.Mui-selected": {
              color: "white !important",
              backgroundColor: "#353646",
            },
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paperAnchorDockedLeft: {
            borderRight: "none",
          },
          paper: {
            overflowX: "hidden",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            background: Colors.block,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            background: Colors.block,
            color: "white",
            borderBottom: `2px solid #1F2028`,
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          input: {
            color: "white",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {},
          input: {
            borderRadius: 5,
            padding: "12px 16px",
            fontWeight: "bold",
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 0,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            opacity: `0.9 !important`,
            borderRadius: 5,
          },
        },
      },
    },
    palette: {
      primary: {
        main: Colors.primary,
      },
      secondary: {
        main: Colors.secondary,
      },
    },
  });
  return {
    ...muiTheme,
    colors: {
      ...Colors,
    },
    metrics: {
      drawerWidth: 60,
    },
    formGroup: {
      border: "1px solid #D9DAED",
      padding: "10px",
      borderRadius: 10,
    },

    autoTransformWhenHolver: {
      transition: "all .2s",

      "&:hover": {
        transform: "translateY(-5px)",
      },
    },

    input: {
      borderRadius: 5,
      border: `2px solid #84DEFF`,
      padding: "8px 16px",
    },
  };
};

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
export type AppTheme = ReturnType<typeof createAppTheme>;
