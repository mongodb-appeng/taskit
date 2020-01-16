import {Stitch, AnonymousCredential, StitchAppClientConfiguration} from 'mongodb-stitch-browser-sdk';

const APP_ID = process.env.REACT_APP_STITCH_APP_ID;
const BASE_URL = process.env.REACT_APP_STITCH_BASE_URL;

/*
 * TODO: remove this when production release is done
 */
const config = new StitchAppClientConfiguration.Builder({baseUrl: BASE_URL});

export const stitchClient = Stitch.hasAppClient(APP_ID) ?
    Stitch.getAppClient(APP_ID) :
    Stitch.initializeDefaultAppClient(APP_ID, config);

export const loginAnonymous = () => {
    return stitchClient.auth.loginWithCredential(new AnonymousCredential());
};

export const hasLoggedInUser = () => {
    return stitchClient.auth.isLoggedIn;
};

export const getCurrentUser = () => {
    return stitchClient.auth.isLoggedIn ? stitchClient.auth.user : null;
};

export const getCurrentUserToken = () => {
    return stitchClient.auth.isLoggedIn ?
        stitchClient.auth.user.auth.activeUserAuthInfo.accessToken :
        null;
};

export const logoutCurrentUser = () => {
    const user = getCurrentUser();
    return stitchClient.auth.logoutUserWithId(user.id);
};