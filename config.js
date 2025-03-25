const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU9KTGVtVXI5V084cFZqMVJrQmNCV2FLdWd0RE9FZHo4YUR6eUVJNjFGVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiamZsSjZKa1I4QnAxd2N3OFR2M0FndVMrbUJtOWFMVVRLRjV0NHFLbWtHWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwSjdPRC80RDRGdTJCQmJEZEhHeHZRTGFENFZ2SkpoQWZTZTVDUlVmM25jPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVMjhxWlJLVGRsYkVvc1hWLzBCRmxwb0xZWmZIWmJjN1ErMHJtME1mQmxJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFHYVdvNFo4TFFmK2hmaUtPc0ZadHBnandjR2JTeVRhdFc5NEs1UXRSazg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZlR1lPL3A2c3V1bTdqOWVuN2NyV0tXV01Zckk3eHErTGtLaGRGS1F3MTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUJzbHg0WDBEVEpjeVNmRlNrSWlkbEtwNHNOT3VvektRUTlpTTY4ZGFuST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0xtMUpsZktOK3djcC9TZnBUekNHZ2J3c0hvN3E3R3pSTFlLcWRxRFNTaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1vUUFhcTdwY2RNRjdoaTR1Q1FMc0s0ZVVaMXpWVkl3NVFMUW1TQ2RxQi9FTXA4L0huMHdlSm40cXJPQXRqUENXT3lJOGt1YmZmY1NsaGM4ZEpXRERnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ2LCJhZHZTZWNyZXRLZXkiOiJTL0QzRElMbGRLekdZbm1PaS94dFprdmxKSDMzckJKWDNvTWR0UU1qcHBzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJITlZTSlo4WSIsIm1lIjp7ImlkIjoiMjMzNTM4OTExODk1OjUwQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjQ5NDY5MzMzNDQyNjUxOjUwQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSk9kcVlZREVOWHFpYjhHR0FnZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTEd5Z0N5TjBQSzBlMFdFeXZ1YVpKb2RuSk9uWlFxM1VjNXVONWFxTDdHVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRjdoMjY1eGJCMGczWFBKZVVkd3ZKaWlnUVR2NllYZEJaY2dMWFBVS3A4NUpkN2NxRW9mbVpBNnhTMHdxMFk1UE5lTm1HVjE5Q2tPR2hDOVJUT05NZ3c9PSIsImRldmljZVNpZ25hdHVyZSI6IjRXd05mMGNjTWtIVlRtbG8wRHQ4UkFOcEFMMCtsSDY5RWRDSW9sTzNUbi9tNEJFUjNzUExFWUtEeWhaS2hKR0NIOVhTeERzK2VmTXRReU9McVpndEFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTM4OTExODk1OjUwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlN4c29Bc2pkRHl0SHRGaE1yN21tU2FIWnlUcDJVS3QxSE9iamVXcWkreGwifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQyODk0NDM2LCJsYXN0UHJvcEhhc2giOiIzZ1BVSmsifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
