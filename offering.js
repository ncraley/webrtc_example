function clickcreateoffer() {
  console.log('clickcreateoffer');
  document.getElementById('buttoncreateoffer').disabled = true;
  document.getElementById('spanoffer').classList.toggle('invisible');
  peerConnection = createPeerConnection(lasticecandidate);
  dataChannel = peerConnection.createDataChannel('chat');
  dataChannel.onopen = datachannelopen;
  dataChannel.onmessage = datachannelmessage;
  createOfferPromise = peerConnection.createOffer();
  createOfferPromise.then(createOfferDone, createOfferFailed);
}

function createOfferDone(offer) {
  console.log('createOfferDone');
  setLocalPromise = peerConnection.setLocalDescription(offer);
  setLocalPromise.then(setLocalDone, setLocalFailed);
}

function createOfferFailed(reason) {
  console.log('createOfferFailed');
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
  textelement = document.getElementById('textoffer');
  offer = peerConnection.localDescription;
  console.log('magic' + encodeZWSP(JSON.stringify(offer)) + 'Id');
  textelement.value = 'magic' + encodeZWSP(JSON.stringify(offer)) + 'Id';
  document.getElementById('buttonoffersent').disabled = false;
}

function clickoffersent() {
  console.log('clickoffersent');
  document.getElementById('spananswer').classList.toggle('invisible');
  document.getElementById('buttonoffersent').disabled = true;
}

function clickanswerpasted() {
  console.log('clickanswerpasted');
  document.getElementById('buttonanswerpasted').disabled = true;
  textelement = document.getElementById('textanswer');
  textelement.readOnly = true;
  answer = JSON.parse(decodeZWSP(textelement.value.substring(5, textelement.value.length - 2)));
  setRemotePromise = peerConnection.setRemoteDescription(answer);
  setRemotePromise.then(setRemoteDone, setRemoteFailed);
}

function setRemoteDone() {
  console.log('setRemoteDone');
}

function setRemoteFailed(reason) {
  console.log('setRemoteFailed');
  console.log(reason);
}

