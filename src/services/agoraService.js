import AgoraRTC from "agora-rtc-sdk-ng";
var client;

const htmlid = document.getElementById("local_video_container");
console.log("htmlid", htmlid);

var options = {
  appid: null,
  channel: null,
  uid: null,
  token: null,
};

var videoProfiles = [
  {
    label: "360p_7",
    detail: "480×360, 15fps, 320Kbps",
    value: "360p_7",
  },
  {
    label: "360p_8",
    detail: "480×360, 30fps, 490Kbps",
    value: "360p_8",
  },
  {
    label: "480p_1",
    detail: "640×480, 15fps, 500Kbps",
    value: "480p_1",
  },
  {
    label: "480p_2",
    detail: "640×480, 30fps, 1000Kbps",
    value: "480p_2",
  },
  {
    label: "720p_1",
    detail: "1280×720, 15fps, 1130Kbps",
    value: "720p_1",
  },
  {
    label: "720p_2",
    detail: "1280×720, 30fps, 2000Kbps",
    value: "720p_2",
  },
  {
    label: "1080p_1",
    detail: "1920×1080, 15fps, 2080Kbps",
    value: "1080p_1",
  },
  {
    label: "1080p_2",
    detail: "1920×1080, 30fps, 3000Kbps",
    value: "1080p_2",
  },
];
var curVideoProfile = videoProfiles[4];

var localTracks = {
  videoTrack: null,
  audioTrack: null,
};

var remoteUsers = {};

// async function audioANdVideoTrac() {

//   client = AgoraRTC.createClient({
//     mode: "rtc",
//     codec: getCodec()
//   });

//   await client.join(options.appid, options.channel, options.token || null, options.uid || null);

//   if (!localTracks.audioTrack) {
//     localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
//       encoderConfig: "music_standard",
//     });
//   }
// }

// audioANdVideoTrac();

// AgoraRTC.onAutoplayFailed = () => {
//   alert("click to start autoplay!");
// };
// AgoraRTC.onMicrophoneChanged = async changedDevice => {
//   // When plugging in a device, switch to a device that is newly plugged in.
//   if (changedDevice.state === "ACTIVE") {
//     localTracks.audioTrack.setDevice(changedDevice.device.deviceId);
//     // Switch to an existing device when the current device is unplugged.
//   } else if (changedDevice.device.label === localTracks.audioTrack.getTrackLabel()) {
//     const oldMicrophones = await AgoraRTC.getMicrophones();
//     oldMicrophones[0] && localTracks.audioTrack.setDevice(oldMicrophones[0].deviceId);
//   }
// };
// AgoraRTC.onCameraChanged = async changedDevice => {
//   // When plugging in a device, switch to a device that is newly plugged in.
//   if (changedDevice.state === "ACTIVE") {
//     localTracks.videoTrack.setDevice(changedDevice.device.deviceId);
//     // Switch to an existing device when the current device is unplugged.
//   } else if (changedDevice.device.label === localTracks.videoTrack.getTrackLabel()) {
//     const oldCameras = await AgoraRTC.getCameras();
//     oldCameras[0] && localTracks.videoTrack.setDevice(oldCameras[0].deviceId);
//   }
// };
// async function initDevices() {
//   if (!localTracks.audioTrack) {
//     localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
//       encoderConfig: "music_standard"
//     });
//   }
//   if (!localTracks.videoTrack) {
//     localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack({
//       encoderConfig: curVideoProfile.value
//     });
//   }
//   // get mics
//   mics = await AgoraRTC.getMicrophones();
//   const audioTrackLabel = localTracks.audioTrack.getTrackLabel();
//   currentMic = mics.find(item => item.label === audioTrackLabel);
//   // $(".mic-input").val(currentMic.label);
//   // $(".mic-list").empty();
//   // mics.forEach(mic => {
//   //   $(".mic-list").append(`<a class="dropdown-item" href="#">${mic.label}</a>`);
//   // });

