
function chatlog(msg) {
  chatelement = document.getElementById('chatlog');
  newchatentry = document.createElement("p");
  newchatentry.textContent = '[' + new Date() + '] ' + msg;
  chatelement.appendChild(newchatentry);  
  chatelement.scrollTop = chatelement.scrollHeight
}

function createPeerConnection(lasticecandidate) {
  configuration = {
    iceServers: [{
      urls: "stun:relay.metered.ca:80"}]};
  try {
    peerConnection = new RTCPeerConnection(configuration);
  } catch(err) {
    chatlog('error: ' + err);
  }
  peerConnection.onicecandidate = handleicecandidate(lasticecandidate);
  peerConnection.onconnectionstatechange = handleconnectionstatechange;
  peerConnection.oniceconnectionstatechange = handleiceconnectionstatechange;
  return peerConnection;
}

function handleicecandidate(lasticecandidate) {
  return function(event) {
    if (event.candidate != null) {
      console.log('new ice candidate');
    } else {
      console.log('all ice candidates');
      lasticecandidate();
    }
  }
}

function handleconnectionstatechange(event) {
  console.log('handleconnectionstatechange');
  console.log(event);
}

function handleiceconnectionstatechange(event) {
  console.log('ice connection state: ' + event.target.iceConnectionState);
}

function datachannelopen() {
  console.log('datachannelopen');
  chatlog('connected');
  document.getElementById('chatinput').disabled = false;
  document.getElementById('chatbutton').disabled = false;
}

function datachannelmessage(message) {
  console.log('datachannelmessage');
  console.log(message);
  text = message.data;
  chatlog(text);
}

function chatbuttonclick() {
  console.log('chatbuttonclick');
  textelement = document.getElementById('chatinput');
  text = textelement.value
  dataChannel.send(text);
  chatlog(text);
  textelement.value = '';
}

function encodeZWSP(str) {
  console.log("str len: " + str.length);
  const bin = str.split('').map((char)=>('0000000' + char.charCodeAt(0).toString(2)).slice(-7)).join('');
  console.log("bin len: " + bin.length);
  return bin.replaceAll('0', '\u200b').replaceAll('1', '\u200c').replaceAll('2', '\u200d');
}

function decodeZWSP(str) {
  const bin = str.replaceAll('\u200b', '0').replaceAll('\u200c', '1').replaceAll('\u200d', '2');
  console.log(bin);
  return bin.match(/.{1,7}/g).map((char) => String.fromCharCode(parseInt(char, 2))).join('');
}