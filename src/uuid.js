// @flow

/**
 * Generates a version 4 UUID string.
 * @return {string}
 */
function uuid4()/*: string*/ {
    // from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
}

export { uuid4 };
