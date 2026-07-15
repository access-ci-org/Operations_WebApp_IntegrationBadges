import {useState} from "react";
import {Nav} from "react-bootstrap";

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function FAQ1() {

    function handleHashNavigation() {
        if (window.location.hash) {
            var accordionElementId = window.location.hash.replace("#", "");
            var accordionElement = document.getElementById(accordionElementId + "_body");
            var accordionElementHeader = document.getElementById(accordionElementId);
            var accordionButton = accordionElementHeader.querySelector(".accordion-button");
            if (accordionElement) {
                accordionElementHeader.scrollIntoView({behavior: "smooth"});

                // eslint-disable-next-line no-undef
                var accordion = new bootstrap.Collapse(accordionElement, {toggle: false});

                if (accordion) accordion.show();
                if (accordionButton) accordionButton.classList.toggle('collapsed');
            }
        }
    }

    function initAccordionActions() {
        document.querySelectorAll('.accordion-header').forEach(accordionHeader => {
            accordionHeader.addEventListener('click', (e) => {
                const copyButton = e.target.closest('.copy-btn');
                const accordionButton = e.target.closest('.accordion-button');
                if (copyButton) {
                    // Extract the link hash
                    const uniqueLink = location.origin + location.pathname + copyButton.getAttribute('data-link');

                    // Copy to clipboard
                    navigator.clipboard.writeText(uniqueLink).then(function () {
                        setCopyStatus(copyButton, true);
                    }, function () {
                        setCopyStatus(copyButton, false);
                    });
                } else if (accordionButton) {
                    var accordionElementId = accordionHeader.getAttribute('id');
                    var accordionElement = document.getElementById(accordionElementId + "_body");
                    if (accordionElement) {

                        // eslint-disable-next-line no-undef
                        var accordion = new bootstrap.Collapse(accordionElement, {toggle: false});

                        if (accordion) {
                            accordion.toggle();
                            accordionButton.classList.toggle('collapsed');
                        }
                    }
                }
            });
        });

        function setCopyStatus(button, isSuccess) {
            const icon = button.querySelector('i');

            if (isSuccess) {
                icon.className = "bi bi-check-lg fs-5 text-primary";
            } else {
                icon.className = "bi bi-x-lg fs-5 text-danger";
            }

            // Reset back to normal link icon after 1.5 seconds
            setTimeout(() => {
                icon.className = "bi bi-link fs-5 text-primary";
            }, 1500);
        }
    }

    window.addEventListener('DOMContentLoaded', handleHashNavigation);
    window.addEventListener('hashchange', handleHashNavigation);

    window.addEventListener('DOMContentLoaded', initAccordionActions);

    const [activeTabId, setActiveTabId] = useState("account-setup-and-management-tab");

    const faqSections = [
        {
            "tabId": "account-setup-and-management-tab",
            "tabPanelId": "account-setup-and-management-panel",
            "title": "Account Setup & Management",
            "subsections": [
                {
                    "title": "Getting Started",
                    "items": [
                        {
                            "question": "How can I register for an ACCESS ID?",
                            "anchorHash": "register_access_id",
                            "content": <ul className="mb-0">
                                <li>
                                    To register and create an ACCESS ID, please visit the ACCESS registration page:
                                    <a className="ms-2 me-2" href='https://registry.access-ci.org/registry/auth/login'>
                                        https://registry.access-ci.org/registry/auth/login</a>
                                </li>
                                <li>
                                    Already have an <strong>XSEDE account?</strong> Use the
                                    <strong>“ACCESS CI (XSEDE)”</strong> option to log in, no new
                                    account or password change needed.
                                </li>
                                <li>
                                    Avoid creating duplicate accounts. If you need help recovering your username or
                                    password, use the reminder/reset links (<a
                                    href='https://registry.access-ci.org/registry/krb_authenticator/krbs/ssr/authenticatorid:1'>
                                    https://registry.access-ci.org/registry/krb_authenticator/krbs/ssr/authenticatorid:1</a>)
                                    or contact support.
                                </li>
                            </ul>
                        },
                        {
                            "question": "Can I use my existing XSEDE account with ACCESS?",
                            "anchorHash": "xsede_access_account",
                            "content": <ul className="mb-0">
                                <li>
                                    Yes, your ACCESS ID is the same as your XSEDE Portal account. Please do not create a
                                    new ACCESS ID. You do not need to change your password or your Duo registration
                                    during the transition from XSEDE to ACCESS.
                                </li>
                            </ul>
                        },
                        {
                            "question": "Which identity provider should I choose when logging in?",
                            "anchorHash": "idp_login_choice",
                            "content": <ul className="mb-0">
                                <li>
                                    Select the “ACCESS CI” identity provider to log in with your ACCESS/XSEDE username
                                    and password.
                                </li>
                                <li>
                                    If you would like to log in to ACCESS using an identity provider other than “ACCESS
                                    CI”, you need to link your identity from that other identity provider with your
                                    ACCESS ID. Please proceed to the
                                    <a className="ms-2 me-2" href="https://identity.access-ci.org/id-linking">
                                        identity linking</a> page for details.
                                </li>
                            </ul>
                        },
                        {
                            "question": "Why doesn’t my university appear in the list of identity providers?",
                            "anchorHash": "univ_idp_missing",
                            "content": <ul className="mb-0">
                                <li>
                                    ACCESS uses identity providers from CILogon. Please visit
                                    <a className="ms-2 me-2"
                                       href='https://www.cilogon.org/faq'>https://www.cilogon.org/faq</a>
                                    for details.
                                </li>
                            </ul>
                        }
                    ]
                },
                {
                    "title": "Logging In & Authentication",
                    "items": [
                        {
                            "question": "How can I request a reminder of my ACCESS username?",
                            "anchorHash": "username_reminder",
                            "content": <ul className="mb-0">
                                <li>
                                    Please visit
                                    <a className="ms-2 me-2" href='https://identity.access-ci.org/username-reminder'>
                                        https://identity.access-ci.org/username-reminder</a>
                                    to request a username reminder by email.
                                </li>
                            </ul>
                        },
                        {
                            "question": "How can I reset my ACCESS password?",
                            "anchorHash": "password_reset",
                            "content": <ul className="mb-0">
                                <li>
                                    Please visit
                                    <a className="ms-2 me-2" href='https://identity.access-ci.org/password-reset'>
                                        https://identity.access-ci.org/password-reset</a>
                                    to reset your ACCESS password.
                                </li>
                            </ul>
                        },
                        {
                            "question": "How can I manage ACCESS Multi-Factor Authentication (MFA)?",
                            "anchorHash": "mfa_management",
                            "content": <ul className="mb-0">
                                <li>
                                    You can manage Multi-Factor Authentication (MFA) for your ACCESS account at
                                    <a className="ms-2" href='https://identity.access-ci.org/manage-mfa'>
                                        https://identity.access-ci.org/manage-mfa</a>.
                                    This page walks you through updating or managing your Duo Security settings, which
                                    many ACCESS services use to provide an additional layer of protection beyond your
                                    username and password.
                                </li>
                            </ul>
                        },
                        {
                            "question": "I’m having trouble with Duo. How do I update my Duo configuration?",
                            "anchorHash": "duo_config",
                            "content": <ul className="mb-0">
                                <li>
                                    Please visit
                                    <a className="ms-2 me-2" href="https://identity.access-ci.org/manage-mfa">
                                        https://identity.access-ci.org/manage-mfa</a>
                                    for instructions on managing your Duo configuration for ACCESS.
                                </li>
                            </ul>
                        },
                        {
                            "question": "How do I clear or reset my CILogon browser cookies?",
                            "anchorHash": "cilogon_cookie_reset",
                            "content": <ul className="mb-0">
                                <li>
                                    If you are having trouble logging in, it may help to click the "Delete ALL" button
                                    at
                                    <a className="ms-2 me-2" href="https://cilogon.org/me/">https://cilogon.org/me/</a>
                                    to reset your CILogon browser cookies, then try again to log in.
                                </li>
                            </ul>
                        },
                        {
                            "question": "How do I log out?",
                            "anchorHash": "logout",
                            "content": <ul className="mb-0">
                                <li>
                                    Please visit <a className="ms-2 me-2" href="https://cilogon.org/logout">
                                    https://cilogon.org/logout</a> to log out of your CILogon session.
                                </li>
                            </ul>
                        },
                        {
                            "question": "I’m having trouble logging in to an ACCESS Resource Provider. How can I get assistance?",
                            "anchorHash": "rp_login_trouble",
                            "content": <ul className="mb-0">
                                <li>
                                    Please review
                                    <a className="ms-2 me-2" href="https://access-ci.atlassian.net/wiki/x/n4qyBw">
                                        ACCESS RP Documentation</a>
                                    for login details and support contacts for each resource provider.
                                </li>
                                <li>
                                    If you’re not able to get assistance directly from the resource provider, please
                                    <a className="ms-2 me-2" href="https://support.access-ci.org/open-a-ticket">
                                        open a ticket</a> with ACCESS.
                                </li>
                            </ul>
                        }
                    ]
                },
                {
                    "title": "Account Management",
                    "items": [
                        {
                            "question": "How do I update my profile information (name, email, organization)?",
                            "anchorHash": "update_profile_info",
                            "content": <ul>
                                <li>You can view and update your profile by logging into the ACCESS Registry and
                                    selecting “Profile: View and edit your profile.” To modify your name or email
                                    address, click on the gear icon next to the respective information. If you change
                                    your email, you will need to verify it by checking your inbox for a confirmation
                                    email.
                                </li>
                                <li>To modify the organization associated with your ACCESS ID, you have two options:
                                    <ul>
                                        <li>Open a support ticket to request the change.</li>
                                        <li>Log into ACCESS Allocations and visit your profile under the "Additional
                                            Information" section to select a new organization. Note that this change may
                                            take up to 24 hours to be reflected.
                                        </li>
                                    </ul>
                                </li>
                                <li>For further details, you can visit: <a
                                    href='https://operations.access-ci.org/identity/profile-update'>https://operations.access-ci.org/identity/profile-update</a>
                                </li>
                            </ul>
                        },
                        {
                            "question": "How do I change the organization listed in my ACCESS profile?",
                            "anchorHash": "change_access_org",
                            "content": <ul>
                                <li>
                                    Please <a className="ms-2 me-2" href="https://support.access-ci.org/open-a-ticket">
                                    open a ticket</a> to request the change.
                                </li>
                            </ul>
                        },
                        {
                            "question": "How can I link or unlink external accounts (e.g., GitHub, Google, Microsoft, ORCID, or University account)?",
                            "anchorHash": "link_unlink_external_accounts",
                            "content": <ul>
                                <li><strong>To link an external account:</strong>
                                    <ul>
                                        <li>
                                            Log in to the ACCESS
                                            <a className="ms-2" href="https://registry.access-ci.org/">
                                                COmanage Registry</a>.
                                        </li>
                                        <li>Click on your name in the upper-right corner.</li>
                                        <li>Select “Link another account” from the dropdown menu.</li>
                                        <li>Click the "BEGIN" button on the "Link another account" page.</li>
                                        <li>Choose the appropriate identity provider (e.g., university, GitHub, Google,
                                            etc.). Do NOT choose "ACCESS CI (XSEDE)".
                                        </li>
                                        <li>Log in with that provider and follow the prompts to complete the linking
                                            process.
                                        </li>
                                    </ul>
                                </li>
                                <li><strong>To unlink an external account:</strong>
                                    <ul>
                                        <li>Log in to ACCESS Support.</li>
                                        <li>Open a support ticket and provide your ACCESS ID along with details of the
                                            linked account you wish to unlink.
                                        </li>
                                        <li>For detailed instructions and to initiate these actions, you can visit the
                                            identity
                                            linking page:
                                            <a className="ms-2"
                                               href='https://operations.access-ci.org/identity/id-linking'>
                                                https://operations.access-ci.org/identity/id-linking</a>.
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        },
                        {
                            "question": "I accidentally created multiple ACCESS IDs. Can I merge them?",
                            "anchorHash": "merge_access_ids",
                            "content": <ul>
                                <li>
                                    Yes, please
                                    <a className="ms-2 me-2" href="https://support.access-ci.org/open-a-ticket">
                                        open a ticket</a>
                                    indicating which ACCESS ID you want to continue using and which one(s) you want
                                    marked as duplicate.
                                </li>
                            </ul>
                        },
                        {
                            "question": "How do I manage my SSH keys?",
                            "anchorHash": "ssh_keys_management",
                            "content": <ul>
                                <li>
                                    You can view and update your SSH Keys by logging into the
                                    <a className="ms-2 me-2" href="https://registry.access-ci.org/">ACCESS Registry</a>
                                    and selecting “SSH Key: Manage your SSH keys for Resource Providers.” Click "+ Add
                                    SSH Key" in the upper-right corner. Then click the "Browse…" button to select your
                                    public SSH key. Finally, click the "UPLOAD" button.
                                </li>
                                <li className="list-unstyled d-flex flex-row pt-3">
                                    <div className="align-content-center pe-2">
                                        <div className="bi bi-eye-fill fs-2 text-primary"></div>
                                    </div>
                                    <a className="align-content-center ms-2 btn btn-link flex-fill"
                                       href="https://support.access-ci.org/video-learning-center#video-ssh">
                                        Watch Video <br/>
                                        Introduction to SSH Keys
                                    </a>
                                </li>
                            </ul>
                        },
                        {
                            "question": "How do I view information about my authenticated identity?",
                            "anchorHash": "view_auth_identity",
                            "content": <ul>
                                <li>
                                    Visit
                                    <a className="ms-2 me-2" href='https://cilogon.org/me/'>https://cilogon.org/me/</a>
                                    to view the "Session Variables" associated with your authenticated identity,
                                    including your selected identity provider.
                                </li>
                            </ul>
                        }
                    ]
                },
                {
                    "title": "Support & Troubleshooting",
                    "items": [
                        {
                            "question": "How can I report an account issue?",
                            "anchorHash": "report_account_issue",
                            "content": <ul className="mb-0">
                                <li>
                                    You can open a support ticket through the ACCESS ticketing system at
                                    <a className="ms-2" href='https://support.access-ci.org/open-a-ticket'>
                                        https://support.access-ci.org/open-a-ticket</a>.
                                    Include detailed information about your issue to help the team respond quickly and
                                    effectively.
                                </li>
                            </ul>
                        },
                        {
                            "question": "How can I request support with my ACCESS ID?",
                            "anchorHash": "support_access_id",
                            "content": <ul className="mb-0">
                                <li>
                                    You can open a support ticket through the ACCESS ticketing system at
                                    <a className="ms-2 me-2" href='https://support.access-ci.org/open-a-ticket'>
                                        https://support.access-ci.org/open-a-ticket</a>.
                                    Include detailed information about your issue to help the team respond quickly and
                                    effectively.
                                </li>
                            </ul>
                        }
                    ]
                },
                {
                    "title": "For Resource Providers Only (including identity management developers)",
                    "items": [
                        {
                            "question": "Can I configure my web application to require authentication using the ACCESS CI Identity Provider (IdP)?",
                            "anchorHash": "oidc_access_idp",
                            "content": <ul className="mb-0">
                                <li>
                                    By default, when you
                                    <a className="ms-2" href="https://identity.access-ci.org/register-app">
                                        register your web application</a>, ACCESS users will be able to log
                                    in using any identity provider supported by CILogon that is linked to their ACCESS
                                    ID, and the resulting id_token will contain the user’s ACCESS ID (i.e., “sub”:
                                    “username@access-ci.org”). This is the recommended configuration, because it allows
                                    users to log in without needing an ACCESS-specific username and password.
                                </li>
                                <li>However, if you want to require authentication using the ACCESS CI IdP (e.g., to
                                    require ACCESS multi-factor authentication), please contact <a
                                        href='mailto:help@cilogon.org' className="ms-2">help@cilogon.org</a> to request
                                    this configuration to be applied to your client. Include your registered client_id
                                    in your request.
                                </li>
                            </ul>
                        },
                        {
                            "question": "What is the ACCESS “Named Configuration”?",
                            "anchorHash": "access_named_config",
                            "content": <ul className="mb-0">
                                <li>When you register an OIDC client with the ACCESS COmanage Registry, is it
                                    recommended you use a Named Configuration for “ACCESS OIDC client configuration v1”.
                                    This configuration does the following:
                                </li>
                                <li>
                                    Registers the following
                                    <a className="ms-2" href="https://www.cilogon.org/oidc#h.p_PEQXL8QUjsQm">scopes</a>:
                                    openid, email, profile, org.cilogon.userinfo
                                </li>
                                <li>Verifies that OIDC client transactions request the org.cilogon.userinfo scope</li>
                                <li>Checks that the user has an ACCESS account. If so, asserts “username@access-ci.org”
                                    in the “sub” claim. If not, redirects the user to an appropriate error page.
                                </li>
                                <li>Checks if the user is in the “AccessDenied” group. If so, redirects the user to an
                                    appropriate error page.
                                </li>
                            </ul>
                        },
                        {
                            "question": "Why does my OIDC Client not show the ACCESS “skin” (i.e. CSS) when authenticating?",
                            "anchorHash": "oidc_skin_issue",
                            "content": <ul className="mb-0">
                                <li>
                                    There is a server-side configuration which automatically applies the
                                    <a className="ms-2 me-2" href="https://cilogon.org/?skin=access">ACCESS skin</a>
                                    for OIDC clients with a redirect_uri in the access-ci.org domain. This skin changes
                                    the CSS for the “Select an Identity Provider” page, and also selects “ACCESS CI” as
                                    the initial IdP for new visitors to the site. However, your OIDC client might have a
                                    redirect_uri in some other domain. In this case, the ACCESS “skin” would not be
                                    applied. To fix this, please contact
                                    <a href='mailto:help@cilogon.org'
                                       className="ms-2">help@cilogon.org</a>
                                    with your registered client_id and request that the ACCESS “skin” be applied to your
                                    client.
                                </li>
                            </ul>
                        },
                        {
                            "question": "Can I get a mapping from CILogon DNs to ePPN values to help with the GCSv4 to GCSv5 transition?",
                            "anchorHash": "cilogon_dn_eppn_map",
                            "content": <ul className="mb-0">
                                <li>
                                    Yes, please send a list of DNs to
                                    <a href='mailto:help@cilogon.org' className="ms-2">help@cilogon.org</a>,
                                    and the CILogon team can provide the mapping.
                                </li>
                            </ul>
                        },
                        {
                            "question": "Why does my OIDC client require users to re-authenticate so frequently?",
                            "anchorHash": "oidc_reauth_freq",
                            "content": <ul className="mb-0">
                                <li>
                                    If you are using
                                    <a className="ms-2" href="https://github.com/zmartzone/mod_auth_openidc">
                                        mod_auth_openidc</a>,
                                    please be sure to configure OIDCSessionInactivityTimeout. Visit
                                    <a className="ms-2 me-2" href='https://www.cilogon.org/oidc#h.p_1_IG_eaP90Ty'>
                                        https://www.cilogon.org/oidc#h.p_1_IG_eaP90Ty</a> for details.
                                </li>
                                <li>You may also need to enable Refresh Tokens in your web app registration.</li>
                            </ul>
                        }
                    ]
                }
            ]
        },

        {
            "tabId": "policies-tab",
            "tabPanelId": "policies-panel",
            "title": "Policies",
            "subsections": [
                {
                    "title": "Acceptable Use",
                    "items": [
                        {
                            "question": "What is an Acceptable Use Policy?",
                            "anchorHash": "aup_definition",
                            "content": <ul className="mb-0">
                                <li>
                                    An Acceptable Use Policy (AUP) defines the guidelines and rules for using ACCESS
                                    resources responsibly and ethically. All users must agree to
                                    <a className="ms-2" href="https://access-ci.org/acceptable-use/">these terms</a>.
                                </li>
                            </ul>
                        },
                        {
                            "question": "How can I review and agree with the Acceptable Use Policy (AUP)?",
                            "anchorHash": "review_agree_aup",
                            "content": <ul className="mb-0">
                                <li>
                                    You can review and agree to the Acceptable Use Policy by logging into your ACCESS
                                    account and following the prompts.
                                    <a className="ms-2 me-2" href="https://access-ci.org/acceptable-use/">The policy</a>
                                    outlines your responsibilities and the
                                    terms of service. Here is a link to step-by-step instructions:
                                    <a className="ms-2 me-2"
                                       href='https://operations.access-ci.org/identity/review-aup'>
                                        https://operations.access-ci.org/identity/review-aup</a>
                                </li>
                            </ul>
                        }
                    ]
                },
                {
                    "title": "Privacy Use",
                    "items": [
                        {
                            "question": "How does ACCESS handle my personal information?",
                            "anchorHash": "access_privacy_info",
                            "content": <ul className="mb-0">
                                <li>
                                    ACCESS is committed to protecting your privacy. Please review our
                                    <a className="ms-2 me-2"
                                       href='https://access-ci.org/privacy-policy/'>privacy policy</a>
                                    for detailed information about how we collect, use, and protect your personal data.
                                </li>
                            </ul>
                        }
                    ]
                }
            ]
        },

        {
            "tabId": "ticketing-system-tab",
            "tabPanelId": "ticketing-system-panel",
            "title": "Ticketing System",
            "subsections": [
                {
                    "title": "For Researchers",
                    "items": [
                        {
                            "question": "How do I submit a ticket?",
                            "anchorHash": "submit_ticket",
                            "content": <ul className="mb-0">
                                <li>
                                    You may submit a ticket to the ACCESS ticketing system by following the directions
                                    on our
                                    <a className="ms-2 me-2" href='https://support.access-ci.org/help-ticket'>
                                        support page</a>.
                                </li>
                            </ul>
                        }
                    ]
                }
            ]
        }
    ];

    return (<div className="container">
        {/*<style>*/}
        {/*    .accordion-header .copy-btn {*/}
        {/*        opacity: 0;*/}
        {/*    }*/}
        {/*    .accordion-header:hover .copy-btn {*/}
        {/*        opacity: 1;*/}
        {/*    }*/}
        {/*</style>*/}

        <div className="w-100" id="faqAccordionList">

            <div className="w-100 pb-5 mb-5">

                <h1 className="w-100 p-3 pt-5 text-dark">
                    Frequently Asked <br/>
                    Questions
                </h1>

                <Nav variant="underline" activeKey={activeTabId} onSelect={setActiveTabId}
                     className="pe-3 justify-content-end">
                    {faqSections.map((section, sectionIndex) => <Nav.Item key={sectionIndex} className="ps-4 pe-4">
                        <Nav.Link eventKey={section.tabId}>
                            {section.title}
                        </Nav.Link>
                    </Nav.Item>)}
                </Nav>
            </div>
            {faqSections.map((section, sectionIndex) => {
                if (section.tabId !== activeTabId) return;

                return <div className="w-100" key={sectionIndex} id={section.tabId}>
                    <h2 className="w-100 p-3 pt-5 visually-hidden">{section.title}</h2>
                    {section.subsections && section.subsections.map((subsection, subsectionIndex) => {
                        const accordionId = `accordion_${sectionIndex}_${subsectionIndex}`;

                        return <div className="w-100" key={subsectionIndex}>
                            <h3 className="w-100 ps-5 pe-3 pb-2 text-black fw-bold fs-5">{subsection.title}</h3>
                            <div className="w-100 ps-3 pe-3 pb-4">
                                <div className="accordion" id={accordionId}>

                                    {subsection.items.map((subsectionItem, subsectionItemIndex) => {
                                        subsectionItemIndex = subsectionItem.anchorHash;

                                        return <div className="accordion-item" key={subsectionItemIndex}>
                                            <div className="accordion-header"
                                                 id={`${subsectionItemIndex}`}>

                                                <div className="fw-normal accordion-button collapsed"
                                                     role="button"
                                                     data-bs-target={`#${subsectionItemIndex}_body`}
                                                     aria-expanded="false"
                                                     aria-controls={`${subsectionItemIndex}_body`}>
                                                    <h4 className="mb-0 fs-6 fw-normal text-black font-family-inter">
                                                        {subsectionItem.question}</h4>
                                                    <div>
                                                        <button
                                                            className="copy-btn btn btn-sm btn-outline-gray-400 width-fit-content lh-1 border-0 rounded-5 ms-2"
                                                            type="button" title="Copy link"
                                                            data-link={`#${subsectionItemIndex}`}>
                                                            <i className="bi bi-link fs-5 text-primary">&nbsp;</i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id={`${subsectionItemIndex}_body`}
                                                 className="accordion-collapse collapse"
                                                 aria-labelledby={`${subsectionItemIndex}`}>
                                                <div
                                                    className="accordion-body bg-white fs-8 text-gray-600 font-family-inter lh-lg pt-3 pe-5">
                                                    {subsectionItem.content}
                                                </div>
                                            </div>
                                        </div>
                                    })}


                                </div>
                            </div>
                        </div>
                    })}
                </div>
            })}
        </div>

    </div>);
}