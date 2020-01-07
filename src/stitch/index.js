import {createTask, findAllTasks, findOneTaskById, deleteOneTask, updateTask} from './graphql';
import {stitchClient, hasLoggedInUser, getCurrentUser, loginAnonymous, logoutCurrentUser} from './client';

export {
    createTask,
    findAllTasks,
    findOneTaskById,
    deleteOneTask,
    updateTask,
    stitchClient,
    hasLoggedInUser,
    getCurrentUser,
    loginAnonymous,
    logoutCurrentUser
}