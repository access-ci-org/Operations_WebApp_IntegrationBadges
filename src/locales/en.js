export default {
    "resourceIntegrationStatus": {
        "new": "New",
        "pre-production": "In-Progress",
        "production": "Production",
        "post-production": "Post-Production"
    },
    "resourceIntegrationStatusDescription": {
        "new": "Defined in CiDeR; no roadmap or badges selected",
        "pre-production": "Roadmap selected; currently earning required badges OR awaiting production start date. Optional badges do not affect this status",
        "production": "Production start date reached; all required badges completed. Optional badges can be managed dynamically",
        "post-production": "Resources that have passed their production end date, but continue to offer some service and may be partially available for post production use"
    },
    "badgeWorkflowStatus": {
        "": "Not Started",
        "undefined": "Not Started",
        "not-planned": "Not Started",
        "planned": "In Progress",
        "tasks-completed": "Pending Verification",
        "verification-failed": "RP Attention Required",
        "verified": "Available",
        "deprecated": "Deprecated",
        "exemption-requested": "Exemption Requested",
        "exempted": "Exemption Approved",
        "exemption-rejected": "Exemption Rejected"
    },
    "badgeWorkflowVerificationStatus": {
        "": "Not Started",
        "undefined": "Not Started",
        "not-planned": "Not Started",
        "planned": "In Progress",
        "tasks-completed": "Pending Verifications",
        "verification-failed": "RP Attention Required",
        "verified": "Available",
        "deprecated": "Deprecated",
        "exemption-requested": "Exemption Requested",
        "exempted": "Exemption Approved",
        "exemption-rejected": "Exemption Rejected"
    },
    "badgePrerequisiteActionLabel": {
        "": "Not Planned",
        "undefined": "Not Planned",
        "not-planned": "Not Planned",
        "planned": "Incomplete - Take Action",
        "tasks-completed": "Pending Verification",
        "verification-failed": "RP attention needed",
        "verified": "Available",
        "deprecated": "Deprecated",
        "exemption-requested": "Exemption Requested",
        "exempted": "Exemption Approved",
        "exemption-rejected": "Exemption Rejected"
    },
    "badgeTaskWorkflowStatus": {
        "completed": "Completed",
        "not-completed": "Incomplete",
        "not-applicable": "Not Applicable",
        "action-needed": "Action Needed"
    },
    "dialog.roadmapEnrollments.success.body": ``,
    "dialog.roadmapEnrollments.error_401.body": ``,
    "dialog.roadmapEnrollments.error_403.body": [
        "You don't have permissions to make this change. If you should have it, please submit an ACCESS ticket requesting",
        "Integration Dashboard “{{role}}” permission for the resource {{resourceId}}"
    ]

}
