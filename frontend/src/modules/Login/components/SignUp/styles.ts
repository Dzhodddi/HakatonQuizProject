export const styles = {
    root: {
        backgroundColor: "mainPalette.white",
        px: 4,
        py: 10,
        borderRadius: 2,
        boxShadow: 3,
        width: {
            xs: "90%",
            sm: "70%",
            md: "50%",
            lg: "40%",
            xl: "30%",
        },
        justifyContent: "center",
        alignItems: "center",
    },
    form: { 
        justifyContent: "center", 
        alignItems: "center", 
        display: "flex", 
        flexDirection: "column",
        gap: 8,
    },
    button: {
        backgroundColor: "mainPalette.darkBlue",
        borderRadius: 4,
        px: 8,
    },
    textFieldGroup: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2.5,
    },
    link: {
        display: "flex",
        flexDirection: {
            xs: "column",
            sm: "row",
        },
        justifyContent: {
            xs: "center",
        },
        alignItems: {
            xs: "center",
        },
    },
    linkButton: {
        color: "mainPalette.darkBlue",
        textTransform: "none",
        padding: 0,
    },
    error: {
        color: "mainPalette.red",
    },
    nameTextFieldGroup: {
        display: "flex",
        flexDirection: {
            xs: "column",
            sm: "row",
        },
        justifyContent: "center",
        alignItems: "center",
        gap: 2.5,
    },
};