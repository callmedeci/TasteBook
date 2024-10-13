import axios from 'axios';
import { TIMEOUT_SEC } from '../config/config.js';

export const extractLastWordLowercase = string =>
    string.split(' ').at(-1).toLowerCase();

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(() => {
            reject(
                new Error(`Request took too long! Timeout after ${s} seconds`),
            );
        }, s * 1000);
    });
};

export const AJAX = async function (url, method = 'GET', postData) {
    try {
        const fetch = await axios({
            method: method,
            ...(postData && { data: postData }),
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await Promise.race([fetch, timeout(TIMEOUT_SEC)]);

        // Guard clause for non-OK responses
        if (!data || (data.status !== 200 && data.status !== 201))
            throw new Error(
                `Network response was not ok: ${data.statusText || 'No status text available'}`,
            );

        return data;
    } catch (err) {
        // Improved error handling
        const errorMessage = err.response
            ? `Network error: ${err.response.statusText || err.message}`
            : err.message;
        console.error(errorMessage + '🔥');
        throw new Error(errorMessage);
    }
};

export const isValidJSON = function (data) {
    // Guard clause for empty or unexpected data
    if (typeof data !== 'object' || !data)
        throw new Error(`Invalid JSON data received`);
    return data;
};
