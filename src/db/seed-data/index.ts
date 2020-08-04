import fs from 'fs';

// depending on the env select the correct json data file to parse

// USERS
const rawUserData = fs.readFileSync(__dirname + `/data/users.json`);
export const users = JSON.parse(rawUserData.toString());

// TEAMS
const rawTeamData = fs.readFileSync(__dirname + `/data/teams.json`);
export const teams = JSON.parse(rawTeamData.toString());

// PROFILES
const rawProfileData = fs.readFileSync(__dirname + `/data/profiles.json`);
export const profiles = JSON.parse(rawProfileData.toString());

// CHANNELS
const rawChannelData = fs.readFileSync(__dirname + `/data/channels.json`);
export const channels = JSON.parse(rawChannelData.toString());

// CHANNEL PARTICIPANTS
const rawChannelParticipantData = fs.readFileSync(
  __dirname + `/data/channel_participants.json`,
);
export const channelParticipants = JSON.parse(
  rawChannelParticipantData.toString(),
);

// THREADS
const rawThreadData = fs.readFileSync(__dirname + `/data/threads.json`);
export const threads = JSON.parse(rawThreadData.toString());

// THREAD PARTICIPANTS
const rawThreadParticipantData = fs.readFileSync(
  __dirname + `/data/thread_participants.json`,
);
export const threadParticipants = JSON.parse(
  rawThreadParticipantData.toString(),
);

// MESSAGES
const rawMessageData = fs.readFileSync(__dirname + `/data/messages.json`);
const parsedMessages = JSON.parse(rawMessageData.toString());

// the reactions still have to be in json format
export const messages = parsedMessages.map((message: any) => {
  if (!message.reactions) {
    return message;
  }
  return {
    ...message,
    reactions: JSON.stringify(message.reactions),
  };
});
