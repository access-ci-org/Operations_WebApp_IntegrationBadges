import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {Modal} from "react-bootstrap";

/** @type {React.Context<ReturnType<typeof useDialogsValues> | null>} */
const DialogContext = createContext(null);

export const useDialogs = () => useContext(DialogContext);

function useDialogsValues() {
    const [dialogState, setDialogState] = useReducer(DefaultReducer, {
        isOpen: false,
        resolve: null,
        reject: null,

        title: "",
        message: "",
        icon: "",
        variant: "info",
        buttons: [
            {label: "No", answer: false},
            {label: "Yes", answer: true}
        ]
    });

    const showDialog = (
        {
            variant = 'info',
            title, icon, message,
            buttons = [
                {label: "No", answer: false},
                {label: "Yes", answer: true}
            ]
        }
    ) => {
        return new Promise((resolve, reject) => {
            setDialogState({
                isOpen: true,
                resolve,
                reject,

                title: title,
                message: message,
                icon: icon,
                variant: variant,
                buttons: buttons
            });
        });
    };

    const closeDialog = ({answer}) => {
        dialogState.resolve(answer);

        setDialogState({
            isOpen: false,
            resolve: null,
            reject: null
        });
    };

    return {dialogState, showDialog, closeDialog};
}

export const DialogProvider = ({children}) => {
    const values = useDialogsValues();
    const {dialogState, closeDialog} = values;
    const {isOpen, resolve, reject, variant, title, icon, message, buttons} = dialogState;


    return (
        <DialogContext.Provider value={values}>
            {children}

            {isOpen &&
                (<Modal className={`modal-${variant}`} show={isOpen} onHide={closeDialog.bind(this, {answer: false})}>
                    <Modal.Header closeButton className={icon ? "modal-icon-header" : ""}>
                        <Modal.Title>{title}</Modal.Title>
                        {icon && <i className={`bi ${icon}`}></i>}
                    </Modal.Header>
                    <Modal.Body>
                        {message}
                    </Modal.Body>
                    <Modal.Footer>
                        {buttons.map((button, buttonIndex) => {
                            const {
                                label = `Button ${buttonIndex + 1}`,
                                answer = false,
                                className = "btn btn-outline-primary"
                            } = button;

                            return <button key={buttonIndex} className={"rounded-1 " + className}
                                           onClick={closeDialog.bind(null, {answer})}>
                                {label}
                            </button>;
                        })}
                    </Modal.Footer>
                </Modal>)}
        </DialogContext.Provider>
    );
};
