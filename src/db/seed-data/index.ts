import fs from 'fs';

const env = process.env.NODE_ENV;

// depending on the env select the correct json data file to parse

// USERS
const rawUserData = fs.readFileSync(__dirname + `/${env}-data/users.json`);
export const users = JSON.parse(rawUserData.toString());

// TEAMS
const rawTeamData = fs.readFileSync(__dirname + `/${env}-data/teams.json`);
export const teams = JSON.parse(rawTeamData.toString());

// PROFILES
const rawProfileData = fs.readFileSync(
  __dirname + `/${env}-data/profiles.json`,
);
export const profiles = JSON.parse(rawProfileData.toString());

// CHANNELS
const rawChannelData = fs.readFileSync(
  __dirname + `/${env}-data/channels.json`,
);
export const channels = JSON.parse(rawChannelData.toString());

// CHANNEL PARTICIPANTS
const rawChannelParticipantData = fs.readFileSync(
  __dirname + `/${env}-data/channel_participants.json`,
);
export const channelParticipants = JSON.parse(
  rawChannelParticipantData.toString(),
);

// THREADS
const rawThreadData = fs.readFileSync(__dirname + `/${env}-data/threads.json`);
export const threads = JSON.parse(rawThreadData.toString());