//   // get cameras
//   cams = await AgoraRTC.getCameras();
//   const videoTrackLabel = localTracks.videoTrack.getTrackLabel();
//   currentCam = cams.find(item => item.label === videoTrackLabel);
//   // $(".cam-input").val(currentCam.label);
//   // $(".cam-list").empty();
//   // cams.forEach(cam => {
//   //   $(".cam-list").append(`<a class="dropdown-item" href="#">${cam.label}</a>`);
//   // });
// }
// async function switchCamera(label) {
//   currentCam = cams.find(cam => cam.label === label);
//   // $(".cam-input").val(currentCam.label);
//   // switch device of local video track.
//   await localTracks.videoTrack.setDevice(currentCam.deviceId);
// }
// async function switchMicrophone(label) {
//   currentMic = mics.find(mic => mic.label === label);
//   // $(".mic-input").val(currentMic.label);
//   // switch device of local audio track.
//   await localTracks.audioTrack.setDevice(currentMic.deviceId);
// }

async function subscribe(user, mediaType) {
  const uid = user.uid;
  // subscribe to a remote user
  await client.subscribe(user, mediaType);
  console.log("subscribe success");

  if (mediaType === "video") {
//     const playerWrapper = document.createElement("div");
//     playerWrapper.id = `player-wrapper-${uid}`;
//     playerWrapper.innerHTML = `
//       <p class="player-name">remoteUser(${uid})</p>
//       <video id="player-${uid}" class="player"></video>
//   `;
    // document.getElementById("remote-playerlist").appendChild(playerWrapper);
    // user.videoTrack.play(`player-${uid}`);
    user.videoTrack.play(`remoteVideo`);
  }

  if (mediaType === "audio") {
    user.audioTrack.play();
  }
}

function handleUserPublished(user, mediaType) {
  const id = user.uid;
  remoteUsers[id] = user;
  subscribe(user, mediaType);
  console.log("user.id", user.uid);
}

function handleUserUnpublished(user, mediaType) {
  if (mediaType === "video") {
    const id = user.uid;
    delete remoteUsers[id];
    // $(`#player-wrapper-${id}`).remove();
  }
}

async function join() {
  // Add an event listener to play remote tracks when remote user publishes.
  client.on("user-published", handleUserPublished);
  client.on("user-unpublished", handleUserUnpublished);
  // Join the channel.
  options.uid = await client.join(
    options.appid,
    options.channel,
    options.token || null,
    options.uid || null
  );
  console.log("option_uid = ", options.uid);
  if (!localTracks.audioTrack) {
    localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
      encoderConfig: "music_standard",
    });
  }
  if (!localTracks.videoTrack) {
    localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack({
      encoderConfig: curVideoProfile.value,
    });
  }

  // Play the local video track to the local browser and update the UI with the user ID.
  // localTracks.videoTrack.play("local-player");
  // $("#local-player-name").text(`localVideo(${options.uid})`);
  // $("#joined-setup").css("display", "flex");

  localTracks.videoTrack.play("localVideo");
  // // Publish the local video and audio tracks to the channel.
  await client.publish(Object.values(localTracks));
  console.log("publish success");
}

export async function initAgora(channelName) {
  // e.preventDefault();
  // $("#join").attr("disabled", true);
  try {
    client = AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8",
    });
    (options.appid = "915985573db24344bc469f40b6672814"),
      (options.channel = channelName),
      (options.uid = Math.floor(Math.random() * 1000)),
      (options.token =
        "007eJxTYKg8J6K0PNRyykzxJcnvli+8ujtD4fnBHHG7R8H6H+0+n2BWYLA0NLW0MDU1N05JMjIxNjFJSjYxs0wzMUgyMzM3sjA04XvKnNYQyMgQE6/CysgAgSC+AENeanl8bmpqSXxyRmJeXmoOAwMAoCEiew=="),
      await join();
    if (options.token) {
      console.log("success-alert-with-token and option uid", options.uid);
      // $("#success-alert-with-token").css("display", "block");
    } else {
      // $("#success-alert a").attr("href", `index.html?appid=${options.appid}&channel=${options.channel}&token=${options.token}`);
      // $("#success-alert").css("display", "block");
    }
  } catch (error) {
    console.error(error);
  } finally {
    // $("#leave").attr("disabled", false);
  }
}

// setTimeout(() => {
//   // console.log("agora rtc", AgoraRTC);

//   initAgora("new_meet_channel");
// }, 3000);
