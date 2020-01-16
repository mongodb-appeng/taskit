import {createTask, findAllTasks, deleteOneTask, updateTask} from './graphql';
import {
    stitchClient,
    hasLoggedInUser,
    getCurrentUser,
    getCurrentUserToken,
    loginAnonymous,
    logoutCurrentUser
} from './client';

export {
    createTask,
    findAllTasks,
    deleteOneTask,
    updateTask,
    stitchClient,
    hasLoggedInUser,
    getCurrentUser,
    getCurrentUserToken,
    loginAnonymous,
    logoutCurrentUser
}