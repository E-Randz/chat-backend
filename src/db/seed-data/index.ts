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
