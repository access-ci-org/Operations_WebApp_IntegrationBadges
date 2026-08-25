# Changelog

The general format of entries is:

## <--tag--> <--yyyy-->-<--mm-->-<--dd--> <--author-->

1. [new/fix/bug-fix/draft/dependency] <description of the fix, feature or change>
    - `/<webapp path 1>/<1>`
    - `/<webapp path 2>/<2>`

## v1.21.1 2026-08-25 dinukadesilva

1. [new] Including the page counts, examples and some documentation for routes (CTT-1052)
    - `/dev/application-routes`
    - `/dev/application-routes/:routeDetailsPath`

## v1.21.0 2026-08-20 dinukadesilva

1. [new] Splitting the about page for four pages for better organization(CTT-1052)
    - `/dev/application-configs`
    - `/dev/application-routes`
    - `/dev/application-routes/:routeDetailsPath`
2. [new] Adding the changelog to the website and changing it to a markdown format
    - `/dev/changelog`

3. [new] Adding the markdown files for each route

## v1.20.4 2026-08-13 dinukadesilva

1. [fix] Style fixes in contacts page (CTT-1038)
    - `/staff/contacts`

## v1.20.3 2026-08-13 dinukadesilva

1. [new] Enable the filter dropdowns of the contacts page to be sorted alphabetically (CTT-1038)
    - `/staff/contacts`

## v1.20.2 2026-08-13 dinukadesilva

1. [new] Adding an entry to "Become an RP" page FAQ for staff change requests (CTT-1043)
    - `/docs/why-become-an-rp`

## v1.20.1 2026-08-12 dinukadesilva

1. [fix] Fixing the examples of "Resource Roadmap" amd "Resource Roadmap Integration - EDIT" routes (CTT-1052)
    - `/about`

## v1.20.0 2026-08-12 dinukadesilva

1. [fix] Fixed the styles and some content of the drupal portal FAQ (CTT-1046)
    - https://operations.access-ci.org/faqs
2. [new] Adding the authentication required for all the routes except "/docs" (ATS-31580)
    - All
3. [new] Adding utilities for optimising and generalizing the error handling (CTT-1003)
    - None yet
4. [new] Improving the routes inventory to show the required authentication, roles and examples (CTT-1052)
    - `/about`

## v1.19.2 2026-08-04 dinukadesilva

1. [fix] Rename the routes summary table column headers (CTT-1052)
    - `/about`

## v1.19.1 2026-08-03 dinukadesilva

1. [fix] Fix the default status of task workflows to "not-completed"
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
2. [fix] Make the roadmap enrolments count to the number of resources (CTT-1052)
    - `/about`

## v1.19.0 2026-07-23 dinukadesilva

1. [fix] Enabling to view the available routes from about page (CTT-1052)
    - `/about`
2. [fix] Refactoring the resource-roadmap-badge-task context functions
    - All
3. [dependency] https://github.com/access-ci-org/Operations_Warehouse_Django/pull/98

## v1.18.13 2026-07-15 dinukadesilva

1. [fix] Fix variant colors.
    - All

## v1.18.12 2026-07-15 dinukadesilva

1. [fix] Lint fixes and source code refactoring (CTT-998)
    - All
2. [fix] Some accessibility fixes related form fields and focusable components (CTT-998)
    - `/staff/badges/:badgeId/edit`
    - `/staff/roadmaps/:roadmapId/edit`
    - `/resources/:resourceId/edit`
    - `/resources/:resourceId/roadmaps/:roadmapId`
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
3. [new] The javascript dependency should be imported as a module from this version onwards
    - This is due to certain dependencies are requiring that setting.
    - Eg: <script type="module" .... ></script>

## v1.18.[0-11] 2026-07-15 dinukadesilva

1. These versions were created for troubleshooting purposes and please disregard.

## v1.17.2 2026-07-02 dinukadesilva

1. [fix] NPM package audit fixes

## v1.17.1 2026-06-25 dinukadesilva

