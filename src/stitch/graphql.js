/*
 * graphql.js
 * 
 * TODO: Shouldn't the demo app include production best practices?
 * 
 * please note this is not a production ready deployment, each of the
 * functions do some basic user checks to ensure we have a valid
 * anonymous user, then we use that current user to get a token which
 * is sent with the data to the graphql endpoint for processing.
 * Each function also has the same error processing allowing you to
 * look at each function individually without too many extra dependencies.
 *
 * The functions below show basic of how to send the query and
 * variables using axios, for these queries you will need to review
 * the graphiql schema documentation which is generated when the stitch
 * application is configure to use graphql
 *
 * For more information on setting up Stitch see README.md
 */
import axios from 'axios';
import {getCurrentUser, getCurrentUserToken} from "./client";

const GRAPHQL_URL = process.env.REACT_APP_STITCH_GRAPHQL_ENDPOINT;

/*
 * create a single task using the insertOneTasks mutation
 *
 * Here you will notice that we add an `owner_id` field to the
 * task, this is because our authorization rules allow users to
 * only read and write their own data.
 * The data to be written must contain the users id which we have
 * configured to be stored in the `owner_id` field.
 */
export const createTask = async task => {
    const user = getCurrentUser();
    if(user === null){
        throw new Error('invalid user');
    }

    task['owner_id'] = user.id;
    const resp = await axios({
        url: GRAPHQL_URL,
        method: 'post',
        headers: {
            'Authorization': `Bearer ${getCurrentUserToken()}`
        },
        data: {
            query: `
                mutation($data:TasksInsertInput!){
                    insertOneTasks(data:$data){
                        _id,
                        name,
                        description,
                        createdAt,
                        tags,
                        dueBy
                    }
                }
            `,
            variables: {
                data: task
            }
        }
    });
    const respData = resp.data;
    if('errors' in respData){
        throw new Error(respData.errors[0].message);
    }
    return respData.data.insertOneTasks;
};

/*
 * find all tasks for the current user (retrieved by the stitch client)
 * using the taskss schema which is generated automatically by graphql
 * when it is configured.
 * the query uses a CREATEDAT_DESC sortBy parameter which is defined
 * by the graphql schema
 */
export const findAllTasks = async () => {
    const user = getCurrentUser();
    if(user === null) {
        throw new Error('invalid user');
    }
    const resp = await axios({
        url: GRAPHQL_URL,
        method: 'post',
        headers: {
            'Authorization': `Bearer ${getCurrentUserToken()}`
        },
        data: {
            query: `
                {
                    taskss(sortBy:CREATEDAT_DESC){
                        _id,
                        name,
                        description,
                        createdAt,
                        tags,
                        dueBy
                    }
                }
            `
        }
    });

    const respData = resp.data;
    if('errors' in respData){
        throw new Error(respData.errors[0].message);
    }
    return respData.data.taskss
};

/*
 * the update task using the updateOneTasks mutation, notice
 * here we do not need to add the `owner_id` field as the
 * `owner_id` will be retrieved from the access token
 */
export const updateTask = async (task) => {
    const user = getCurrentUser();
    if(user === null){
        throw new Error('invalid user');
    }

    const resp = await axios({
        url: GRAPHQL_URL,
        method: 'post',
        headers: {
            'Authorization': `Bearer ${getCurrentUserToken()}`
        },
        data: {
            query: `
                mutation($query:TasksQueryInput!, $set:TasksUpdateInput!){
                    updateOneTasks(query:$query, set:$set){
                        _id,
                        name,
                        description,
                        createdAt,
                        tags,
                        dueBy
                    }
                }
            `,
            variables: {
                query: {
                    _id: task._id
                },
                set: task
            }
        }
    });

    const respData = resp.data;
    if('errors' in respData){
        throw new Error(respData.errors[0].message);
    }
    return respData.data.updateOneTasks;
};

/*
 * calls the deleteOneTasks mutation, this delete can return all the
 * information found in the document if more processing needed to be
 * done (for exmample maybe use an alert to show the task deleted)
 */
export const deleteOneTask = async id => {
    const user = getCurrentUser();
    if(user === null){
        throw new Error('invalid user');
    }

    const resp = await axios({
        url: GRAPHQL_URL,
        method: 'post',
        headers: {
            'Authorization': `Bearer ${getCurrentUserToken()}`
        },
        data: {
            query: `
                mutation($data:TasksQueryInput!){
                    deleteOneTasks(query:$data){
                        _id,
                        description,
                        name
                    }
                }
            `,
            variables: {
                data: {
                    _id: id
                }
            }
        }
    });
    const respData = resp.data;
    if('errors' in respData){
        throw new Error(respData.errors[0].message);
    }
    return respData.data.deleteOneTasks;
};