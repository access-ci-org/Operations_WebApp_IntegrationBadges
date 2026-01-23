import {useLocation, useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";

export default function Concierge(props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const concierge = queryParams.get('concierge');

    if (concierge) {
        return props.children;
    }
}

export function ConciergeSwitch(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const concierge = queryParams.get('concierge');

    const onSwitchClick = (evt) => {
        navigate(location.pathname + (concierge ? "" : "?concierge=true"), {replace: true})
    }

    return <nav className="navbar fixed-bottom navbar-light bg-light border-top border-3 border-medium p-2 d-flex">
        <div className="flex-wrap"></div>
        <div className="ps-5 pe-5">
            <Form.Check type="switch" checked={!!concierge} id="concierge-switch"
                       label="Concierge Mode" onChange={onSwitchClick}/>
        </div>
    </nav>
}