1. [bug-fix] Set the authorization of "Continue Setup" button on resources to coordinators and concierge (CTT-969)
    - `/organizations/:organizationId`

## v1.17.0 2026-06-25 dinukadesilva

1. [new] Style refactoring (CTT-1015)
    - All
2. [new] Fixing the new lines of long text contents in tasks, roadmaps, badges and badge
    - `/docs/badges`
    - `/docs/roadmaps`
    - `/staff/badges/new`
    - `/staff/roadmaps/new`
    - `/staff/badges/:badgeId/edit`
    - `/staff/roadmaps/:roadmapId/edit`
    - `/resources/:resourceId/edit`
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`

## v1.16.10 2026-06-15 dinukadesilva

1. [new] Enabling the roadmap links from staff roadmaps page
    - `/staff/roadmaps`

## v1.16.9 2026-06-11 dinukadesilva

1. [fix] Bug fix in the reducer to handle boolean values (CTT-969)
    - Everything in ## v1.16.0

## v1.16.[1-8] 2026-06-11 dinukadesilva

1. These were created for troubleshooting purposes and please disregard.

## v1.16.0 2026-06-10 dinukadesilva

1. [new] Enabling page wise authorization and login redirections (CTT-969)
    - `/resources/:resourceId/edit`
    - `/resources/:resourceId/roadmaps/:roadmapId/edit`
    - `/staff/roadmaps/new`
    - `/staff/roadmaps/:roadmapId/edit`
    - `/staff/badges/new`
    - `/staff/badges/:roadmapId/edit`
    - `/staff/contacts`

## v1.15.5 2026-06-04 dinukadesilva

1. [fix] Excluding the auth and redirect from exposed endpoints (CTT-969)
    - All

## v1.15.4 2026-06-04 dinukadesilva

1. [new] npm vulnerability fixes
    - All

## v1.15.3 2026-06-04 dinukadesilva

1. [new] Style improvements to the badge activity log
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
2. [new] Changing the order of badge statuses in the staff dashboard status highlight header (CTT-880)
    - `/staff`
    - `/staff/badge-status`
3. [new] Making the badge status styles consistent across (CTT-1000)
    - `/staff`
    - `/staff/badge-status`
    - `/resources/:resourceId/roadmaps/:roadmapId`
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`

## v1.15.2 2026-05-29 dinukadesilva

1. [new] Enabling to show the "required" status of badges in subsequent pages (CTT-880)
    - `/resources/:resourceId/roadmaps/:roadmapId`
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
2. [new] Enabling the badge exemption actions only for required badges (CTT-880)
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`

## v1.15.1 2026-05-28 dinukadesilva

1. [fix] Fixing the badge status summary counts in the staff dashboard (CTT-880)
    - `/staff`
    - `/staff/badge-status`

## v1.15.0 2026-05-28 dinukadesilva

1. [new] Enabling the exempt floor for badges (CTT-880)
    - `/staff`
    - `/staff/badge-status`
    - `/organizations/:organizationId`
    - `/resources/:resourceId/roadmaps/:roadmapId`
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
2. [dependency] https://github.com/access-ci-org/Operations_Warehouse_Django/pull/95 --> v3.79.0

## v1.14.1 2026-05-21 dinukadesilva

1. [bug-fix] Fixing the `APP_BASENAME` to correctly validate url
    - All

## v1.14.0 2026-05-21 dinukadesilva

1. [bug-fix] Fixing the badge verification button on the resource badge page (CTT-970)
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`

## v1.13.1 2026-05-15 dinukadesilva

1. [bug-fix] Enabling the `APP_BASENAME` to handle when the ending slash is missing
    - All the breadcrumbs

## v1.13.0 2026-05-15 dinukadesilva

1. [new] Badge status list view redesign (CTT-779)
    - `/staff/badge-status`
2. [new] Enhanced UI for resource badge activity log (CTT-936)
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
3. [dependency] https://github.com/access-ci-org/Operations_Warehouse_Django/pull/91 --> v3.78.0

