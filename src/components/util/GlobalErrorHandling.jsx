import React, {useEffect} from "react";
import {useDialogs} from "../../contexts/DialogContext.jsx";
import {IntegrationRoles} from "../../contexts/constants.js";
import {Modal} from "react-bootstrap";
import {Link} from "react-router-dom";

const ErrorLoggingDeviceIdLocalStorageKey = "error_logging_device_id";

function getOrCreate16CharacterDeviceID() {
    let deviceId = localStorage.getItem(ErrorLoggingDeviceIdLocalStorageKey);

    if (!deviceId) {
        // Generates 16 characters of Base36
        deviceId = ""
        while (deviceId.length < 16) {
            deviceId += Math.random().toString(36).substring(2);
        }

        localStorage.setItem(ErrorLoggingDeviceIdLocalStorageKey, deviceId);
    }

    return deviceId;
}


function sendToLoggingServer(category, arg) {
    const payload = {
        deviceId: getOrCreate16CharacterDeviceID(),
        timestamp: Date.now(),
        href: window.location.href
    };

    console.log(`######## sendToLoggingServer [${category}] `, arg, payload);

    // Sentry.init({
    //     dsn: "http://d77e1e13a4e09419ee050b33e8405685@localhost:9000/1",
    //     dataCollection: {
    //         // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    //         // https://docs.sentry.io/platforms/javascript/configuration/options/#dataCollection
    //         // userInfo: false,
    //         // httpBodies: [],
    //
    //         payload,
    //         arg
    //     },
    //     release: `${pkg.name}@${pkg.version} [${category}]`,
    // });
}

export default class GlobalErrorHandling extends React.Component {

    constructor(props) {
        super(props);

        this.state = {hasError: false, error: null};

        // const appendTheError = (error) => {
        //     this.setState({errors: [...this.state.errors, error]});
        // }

        // window.onerror = function (message, source, lineno, colno, error) {
        //     sendToLoggingServer("Standard JavaScript Error", {message, source, lineno, colno, stack: error?.stack});
        //
        //     appendTheError(error);
        //
        //     return true;
        //     return false; // Allows the error to still fire normally in the browser console
        // };
        //
        // window.addEventListener("unhandledrejection", function (event) {
        //     sendToLoggingServer("Asynchronous Promise Rejection", {
        //         message: event.reason.message,
        //         stack: event.reason.stack
        //     });
        //
        //
        //     appendTheError(event.reason);
        //
        // });

        // window.addEventListener('error', function (event) {
        //     if (event.target.tagName) {
        //         sendToLoggingServer("Asset Loading Failure", {assetUrl: event.target.src || event.target.href});
        //     }
        // }, true);
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true, error};
    }

    componentDidCatch(error, info) {

    }


    render() {
        if (this.state.hasError) {
            // return this.props.fallback;
            return <div>
                <Modal className="modal-danger" show={true}>
                    <Modal.Header className="modal-icon-header">
                        <Modal.Title>Unknown Error</Modal.Title>
                        <i className="bi bi-exclamation-triangle-fill"></i>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            The ACCESS Integration Dashboard is experiencing some errors.
                        </p>
                        <p>
                            Please create an&nbsp;
                            <Link className="btn btn-link"
                                  to="https://operations.access-ci.org/open-operations-request/">
                                ACCESS ticket</Link>
                            &nbsp;to report this.
                        </p>
                        <code>{window.location.href}</code>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
            </div>
        } else {
            return this.props.children;
        }
    }

}


