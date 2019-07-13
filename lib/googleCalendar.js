const fs = require('fs');
// const readline = require('readline');
const { google } = require('googleapis');
require("dotenv").config();
const gAuth = require("../server.js")
const gClient = gAuth.oauth2Client
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('../config/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
// function authorize(credentials, callback) {
//     const { client_secret, client_id, redirect_uris } = credentials.installed;
//     // Check if we have previously stored a token.
//     fs.readFile(TOKEN_PATH, (err, token) => {
//         if (err) return getAccessToken(gClient, callback);
//         gClient.setCredentials(JSON.parse(token));
//         callback(gClient);
//     });
// }
function pushEvent(auth, calEvent) {
    const calendar = google.calendar({ version: 'v3', auth });
    calendar.events.insert({
        auth,
        calendarId: 'primary',
        resource: calEvent
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        else {
            console.log('Event CreatedL %s', event.htmlLink);
        }
    });
}
function grabEventData() {
    let calEvent = {
        'summary': 'Estimated Period Start',
        'start': {
            'dateTime': '2015-05-28T09:00:00-07:00',
            'timeZone': 'America/Boston',
        },
        'end': {
            'dateTime': '2015-05-28T17:00:00-07:00',
            'timeZone': 'America/Boston',
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
            { 'email': 'lpage@example.com' },
            { 'email': 'sbrin@example.com' },
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
            ],
        },

    }
    pushEvent(auth, calEvent)
}
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
// function getAccessToken(gClient, callback) {

//     console.log('Authorize this app by visiting this url:', gAuth.url);
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
// });
// rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     // gClient.getToken(code, (err, token) => {
//     //     if (err) return console.error('Error retrieving access token', err);
//     //     gClient.setCredentials(token);
//     //     // Store the token to disk for later program executions
//     //     fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//     //         if (err) return console.error(err);
//     //         console.log('Token stored to', TOKEN_PATH);
//         });
//         callback(gClient);
// });
// });
// }

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