## v1.12.8 2026-05-11 dinukadesilva

1. [fix] Fix the roadmap and badge info icon authorization (CTT-938)
    - `/staff`

## v1.12.7 2026-05-11 dinukadesilva

1. [new] Adding the staff document links (CTT-879)
    - `/staff`
2. [new] Enabling info icons on roadmaps and badges that navigates to the detail pages (CTT-938)
    - `/staff`
3. Improve warning messages (CTT-805)
    - `/staff/badges/:badgeId/edit`
    - `/staff/roadmaps/:roadmapId/edit`

## v1.12.6 2026-04-29 dinukadesilva

1. [fix] Enabling the "Contact Type" and "Resource Integrations Status" filters for contacts (CTT-871)
    - `/organizations`
    - `/organizations/:organizationId`
    - `/resources/:resourceId/roadmaps/:roadmapId`
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
    - `/staff/contacts`
2. [fix] Enabling the "resource_integration_status" from "resource-full" endpoint (CTT-871)
    - `/organizations/:organizationId`
3. [dependency] https://github.com/access-ci-org/Operations_Warehouse_Django/pull/89 --> v3.77.0

## v1.12.5 2026-04-23 dinukadesilva

1. [fix] Removing the trash buttons from roadmaps list in the staff dashboard (CTT-825)
    - `/staff`

## v1.12.3 2026-04-23 dinukadesilva

1. [fix] Enabling the "Badge Verification Status" block to show only when the count is more than zero (CTT-855)
    - `/organizations/:organizationId`

## v1.12.2 2026-04-21 dinukadesilva

1. [fix] Fix breadcrumb styles and links (CTT-892)
    - All

## v1.12.1 2026-04-21 dinukadesilva

1. [fix] Externalizing the `access-ci-ui` import from the production build (CTT-892)
    - All

## v1.12.0 2026-04-21 dinukadesilva

1. [new] Removing the task action confirmation popup (CTT-912)
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
2. [new] Enabling the `access-ci-ui` breadcrumb in the integration badges webapp (CTT-892)
    - All

## v1.11.11 2026-03-27 dinukadesilva

1. [new] Incorporate authorization for new roadmap integration, edit and rp badge review (CTT-891)
    - organizations/:organizationId
2. [new] Enabling the authorization of contacts summary component (CTT-871)
    - `/organizations`
    - `/organizations/:organizationId`
    - `/resources/:resourceId/roadmaps/:roadmapId`
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
3. [new] Adding the roles configuration to the about page (CTT-871)
    - `/about`

## v1.11.10 2026-03-20 dinukadesilva

1. [new] Making slight adjustment to the task workflow (CTT-826)

## v1.11.8 2026-03-20 dinukadesilva

1. [new] Fix the "permissions" endpoint renaming to "roles" (CTT-891)

## v1.11.7 2026-03-18 dinukadesilva

1. [new] Adding and enabling task workflow config (CTT-891)
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
2. [new] Style improvements and refactoring of contacts and collaborator interfaces (CTT-871)
    - Everything on ## v1.11.2
3. [new] Fix renamed endpoint urls (CTT-871)
    - All
4. [dependency] https://github.com/access-ci-org/Operations_Warehouse_Django/pull/87

## v1.11.6 2026-03-18 dinukadesilva

1. [fix] Minor fix in the permission fetch method (CTT-891)
    - All

## v1.11.5 2026-03-18 dinukadesilva

1. [fix] Minor improvements in the contacts components (CTT-871)
    - Everything on ## v1.11.2
2. [new] Enabling filtering by organization, resource, roadmap and badge (CTT-871)
    - Everything on ## v1.11.2
3. [new] Integrating the `permissions` endpoint to enable authorization (CTT-891)
    - All

## v1.11.4 2026-03-05 dinukadesilva

1. [fix] Enable to display the contacts summary to everyone (CTT-871)
    - Everything on ## v1.11.2

## v1.11.3 2026-03-05 dinukadesilva

