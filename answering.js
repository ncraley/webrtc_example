let isMagic;

function clickofferpasted() {
  console.log('clickremoteoffer');
  document.getElementById('buttonofferpasted').disabled = true;
  peerConnection = createPeerConnection(lasticecandidate);
  peerConnection.ondatachannel = handledatachannel;
  textelement = document.getElementById('textoffer');
  textelement.readOnly = true;
  isMagic = textelement.value.includes('magic');
  offer = JSON.parse(
    isMagic ?
    (decodeZWSP(textelement.value.substring(5, textelement.value.length - 2)))
    : textelement.value
  );
  console.log(offer);
  setRemotePromise = peerConnection.setRemoteDescription(offer);
  setRemotePromise.then(isMagic? setRemoteDoneMagic : setRemoteDone, setRemoteFailed);
}

function setRemoteDone() {
  console.log('setRemoteDone');
  createAnswerPromise = peerConnection.createAnswer();
  createAnswerPromise.then(createAnswerDone, createAnswerFailed);
}

function setRemoteDoneMagic() {
  console.log('setRemoteDone');
  createAnswerPromise = peerConnection.createAnswer();
  createAnswerPromise.then(createAnswerDoneMagic, createAnswerFailed);
}

function setRemoteFailed(reason) {
  console.log('setRemoteFailed');
  console.log(reason);
}

function createAnswerDone(answer) {
  console.log('createAnswerDone');
  setLocalPromise = peerConnection.setLocalDescription(answer);
  setLocalPromise.then(setLocalDone, setLocalFailed);
  document.getElementById('spananswer').classList.toggle('invisible');
}

function createAnswerDoneMagic(answer) {
  console.log('createAnswerDone');
  setLocalPromise = peerConnection.setLocalDescription(answer);
  setLocalPromise.then(setLocalDone, setLocalFailed);
  document.getElementById('spananswer').classList.toggle('invisible');
}

function createAnswerFailed(reason) {
  console.log('createAnswerFailed');
  console.log(reason);
}

function setLocalDone() {
  console.log('setLocalDone');
}

function setLocalFailed(reason) {
  console.log('setLocalFailed');
  console.log(reason);
}

function lasticecandidate() {
  console.log('lasticecandidate');
  textelement = document.getElementById('textanswer');
  answer = peerConnection.localDescription
  textelement.value = isMagic ? ('magic'+ encodeZWSP(JSON.stringify(answer)) + 'Id') : JSON.stringify(answer);
}

function handledatachannel(event) {
  console.log('handledatachannel');
  dataChannel = event.channel;
  dataChannel.onopen = datachannelopen;
  dataChannel.onmessage = datachannelmessage;
}
