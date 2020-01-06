import {Stitch, AnonymousCredential} from 'mongodb-stitch-browser-sdk';

/*
 * TODO: clean up for production distribution
 */
const APP_ID = process.env.REACT_APP_STITCH_APP_ID;

/*
 * TODO: make a ternary?
 */
const getStitchClient = (appId = APP_ID) => {
    if(Stitch.hasAppClient(appId)){
        return Stitch.getAppClient(appId);
    }
    return Stitch.initializeAppClient(appId);
};

export default getStitchClient;