1. [fix] Fix authentication in the contacts api fetch (CTT-871)
    - Everything on ## v1.11.2

## v1.11.2 2026-03-05 dinukadesilva

1. [new] Enable copy to clipboard button for contact email addresses (CTT-871)
    - `/organizations`
    - `/organizations/:organizationId`
    - `/resources/:resourceId/roadmaps/:roadmapId`
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
    - `/staff/contacts`
    - `/staff/contacts?resourceId=:resourceId`
    - `/staff/contacts?organizationId=:organizationId`

## v1.11.1 2026-03-05 dinukadesilva

1. [but-fix] Minor bug fix on the resource badge page breadcrumb

## v1.11.0 2026-03-05 dinukadesilva

1. [fix] Fixing the resource badge page breadcrumb
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
2. [new] Adding the contact/collaborator summary and modal to rp dashboard and resource pages (CTT-871)
    - `/organizations`
    - organizations/:organizationId
    - `/resources/:resourceId/roadmaps/:roadmapId`
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
2. [new] Adding staff contacts page (CTT-871)
    - `/staff/contacts`
    - `/staff/contacts?resourceId=:resourceId`
    - `/staff/contacts?organizationId=:organizationId`

## v1.10.8 2026-02-26 dinukadesilva

1. [bug-fix] Fix roadmap edit links in the staff dashboard (ATS-25110)

## v1.10.7 2026-02-24 dinukadesilva

1. [new] Improve the styles of accordions (CTT-537)
    - `/docs/why-become-an-rp`

## v1.10.6 2026-02-18 dinukadesilva

1. [new] Changing the order of staff badge status tabs (CTT-870)

## v1.10.5 2026-02-13 dinukadesilva

1. [new] Revised sections names in the RP dashboard (CTT-852)
    - `/organizations/:organizationId`

## v1.10.4 2026-02-13 dinukadesilva

1. [new] Adding the "Post-Production" section back (CTT-852)
    - `/organizations/:organizationId`

## v1.10.3 2026-02-12 dinukadesilva

1. [bug-fix] Fixing the browser back action from staff badge status page (CTT-872)
    - `/staff/dashboard`
    - `/staff/badge-status`

## v1.10.2 2026-02-12 dinukadesilva

1. [fix] Fixing the "View All" link of the "Badge Verification Status" section in the staff dashboard (CTT-870)
    - `/staff/dashboard`

## v1.10.1 2026-02-11 dinukadesilva

1. [bug-fix] Minor bug fix in the PR dashboard "In Progress" section (CTT-852)
    - `/organizations/:organizationId`

## v1.10.0 2026-02-11 dinukadesilva

1. [new] Revised staff dashboard (CTT-870)
    - `/staff/dashboard`

## v1.9.1 2026-02-10 dinukadesilva

1. [bug-fix] Fixing the query parameter names of the resources-full api call
    - `/resources/:resourceId/roadmaps/:roadmapId`

## v1.9.0 2026-02-09 dinukadesilva

1. [new] Updating the resource sections in the organization page (CTT-852)
    - `/organizations/:organizationId`
2. [dependency] https://github.com/access-ci-org/Operations_Warehouse_Django/pull/83

## v1.8.4 2026-01-30 dinukadesilva

1. [new] Changing the roadmap name keywords to "ACCESS Allocated|ACCESS Enabled|ACCESS Aligned|ACCESS" (CTT-764)
    - All

## v1.8.3 2026-01-28 dinukadesilva

1. [new] Moving the draft roadmaps to the bottom and enable "Draft" label
    - `/docs/roadmaps`

## v1.8.2 2026-01-23 dinukadesilva

1. [fix] Fix the "dark" and "medium" colors in many places.
    - All

## v1.8.1 2026-01-22 dinukadesilva

1. [fix] Fix the "Incomplete" toggle button styles (CTT-826)

## v1.8.0 2026-01-22 dinukadesilva

