import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {dashboardAxiosInstance, unauthorizedDashboardAxiosInstance} from "./auth/DashboardAuthenticator.js";

const TaskContext = createContext({
    fetchTasks: () => {
    },
    setTask: ({taskId = null, taskData}) => {
    },
    getTasks: () => {
    },
    getTask: ({taskId}) => {
    }
});

export const useTasks = () => useContext(TaskContext);

export const BadgeTaskWorkflowStatus = {
    COMPLETED: "completed",
    NOT_COMPLETED: "not-completed",
    NOT_APPLICABLE: "not-applicable",
    ACTION_NEEDED: "action-needed",
}

/**
 * Context provider for tasks
 * @param children
 */
export const TaskProvider = ({children}) => {
    const [taskIds, setTaskIds] = useReducer(DefaultReducer, []);
    const [taskMap, setTaskMap] = useReducer(DefaultReducer, {});

    const fetchTasks = async () => {
        try {
            const response = await unauthorizedDashboardAxiosInstance.get(`/tasks`);
            const _tasks = response.data.results;
            const _taskMap = {}
            const _taskIds = [];
            for (let i = 0; i < _tasks.length; i++) {
                const _task = _tasks[i];

                _taskMap[_task.task_id] = _task;
                _taskIds.push(_task.task_id)
            }
            setTaskMap({...taskMap, ..._taskMap});
            setTaskIds(_taskIds);

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };


    const setTask = async ({taskId = null, taskData}) => {
        try {
            const response = await dashboardAxiosInstance.post(
                taskId ? `/task/${taskId}/` : "/tasks/",
                {
                    "name": taskData.name.trim(),
                    "technical_summary": taskData.technical_summary.trim(),
                    "implementor_roles": taskData.implementor_roles.trim(),
                    "task_experts": taskData.task_experts.trim(),
                    "detailed_instructions_url": taskData.detailed_instructions_url.trim()
                }
            );

            await fetchTasks();

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const getTasks = () => {
        return taskIds.map(taskId => getTask({taskId}));
    };

    const getTask = ({taskId}) => {
        return taskMap[taskId];
    };

    return (
        <TaskContext.Provider value={{fetchTasks, setTask, getTasks, getTask}}>
            {children}
        </TaskContext.Provider>
    );
};
