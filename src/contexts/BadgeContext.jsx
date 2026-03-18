import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {dashboardAxiosInstance, unauthorizedDashboardAxiosInstance} from "./auth/DashboardAuthenticator.js";

const BadgeContext = createContext({
    // badgeMap: {},
    fetchBadges: () => {
    },
    fetchBadge: ({badgeId}) => {
    },
    setBadge: ({badgeId, badgeData}) => {
    },
    getBadge: ({badgeId}) => {
    },
    getBadges: () => {
    }
});

export const useBadges = () => useContext(BadgeContext);

/**
 * Context provider for badges
 * @param children
 */
export const BadgeProvider = ({children}) => {
    const [badgeIds, setBadgeIds] = useReducer(DefaultReducer, []);
    const [badgeMap, setBadgeMap] = useReducer(DefaultReducer, {});

    const fetchBadges = async () => {
        try {
            const response = await unauthorizedDashboardAxiosInstance.get('/badges');
            const _badges = response.data.results;
            const _badgeIds = [];
            const _badgeMap = {};
            for (let i = 0; i < _badges.length; i++) {
                const _badge = _badges[i];
                const badgeId = _badge.badge_id;
                _badgeIds.push(badgeId)
                _badgeMap[badgeId] = {...badgeMap[badgeId], ..._badge};
            }

            setBadgeIds(_badgeIds);

            setBadgeMap({
                ...badgeMap,
                ..._badgeMap
            });

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const fetchBadge = async ({badgeId}) => {
        try {
            const response = await unauthorizedDashboardAxiosInstance.get(`/badge/${badgeId}`);
            const _badge = response.data.results;

            const _badgeMap = {
                ...badgeMap,
                [badgeId]: {
                    ...badgeMap[_badge.badge_id],
                    ..._badge
                }
            };
            setBadgeMap(_badgeMap);


            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const setBadge = async ({badgeId = null, badgeData}) => {
        try {
            const response = await dashboardAxiosInstance.post(
                badgeId ? `/badge/${badgeId}/` : "/badges/",
                {
                    "prerequisites": badgeData.prerequisites.map(prerequisite => ({
                        "badge_id": prerequisite.badge_id,
                        "sequence_no": prerequisite.sequence_no
                    })),
                    "tasks": badgeData.tasks.map(task => ({
                        "task_id": task.task_id,
                        "required": task.required,
                        "sequence_no": task.sequence_no
                    })),
                    "name": badgeData.name.trim(),
                    "graphic": badgeData.graphic,
                    "researcher_summary": badgeData.researcher_summary.trim(),
                    "resource_provider_summary": badgeData.resource_provider_summary.trim(),
                    "verification_summary": badgeData.verification_summary.trim(),
                    "verification_method": badgeData.verification_method.trim(),
                    "default_badge_access_url": badgeData.default_badge_access_url.trim(),
                    "default_badge_access_url_label": badgeData.default_badge_access_url_label.trim()
                }
            );

            await fetchBadges();

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const getBadge = ({badgeId}) => {
        return badgeMap[badgeId];
    };

    const getBadges = () => {
        return badgeIds.map(badgeId => getBadge({badgeId}));
    };



    return (
        <BadgeContext.Provider value={{badgeMap, fetchBadges, fetchBadge, setBadge, getBadge, getBadges}}>
            {children}
        </BadgeContext.Provider>
    );
};
