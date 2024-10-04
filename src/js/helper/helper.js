import axios from 'axios';
import { TIMEOUT_SEC } from '../config/config.js';

export const extractLastWordLowercase = string =>
    string.split(' ').at(-1).toLowerCase();

export const generateRandomNumber = function (min, max) {
    return Number(Math.trunc(Math.random() * (max - min + 1)));
};

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(() => {
            reject(
                new Error(`Request took too long! Timeout after ${s} seconds`),
            );
        }, s * 1000);
    });
};

export const AJAX = async function (url) {
    try {
        const data = await Promise.race([axios.get(url), timeout(TIMEOUT_SEC)]);

        // Guard clause for non-OK responses
        if (data.status !== 200)
            throw new Error(`Network response was not ok: ${data.statusText}`);

        return data;
    } catch (err) {
        console.error(err.message + '🔥');
        throw err.message;
    }
};

export const isValidJSON = function (data) {
    // Guard clause for empty or unexpected data
    if (typeof data !== 'object' || !data)
        throw new Error(`Network response was not ok: ${data.statusText}`);
    return data;
};
