import {useOrganizations} from "../contexts/OrganizationsContext";
import {useState} from "react";
import {Link} from "react-router-dom";
import LoadingBlock from "../components/util/LoadingBlock.jsx";
import {DocumentationRouteUrls} from "./docs/DocumentationRoute.jsx";
import GridAndListSwitch from "../components/util/GridAndListSwitch.jsx";
import {sortJsonArrayAlphabetically} from "../components/util/sort.jsx";

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function IntegrationDashboard() {
    const {getOrganizations} = useOrganizations();

    const [searchText, setSearchText] = useState("");

    const organizations = getOrganizations();

    let filteredOrganizations;
    if (organizations && organizations.length > 0) {
        filteredOrganizations = organizations.filter(organization => {
            return organization.organization_name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
        });
    }

    filteredOrganizations = sortJsonArrayAlphabetically(filteredOrganizations, "organization_name")

    return (<div className="container">
        <div className="row">
            <h1>Integration Dashboard</h1>
            <p className="mt-3">
                Welcome to the ACCESS Integration Dashboard.
                <br/><br/>
                <strong className="text-medium">Click on a Resource Provider (RP)</strong> to view their resources and
                integration statuses.
                You can explore and manage the resources provided by various RPs. Each RP’s integration progress is
                tracked in real-time, so you can monitor your active and pending integrations as you continue your
                work.
            </p>
        </div>
        <div className="w-100 mt-2">
            <input className="form-control" type="text" placeholder="Search Resource Provider by Organization Name"
                   aria-label="default input example" onChange={(e) => setSearchText(e.target.value)}/>
        </div>

        <div className="w-100 d-flex mt-5">
            <div className="flex-fill bd-highlight">
                <h2>Resource Providers {filteredOrganizations && `(${filteredOrganizations.length})`}</h2>
            </div>
            <GridAndListSwitch/>
        </div>

        <LoadingBlock processing={!filteredOrganizations}
                      className="pt-4 pb-5">
            {filteredOrganizations && filteredOrganizations.length === 0 &&
                <div className="w-100 p-3 text-center lead">
                    No organisations available
                </div>}
            <div className="row mt-2 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
                {filteredOrganizations && filteredOrganizations.map((organization, organizationIndex) => {
                    return <div key={organizationIndex} className="col p-3">
                        <Link className="organization-card rounded-3 w-100 h-100"
                              to={"/organizations/" + organization.organization_id}>
                            <div className="w-100 p-3"></div>
                            <div className="w-100 p-5 bg-light" style={{
                                backgroundImage: `url(${organization.other_attributes.organization_logo_url})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center"
                            }}>
                                {/*<img className="w-100" src={organization.other_attributes.organization_logo_url}/>*/}
                            </div>
                            <div className="w-100 p-3 text-center">
                                <Link className="btn btn-link"
                                      to={"/organizations/" + organization.organization_id}>
                                    {organization.organization_name}
                                </Link>
                            </div>
                        </Link>
                    </div>
                })}

                <div className="col p-3">
                    <div className="organization-card rounded-3 w-100 h-100">
                        <Link to={DocumentationRouteUrls.INDEX} className="btn btn-link w-100 p-5 text-center">
                            <i className="bi bi-plus-lg fs-1"></i>
                            <div className="pb-5">
                                Register New Organization
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </LoadingBlock>
    </div>);
}