import { Styles, Options } from "./types";

export let defaultStyle: Styles = {
    form: {
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "1em",
        },
        submit: {
            width: "5em",
            height: "2em",
        }
    },

    input: {
        label: {
            display: "flex",
            flexDirection: "column",
            gap: ".25em",
        },
        input: {

        },
        text: {

        },
        checkbox: {

        }
    }
}

export let defaultOptions: Options = {
    title: "Form",
    trimInput: true,
    errorOnMoveOut: true,
}