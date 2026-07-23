import "bootstrap-icons/font/bootstrap-icons.min.css";
import 'access-operations-custom-bootstrap';
import './App.scss';
import {BrowserRouter, useRoutes} from 'react-router-dom';
import {BadgeProvider} from "./contexts/BadgeContext";
import {ResourcesProvider} from "./contexts/ResourcesContext";
import {OrganizationsProvider} from "./contexts/OrganizationsContext";
import {TaskProvider} from "./contexts/TaskContext";
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import {useEffect, useState} from "react";
import LoadingBlock from "./components/util/LoadingBlock.jsx";
import {RoadmapProvider} from "./contexts/RoadmapContext.jsx";
import {AlwaysScrollToTop} from "./components/util/scroll.jsx";
import {ContactProvider} from "./contexts/ContactsContext.jsx";
import {RolesProvider, useRoles} from "./contexts/PermissionContext.jsx";
import ApplicationRoutesConfig from "./pages/application-routes-config.jsx";


const ProviderWrapper = ({children}) => {
    return <OrganizationsProvider>
        <RolesProvider>
            <TaskProvider>
                <BadgeProvider>
                    <RoadmapProvider>
                        <ContactProvider>
                            <ResourcesProvider>
                                <I18nextProvider i18n={i18n}>
                                    {children}
                                </I18nextProvider>
                            </ResourcesProvider>
                        </ContactProvider>
                    </RoadmapProvider>
                </BadgeProvider>
            </TaskProvider>
        </RolesProvider>
    </OrganizationsProvider>
}

function ApplicationRoutesWrapper() {
    return useRoutes(ApplicationRoutesConfig);
}

function ApplicationContainer() {
    const {fetchRoles} = useRoles();
    const [ready, setReady] = useState(false);
    useEffect(() => {
        fetchRoles().finally(() => setReady(true));
    }, []);

    if (ready) {
        return <div className="w-100">
            <div className="w-100">
                <BrowserRouter basename={window.SETTINGS.APP_BASENAME}>
                    <AlwaysScrollToTop/>
                    <ApplicationRoutesWrapper/>
                </BrowserRouter>
            </div>
        </div>;
    } else {
        return <LoadingBlock processing={true}/>
    }
}

function App() {
    return <ProviderWrapper>
        <ApplicationContainer/>
    </ProviderWrapper>
}

export default App;