1. [new] Enable black and green text separation on roadmap names
    - `/staff/badge-status`
    - `/docs/roadmaps`
    - `/resources/:resourceId/edit (new enrollments)`
2. [new] Adding the latest documentation pages (CTT-537)
    - `/docs/why-become-an-rp`
    - `/docs/why-should-i-integrate-resources`
    - `/docs/how-to-integrate-resource`
    - `/docs/how-to-choose-roadmap`
    - `/docs/what-is-ticketing-system`

## v1.7.0 2026-01-06 dinukadesilva

1. [new] Enabling "Not Applicable" status for optional tasks (CTT-826)
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
2. [dependency] https://github.com/access-ci-org/Operations_Warehouse_Django/pull/79

## v1.6.3 2025-12-02 dinukadesilva

1. [new] Style improvements
    - `/docs/roadmaps`
    - `/docs/badges`

## v1.6.2 2025-12-02 dinukadesilva

1. [new] Removing the authorization header from the organizations, resources, roadmaps, badges and tasks get endpoints
    - All

## v1.6.1 2025-12-02 dinukadesilva

1. [new] Adding the graphic preview and upload to badge edit and review page (CTT-780)
    - `/staff/badges/:badgeId/edit`

## v1.6.0 2025-12-02 dinukadesilva

1. [new] Enabling a common design for new resource roadmap integration and edit (CTT-783)
    - `/resources/:resourceId/roadmaps/:roadmapId/edit`

## v1.5.0 2025-12-01 dinukadesilva

1. [new] Enabling the formatted editor for "Task Technical Summary" (CTT-785)
    - `/staff/badges/:badgeId/edit`
2. [bug-fix] Fix the concierge log to be refreshed when a status changed occurs (CTT-788)
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
3. [bug-fix] Fix the "RP Attention Needed" count displayed in the organisation page (CTT-814)
    - `/organizations/:organizationId`
4. [new] Rearrange the badge status page tabs and default tab (CTT-779)
    - `/staff/badge-status`
5. [dependency] https://github.com/access-ci-org/Operations_Warehouse_Django/pull/73

## v1.4.0 2025-11-25 dinukadesilva

1. [new] Rename all paths and references of "concierge" to "staff" (CTT-758)
    - All the paths starting with /staff
2. [fix] Fix the ckeditor5 editor to include underline (CTT-785)
    - `/staff/badges/:badgeId/edit`
    - `/staff/roadmaps/:roadmapId/edit`
3. [fix] Fix the ckeditor5 editor height to 200px (CTT-785)
    - Everything on (2)
4. [fix] Fix widths of badge and task cards (CTT-732)
    - `/docs/roadmaps`
    - `/docs/badges`
    - `/resources/:resourceId/roadmaps/:roadmapId`
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
    - `/resources/:resourceId/edit`
    - `/resources/:resourceId/roadmaps/:roadmapId/edit`

## v1.3.0 2025-11-24 dinukadesilva

1. [new] Adding a formatted editor for Roadmap Executive Summary Badge Research Summary, Resource Provider Summary, and
   Verification Summary (CTT-785)
    - `/staff/badges/:badgeId/edit`
    - `/staff/roadmaps/:roadmapId/edit`
2. [new] Enabling formatted content for badges and roadmaps (CTT-785)
    - `/docs/roadmaps`
    - `/docs/badges`
    - `/resources/:resourceId/roadmaps/:roadmapId`
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
    - `/resources/:resourceId/edit`
    - `/resources/:resourceId/roadmaps/:roadmapId/edit`
3. [new] Enabling the badge and task links to open on new tabs (CTT-732)
    - `/docs/roadmaps`
    - `/docs/badges`
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
    - `/resources/:resourceId/roadmaps/:roadmapId/edit`
4. [new] Restructure the project source code repository (CTT-781)

## v1.2.1 2025-11-20 dinukadesilva

1. [fix] Fix the auto scrolling to stop at the app root
    - All

## v1.2.0 2025-11-19 dinukadesilva

