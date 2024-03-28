const {RtcTokenBuilder, RtmTokenBuilder, RtcRole} = require("agora-token");

const generateAgoraToken = (_channelName, userId) => {
    // Rtc Examples
    const appId = '915985573db24344bc469f40b6672814';
    const appCertificate = 'b701d2a9d0d34426a42757ab79f14872';
    const channelName = _channelName;
    const uid = userId;
    const role = RtcRole.PUBLISHER;
  
    const expirationTimeInSeconds = 21600
  
    const currentTimestamp = Math.floor(Date.now() / 1000)
  
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
  
    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.
  
    // Build token with uid
    const token = RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCertificate,
        channelName,
        uid,
        role,
        expirationTimeInSeconds,
        privilegeExpiredTs
      );
    console.log("Token With Integer Number Uid: " + token);
  
    return token;
  }

  module.exports = generateAgoraToken;