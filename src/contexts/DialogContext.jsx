import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AxiosError} from "axios";
import {AppRouteUrls} from "../pages/pages-config.js";

/** @type {React.Context<ReturnType<typeof useDialogsValues> | null>} */
const DialogContext = createContext(null);

export const useDialogs = () => useContext(DialogContext);

const defaultDialogObject = {
    variant: "primary",
    title: "",
    icon: "",
    message: "",
    buttons: [
        {label: "No", answer: false, className: "btn btn-outline-primary", to: null},
        {label: "Yes", answer: true, className: "btn btn-primary", to: null}
    ]
};

function useDialogsValues() {


    const [dialogState, setDialogState] = useReducer(DefaultReducer, {
        isOpen: false,
        resolve: null,
        reject: null,
        ...defaultDialogObject
    });

    const showDialog = (
        {
            variant = defaultDialogObject.variant,
            title = defaultDialogObject.title,
            icon = defaultDialogObject.icon,
            message = defaultDialogObject.message,
            buttons = defaultDialogObject.buttons
        } = defaultDialogObject
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


    /**
     * @param {IntegrationRoles []} roles
     * @param {string} resourceId
     * @returns {Promise}
     * @constructor
     */
    const showErrorDialog = ({error, resourceId, roles}) => {
        let title = "Unknown Error";
        let message = "Unknown Error. Please try again later.";

        if (error instanceof AxiosError) {
            if (error.response.status === 401) {
                title = "Unauthenticated";
                message = (<p>
                    You are not authenticated to perform this action.<br/>
                    Please login and try again.
                </p>);
            } else if (error.response.status === 403) {
                title = "Unauthenticated";
                message = (<div>
                    <p>
                        You don't have permissions to make this change.
                        If you should have it, please submit an&nbsp;
                        <Link className="btn btn-link" to="https://operations.access-ci.org/open-operations-request/">
                            ACCESS ticket</Link>
                        &nbsp;requesting:
                    </p>

                    <p>
                        Integration Dashboard&nbsp;
                        {roles.map((role, roleIndex) => {
                            return <span key={roleIndex}>
                                <strong>{role}</strong>
                                {roleIndex < roles.length - 1 ? " or " : " "}
                            </span>
                        })}

                        permission for the resource&nbsp;

                        <Link className="btn btn-link" onClick={closeDialog.bind(this, {answer: false})}
                              to={AppRouteUrls.RESOURCE.replace(":resourceId", resourceId)}>
                            {resourceId}</Link>
                    </p>
                </div>);
            } else if (error.response.status >= 500) {
                title = "Server Error";
                message = (<p>
                    The Integration Dashboard is experiencing some issues at this time. <br/>
                    Please try again later.
                </p>);
            } else if (error.response.status >= 400) {
                title = "Unknown Error";
                message = (<p>
                    The Integration Dashboard is experiencing some errors.<br/>
                    Please create an&nbsp;
                    <Link className="btn btn-link" to="https://operations.access-ci.org/open-operations-request/">
                        ACCESS ticket</Link>
                    &nbsp;to report this.
                </p>);
            }
        }

        return showDialog({
            variant: 'danger',
            title: title,
            icon: "bi-exclamation-triangle-fill",
            message: message,
            buttons: [
                {label: "Cancel", answer: false, className: "btn btn-outline-primary"}
            ]
        });
    };

    const closeDialog = ({answer}) => {
        setDialogState({
            isOpen: false,
            resolve: null,
            reject: null
        });

        dialogState.resolve(answer);
    };

    return {dialogState, showDialog, showErrorDialog, closeDialog};
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
                                className = "btn btn-outline-primary",
                                to = null
                            } = button;

                            if (to) {
                                return <Link key={buttonIndex} to={to} className={"rounded-1 " + className}
                                             onClick={closeDialog.bind(null, {answer})}>
                                    {label}
                                </Link>
                            } else {
                                return <button key={buttonIndex} className={"rounded-1 " + className}
                                               onClick={closeDialog.bind(null, {answer})}>
                                    {label}
                                </button>;
                            }
                        })}
                    </Modal.Footer>
                </Modal>)}
        </DialogContext.Provider>
    );
};