1. [bug-fix] Fix the badge status page layout indicator
    - `/concierge/badge-status`
2. [fix] Improvements in RP dashboard (CTT-741)
    - `/organizations`
3. [fix] Improvements in organization page (CTT-784)
    - `/organizations/:organizationId`
4. [new] Adding the new pages to see available roadmaps and badges (CTT-732)
    - `/docs/roadmaps`
    - `/docs/badges`

## v1.1.2 2025-11-13 dinukadesilva

1. [bug-fix] Rename about page query string from `format` to `display-format`
    - `/about`

## v1.1.1 2025-11-13 dinukadesilva

1. [bug-fix] Fixing the absolute links in tab views
    - `/concierge/badge-status`
    - `/about`

## v1.1.0 2025-11-13 dinukadesilva

1. [new] Adding the JSON option for configurations display in the about page
    - `/about`
2. [new] Style improvements in the about page. (Background color and tab view etc.)
    - `/about`
3. [fix] Fixed the breadcrumb in the organization badge review page
    - `/organizations/:organizationId/badge-review/verification-failed`

## v1.0.62 2025-11-12 dinukadesilva

1. [new] Graphic upload for roadmaps
    - `/concierge/roadmaps/:roadmapId/edit`
2. [new] Graphic upload for badges
    - `/concierge/badges/:badgeId/edit`
3. [new] Graphic upload drag and drop file feature
    - `/concierge/badges/:badgeId/edit`
    - `/concierge/roadmaps/:roadmapId/edit`
4. [new] Task edit
    - `/concierge/badges/:badgeId/edit`
5. [new] About page
    - `/about`
6. [new] Dashboard badge status links
    - `/concierge/badge-status`
7. [new] Adding the roadmap "Draft" labels
    - `/concierge`
    - `/concierge/roadmaps`
8. [dependency] https://github.com/access-ci-org/Operations_Warehouse_Django/pull/72

## v1.0.61 2025-11-06 dinukadesilva

1. [fix] Resource roadmap badge summary context methods
    - `/organizations/:organizationId`
    - `/concierge/dashboard`
    - `/concierge/badge-status`
2. [new] The new badge status page for staff and concierge
    - `/concierge/badge-status`
3. [dependency] https://github.com/access-ci-org/Operations_Warehouse_Django/pull/70
    - v3.70.2

## v1.0.60 2025-11-04 dinukadesilva

1. [fix] Left list scroll bar of the multi list select component
    - `/concierge/badges/:badgeId/edit`
    - `/concierge/badges/new`
    - `/concierge/roadmaps/new`
    - `/concierge/roadmaps/:roadmapId/edit`
2. [bug-fix] Resource badge page task required status. (CTT-762)
    - `/resources/:resourceId/roadmaps/:roadmapId/badges/:badgeId`
3. [draft] Badge status page
    - `/concierge/badge-status`

## v1.0.59 2025-10-31 dinukadesilva

1. [fix] Removing roadmap assignment from the badge creation and edit
    - `/concierge/badges/:badgeId/edit`
    - `/concierge/badges/new`
2. [fix] Enabling reordering for the roadmap badges and prerequisite badges
    - Everything on (1)
    - `/concierge/roadmaps/new`
    - `/concierge/roadmaps/:roadmapId/edit`
3. [fix] Minor typo fixes
    - Everything on (1)

## v1.0.58 2025-10-31 dinukadesilva

1. [new] task creation, reordering tasks
    - `/concierge/badges/:badgeId/edit`
    - `/concierge/badges/new`
2. [fix] UI improvements of the multi list select component with drag and drop ordering
    - Everything on (1)
3. [fix] Adding validation, empty labels and other minor fixes
    - Everything on (1)
    - `/concierge/roadmaps/new`
    - `/concierge/roadmaps/:roadmapId/edit`

## v1.0.57 2025-10-28 dinukadesilva

1. [fix] Minor bug fixes

## v1.0.56 2025-10-24 dinukadesilva

1. [new] Adding the concierge interfaces for creating badges
