function getResourcePermissionTicketObject({resource, resourceGroup, roles}) {
    return {
        "summary": `Request permission for ${resourceGroup.group_descriptive_name} Resource Group (for ${resource.short_name})`,
        "description": `
I am a staff working/collaborating with ACCESS Resource Integration workflows. Permission to the **${resourceGroup.group_descriptive_name}** resource group is required to continue work on the specific **${resource.short_name}** resource roadmap. The specific page I’m looking at is linked below.

   <-- please include more information here -->

**Integration Dashboard Web Application URL**: ${window.location.href}

**Resource Group**: ${resourceGroup.group_descriptive_name} (${resourceGroup.info_groupid})

**Resource**: ${resource.short_name} (${resource.info_resourceid})

**Requested Role**: ${getRolesListString(roles)} (either one of the roles)

**Timestamp**: ${new Date().toString()}`
    }
}

function getApiRequestFailingTicketObject({error}) {
    // const requestUrl = error.config?.url || 'Unknown';
    // const requestUrl = error.request?.responseURL || 'Unknown';
    const requestUrl = error.config.baseURL
        ? `${error.config.baseURL.replace(/\/$/, '')}/${error.config.url.replace(/^\//, '')}`
        : error.config.url;

    const requestMethod = error.config?.method?.toUpperCase() || 'Unknown';
    const requestBody = JSON.stringify(error.config?.body || {}, null, 2);
    const requestParams = JSON.stringify(error.config?.params || {}, null, 2);

    const responseStatusCode = error.response?.status || 'NETWORK_ERROR (No status code available)';
    const responseStatusText = error.response?.statusText || '';
    const response = JSON.stringify(error.response?.data || 'None (Connection failed or was blocked)');

    return {
        "summary": `[Bug] Integration Dashboard ${responseStatusCode} Error - API Request Failure`,
        "description": `
I am a staff member working/collaborating with the Integration Dashboard. I’m unable to continue my work because some parts of the application are experiencing errors due to failing API requests returning ${responseStatusCode} ${responseStatusText}  status codes.

   <-- please include more information here -->

**Integration Dashboard Web Application URL**: ${window.location.href}

**Failing API Request**: ${requestMethod} ${requestUrl}

**Status Code**: ${responseStatusCode} ${responseStatusText} 

**Params**: ${requestParams}

**Body**: ${requestBody}

**Response**: ${response}

**Error Stack**: ${error.stack}

**Timestamp**: ${new Date().toString()}`
    }
}

function getApplicationErrorTicketObject({error}) {
    return {
        "summary": `[Bug] Integration Dashboard Application Error`,
        "description": `
I am a staff member working/collaborating with the Integration Dashboard. I’m unable to continue my work because some parts of the application are experiencing errors.

   <-- please include more information here -->

**Integration Dashboard Web Application URL**: ${window.location.href}

**Error Stack**: ${error.stack}

**Timestamp**: ${new Date().toString()}`,
    }
}

export const JSM_TICKET_TEMPLATE = {
    RESOURCE_PERMISSION: getResourcePermissionTicketObject,
    API_REQUEST_FAILING: getApiRequestFailingTicketObject,
    APPLICATION_ERROR: getApplicationErrorTicketObject
};

function getRolesListString(roles) {
    if (!roles) return "NA";

    let rolesString = "";
    for (const roleIndex in roles) {
        if (roleIndex > roles.length - 1) rolesString += ", OR ";
        else if (roleIndex > 0) rolesString += ", ";
        rolesString += roles[roleIndex];
    }

    return rolesString;
}


export function getInternalACCESSResourceProviderRequestUrl(jsmTicketType, args) {

    let {summary, description} = jsmTicketType(args);

    let ticketCreationUrl = "https://access-ci.atlassian.net/servicedesk/customer/portal/2/group/3/create/32";

    summary = encodeURIComponent(summary);

    description = encodeURIComponent(description);
    description = description.trim().replace(/\n/g, '\n ');
    description = description.replace(/%2A%2A/g, '**');

    ticketCreationUrl += `?summary=${summary}&description=${description}`;
    ticketCreationUrl += "&customfield_10116=11129" // "ACCESS Operational Support Issues" --> "Resource Integration"

    return ticketCreationUrl;
}