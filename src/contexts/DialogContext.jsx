import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {Modal} from "react-bootstrap";
import {BadgeWorkflowStatus} from "./constants.js";

/** @type {React.Context<ReturnType<typeof useDialogsValues> | null>} */
const DialogContext = createContext(null);

export const useDialogs = () => useContext(DialogContext);

function useDialogsValues() {
    const [dialogState, setDialogState] = useReducer(DefaultReducer, {
        isOpen: false,
        type: 'alert', // 'alert' or 'confirm'
        message: '',
        variant: 'info', // 'success', 'danger', 'warning', 'info',
        options: {
            title: '',
            icon: '',
            buttons: [
                {label: "No", answer: false},
                {label: "Yes", answer: true}
            ]
        },
        resolvePromise: null
    });

    const showAlert = (message, variant = 'info', options = {}) => {
        setDialogState({
            isOpen: true,
            type: 'alert',
            message,
            variant,
            options,
            resolvePromise: null
        });
    };

    const showConfirm = (message, variant = 'warning', options = {}) => {
        return new Promise((resolve) => {
            setDialogState({
                isOpen: true,
                type: 'confirm',
                message,
                variant,
                options,
                resolvePromise: resolve
            });
        });
    };

    const closeDialog = (confirmed = false) => {
        if (dialogState.resolvePromise) {
            dialogState.resolvePromise(confirmed);
        }
        setDialogState({
            isOpen: false,
            type: 'alert',
            message: '',
            variant: 'info',
            options: {},
            resolvePromise: null
        });
    };

    return {dialogState, showAlert, showConfirm, closeDialog};
}

export const DialogProvider = ({children}) => {
    const values = useDialogsValues();
    const {dialogState, closeDialog} = values;

    return (
        <DialogContext.Provider value={values}>
            {children}

            {/* Modal markup rendered dynamically from the central context state */}
            {dialogState.isOpen && (
                <Modal show={dialogState.isOpen} onHide={closeDialog.bind(this, false)}>
                    <Modal.Header closeButton className={`bg-${dialogState.variant}-subtle`}>
                        <Modal.Title>
                            {dialogState.options.icon &&
                                <i className={`bi ${dialogState.options.icon} text-${dialogState.variant} center-and-large-icon`}></i>}
                            {dialogState.options.title && <span>{dialogState.options.title}</span>}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {dialogState.message}
                    </Modal.Body>
                    <Modal.Footer>
                        {dialogState.type === 'confirm' ? (
                            <>
                                <button className="btn btn-outline-primary rounded-1"
                                        onClick={() => closeDialog(false)}>
                                    {dialogState.options.cancelButtonText || 'No'}
                                </button>
                                <button className="btn btn-primary rounded-1" onClick={() => closeDialog(true)}>
                                    {dialogState.options.yesButtonText || 'Yes'}
                                </button>
                            </>
                        ) : (
                            <button className="btn btn-outline-primary rounded-1" onClick={() => closeDialog(false)}>
                                {dialogState.options.okButtonText || 'OK'}
                            </button>
                        )}
                    </Modal.Footer>
                </Modal>

            )
            }
        </DialogContext.Provider>
    );
};
