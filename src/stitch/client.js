import {Stitch, AnonymousCredential, StitchAppClientConfiguration} from 'mongodb-stitch-browser-sdk';

/*
 * TODO: clean up for production distribution
 */
const config = new StitchAppClientConfiguration.Builder({baseUrl: 'https://stitch-dev.mongodb.com'});
const APP_ID = process.env.REACT_APP_STITCH_APP_ID;
export const stitchClient = Stitch.hasAppClient(APP_ID) ?
    Stitch.getAppClient(APP_ID) :
    Stitch.initializeDefaultAppClient(APP_ID, config);

/*
 * todo error check
 */
export const loginAnonymous = () => {
    return stitchClient.auth.loginWithCredential(new AnonymousCredential());
};

export const hasLoggedInUser = () => {
    return stitchClient.auth.isLoggedIn;
};

export const getCurrentUser = () => {
    return stitchClient.auth.isLoggedIn ? stitchClient.auth.user : null;
};

export const logoutCurrentUser = () => {
    const user = getCurrentUser();
    return stitchClient.auth.logoutUserWithId(user.id);
};