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
                            "question": "How can I create an ACCESS account?",
                            "anchorHash": "register_access_id",
                            "content": <ul className="mb-0">
                                <li>
                                    To create an ACCESS account you must first
                                    <a className="ms-2" href="https://account.access-ci.org/register">register for
                                        an ACCESS ID</a>.
                                    Do not create more than one ACCESS ID. If you have trouble registering, please
                                    <a className="ms-2" href="https://support.access-ci.org/open-a-ticket">open a
                                        ticket</a>.
                                </li>
                            </ul>
                        },
                        {
                            "question": "Can I use my existing XSEDE account with ACCESS?",
                            "anchorHash": "xsede_access_account",
                            "content": <ul className="mb-0">
                                <li>
                                    Yes, your ACCESS ID is the same as your XSEDE Portal account username. Please do not
                                    create a new ACCESS ID. See below if you need to reset your password.
                                </li>
                            </ul>
                        }
                    ]
                },
                {
                    "title": "Logging In & Authentication",
                    "items": [
                        {
                            "question": "Which identity provider should I choose when logging in to ACCESS?",
                            "anchorHash": "idp_login_choice",
                            "content": <ul className="mb-0">
                                <li>
                                    Select the same identity provider you used when you registered for your ACCESS
                                    account. If you usually log in with your university user name and password, select
                                    your university as the identity provider. If you usually log in with your ACCESS ID
                                    and password, select "ACCESS CI (XSEDE)".
                                </li>
                            </ul>
                        },
                        {
                            "question": "Why doesn’t my university appear in the list of identity providers?",
                            "anchorHash": "univ_idp_missing",
                            "content": <ul className="mb-0">
                                <li>
                                    ACCESS uses identity providers from
                                    <a className="ms-2" href="https://www.cilogon.org/">CILogon</a>.
                                    If your university is not listed, simply choose “ACCESS CI (XSEDE)”.
                                </li>
                            </ul>
                        },
                        {
                            "question": "How can I request a reminder of my ACCESS ID?",
                            "anchorHash": "username_reminder",
                            "content": <ul className="mb-0">
                                <li>
                                    Please visit
                                    <a className="ms-2 me-2" href="https://account.access-ci.org/register">
                                        ACCESS Registration</a>
                                    and enter your email address. If there is an existing ACCESS account associated with
                                    your email address, you will be shown your ACCESS ID after verifying your email.
                                </li>
                            </ul>
                        },
                        {
                            "question": "How can I reset my ACCESS password?",
                            "anchorHash": "password_reset",
                            "content": <ul className="mb-0">
                                <li>
                                    Please visit
                                    <a className="ms-2 me-2" href="https://account.access-ci.org/password">
                                        Change ACCESS Password</a>
                                    to reset your password.
                                </li>
                            </ul>
                        },
                        {
                            "question": "How can I manage ACCESS Multi-Factor Authentication (MFA)?",
                            "anchorHash": "mfa_management",
                            "content": <ul className="mb-0">
                                <li>
                                    If you are using “ACCESS CI (XSEDE)” to login you will be using Duo for MFA. If you
                                    login with your university account you will use your university MFA.
                                </li>
                            </ul>
                        },
                        {
                            "question": "How do I update my Duo configuration?",
                            "anchorHash": "duo_config",
                            "content": <ul className="mb-0">
                                <li>
                                    for instructions on managing your Duo configuration for ACCESS.
                                    ACCESS uses Duo for MFA. Learn how to
                                    <a className="ms-2" href="https://identity.access-ci.org/manage-mfa">
                                        manage your Duo configuration</a>.
                                </li>
                            </ul>
                        },
                        {
                            "question": "I’m having trouble logging into an ACCESS Resource. How can I get assistance?",
                            "anchorHash": "rp_login_trouble",
                            "content": <ul className="mb-0">
                                <li>
                                    Please review
                                    <a className="ms-2 me-2"
                                       href="https://access-ci.atlassian.net/wiki/spaces/ACCESSdocumentation/overview">
                                        ACCESS RP Documentation</a>
                                    for login details and support contacts for each resource provider.
                                </li>
                                <li>
                                    If you’re not able to get assistance directly from the resource provider, please
                                    <a className="ms-2" href="https://support.access-ci.org/open-a-ticket">
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
                                <li>
                                    You can view and update your profile by logging into
                                    <a className="ms-2 me-2" href="https://account.access-ci.org/">My ACCESS Account</a>
                                    and choosing "Profile".
                                </li>
                            </ul>
                        },
                        {
                            "question": "How can I link or unlink external accounts (e.g., GitHub, Google, Microsoft, ORCID, or University account)?",
                            "anchorHash": "link_unlink_external_accounts",
                            "content": <ul>
                                <li>
                                    Linked accounts allow you to log into ACCESS using an external account. To manage
                                    your linked accounts or link a new account, log into
                                    <a className="ms-2 me-2" href="https://account.access-ci.org/">My ACCESS Account</a>
                                    and choose "Linked Accounts".
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
                                        open a help ticket</a>
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
                                    You can view and update your SSH keys by logging into
                                    <a className="ms-2 me-2" href="https://account.access-ci.org/">My ACCESS Account</a>
                                    and choosing "SSH Keys".
                                </li>
                            </ul>
                        }
                    ]
                },
                {
                    "title": "Ticketing System",
                    "items": [
                        {
                            "question": "How do I submit a ticket?",
                            "anchorHash": "submit_ticket",
                            "content": <ul className="mb-0">
                                <li>
                                    You may submit a ticket to the ACCESS ticketing system by following the directions
                                    on our
                                    <a className="ms-2" href="https://support.access-ci.org/help-ticket">
                                        support page</a>.
                                </li>
                            </ul>
                        }
                    ]
                },
                {
                    "title": "Support & Troubleshooting",
                    "items": [
                        {
                            "question": "How can I request support with my account?",
                            "anchorHash": "support_access_id",
                            "content": <ul className="mb-0">
                                <li>
                                    Please
                                    <a className="ms-2" href="https://support.access-ci.org/open-a-ticket">
                                        open a help ticket</a>.
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
                                    When you
                                    <a className="ms-2" href="https://identity.access-ci.org/register-app">
                                        register your web application</a>,
                                    ACCESS users will be able to log in using any identity provider supported by CILogon
                                    that is linked to their ACCESS ID, and the resulting id_token will contain the
                                    user’s ACCESS ID (i.e., “sub”: “username@access-ci.org”). This is the recommended
                                    configuration, because it allows users to log in without needing an ACCESS-specific
                                    username and password.
                                </li>
                                <li>
                                    If you want to restrict authentication of the ACCESS CI IdP (to require ACCESS
                                    multi-factor authentication), please contact
                                    <a href="mailto:help@cilogon.org" className="ms-2 me-2">help@cilogon.org</a>
                                    to request this configuration to be applied to your client. Include your registered
                                    client_id in your request.
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
                                    <a href="mailto:help@cilogon.org" className="ms-2 me-2">help@cilogon.org</a>
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
                                    <a href="mailto:help@cilogon.org" className="ms-2">help@cilogon.org</a>,
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
                                    <a className="ms-2 me-2" href="https://www.cilogon.org/oidc#h.p_1_IG_eaP90Ty">
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
                            "question": "How can I review and agree with the Acceptable Use Policy (AUP)?",
                            "anchorHash": "aup_definition",
                            "content": <ul className="mb-0">
                                <li>
                                    An Acceptable Use Policy (AUP) defines the guidelines and rules for using ACCESS
                                    resources responsibly and ethically. All users must agree to
                                    <a className="ms-2 me-2" href="https://access-ci.org/acceptable-use/">
                                        these terms</a>
                                    when setting up an account and registering for an ACCESS ID.
                                </li>
                            </ul>
                        }
                    ]
                },
                {
                    "title": "Allocations",
                    "items": [
                        {
                            "question": "Where can I find ACCESS Allocation policies?",
                            "anchorHash": "allocation_policies",
                            "content": <ul className="mb-0">
                                <li>
                                    If you are looking for policies related to your specific ACCESS Allocation you can
                                    find them
                                    <a className="ms-2"
                                       href="https://allocations.access-ci.org/allocations-policy">here</a>.
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
                                    <a className="ms-2 me-2" href="https://access-ci.org/privacy-policy/">
                                        privacy policy</a>
                                    for detailed information about how we collect, use, and protect your personal data.
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