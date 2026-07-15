import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {useBadges} from "./BadgeContext.jsx";
import {authorizedDashboardAxiosInstance, dashboardAxiosInstance} from "./auth/DashboardAuthenticator.js";


/** @type {React.Context<ReturnType<typeof useRoadmapsValues> | null>} */
const RoadmapContext = createContext(null);

export const useRoadmaps = () => useContext(RoadmapContext);

function useRoadmapsValues() {
    const {getBadge} = useBadges();

    const [roadmapIds, setRoadmapIds] = useReducer(DefaultReducer, []);
    const [roadmapMap, setRoadmapMap] = useReducer(DefaultReducer, {});

    const fetchRoadmaps = async () => {
        try {
            const response = await dashboardAxiosInstance.get('/roadmaps');
            const _roadmaps = response.data.results;
            const _roadmapMap = {};
            const _roadmapIds = []
            for (let i = 0; i < _roadmaps.length; i++) {
                const _roadmap = _roadmaps[i];
                _roadmapIds.push(_roadmap.roadmap_id);
                _roadmapMap[_roadmap.roadmap_id] = {...roadmapMap[_roadmap.roadmap_id], ..._roadmap};
            }
            setRoadmapMap({
                ...roadmapMap,
                ..._roadmapMap
            });
            setRoadmapIds(_roadmapIds);


            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const fetchRoadmap = async ({roadmapId}) => {
        try {
            const response = await dashboardAxiosInstance.get(`/roadmap/${roadmapId}`);
            const _roadmap = response.data.results;

            const _roadmapMap = {
                ...roadmapMap,
                [roadmapId]: {
                    ...roadmapMap[_roadmap.roadmap_id],
                    ..._roadmap
                }
            };
            setRoadmapMap(_roadmapMap);


            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const setRoadmap = async ({roadmapId = null, roadmapData}) => {
        try {
            const response = await authorizedDashboardAxiosInstance.post(
                roadmapId ? `/roadmap/${roadmapId}/` : "/roadmaps/",
                {
                    "name": roadmapData.name.trim(),
                    "graphic": roadmapData.graphic,
                    "executive_summary": roadmapData.executive_summary.trim(),
                    "infrastructure_types": roadmapData.infrastructure_types.trim(),
                    "integration_coordinators": roadmapData.integration_coordinators.trim(),
                    "status": roadmapData.status.trim(),
                    "badges": roadmapData.badges.map(badge => ({
                        "badge_id": badge.badge_id,
                        "required": badge.required,
                        "sequence_no": badge.sequence_no
                    }))
                }
            );

            await fetchRoadmaps();

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const getRoadmap = ({roadmapId}) => {
        return roadmapMap[roadmapId];
    };

    const getRoadmapBadges = ({roadmapId}) => {
        const roadmap = getRoadmap(({roadmapId}));
        if (roadmap && roadmap.badges) {
            return roadmap.badges.map(roadmapBadge => {
                const badgeId = roadmapBadge.badge_id;
                const required = roadmapBadge.required;
                const sequence_no = roadmapBadge.sequence_no;

                return {
                    ...getBadge({badgeId}),
                    required,
                    sequence_no
                };
            });
        }
    };

    const getRoadmaps = () => {
        return roadmapIds.map(roadmapId => getRoadmap({roadmapId}));
    };

    return {roadmapMap, fetchRoadmaps, fetchRoadmap, setRoadmap, getRoadmap, getRoadmapBadges, getRoadmaps};
}

export const RoadmapProvider = ({children}) => {
    const values = useRoadmapsValues();

    return (
        <RoadmapContext.Provider value={values}>
            {children}
        </RoadmapContext.Provider>
    );
};
