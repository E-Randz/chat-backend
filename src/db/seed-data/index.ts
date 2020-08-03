import fs from 'fs';

const env = process.env.NODE_ENV;

// depending on the env select the correct json data file to parse

// USERS
const rawUserData = fs.readFileSync(`./${env}-data/users.json`);
export const users = JSON.parse(rawUserData.toString());
