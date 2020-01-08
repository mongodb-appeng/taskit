import axios from 'axios';
import {getCurrentUser} from "./client";

export const createTask = async task => {
    const user = getCurrentUser();
    if(user === null){
        throw new Error('invalid user');
    }

    task['owner_id'] = user.id;
    const resp = await axios({
        url: 'https://stitch-dev.mongodb.com/api/client/v2.0/app/graphql-qpnae/graphql',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${user.auth.activeUserAuthInfo.accessToken}`
        },
        data: {
            query: `
                mutation insertOneTasks($data:TasksInsertInput!){
                    insertOneTasks(data:$data){
                        _id,
                        description,
                        name
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
    return resp.data;
};

export const findOneTaskById = id => {};

export const findAllTasks = async () => {
    const user = getCurrentUser();
    if(user === null) {
        throw new Error('invalid user');
    }
    const resp = await axios({
        url: 'https://stitch-dev.mongodb.com/api/client/v2.0/app/graphql-qpnae/graphql',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${user.auth.activeUserAuthInfo.accessToken}`
        },
        data: {
            query: `
                {
                    taskss{
                        _id,
                        name,
                        description
                    }
                }
            `
        }
    });
    return resp.data;
};

export const updateTask = (id, task) => {};

export const deleteOneTask = async id => {
    const user = getCurrentUser();
    if(user === null){
        throw new Error('invalid user');
    }

    const resp = await axios({
        url: 'https://stitch-dev.mongodb.com/api/client/v2.0/app/graphql-qpnae/graphql',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${user.auth.activeUserAuthInfo.accessToken}`
        },
        data: {
            query: `
                mutation deleteOneTasks($data:TasksQueryInput!){
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
    return resp.data;
};