let loopEnabled = false;
let videoElement = null;

chrome.storage.sync.get(['loopEnabled'], function(result) {
  loopEnabled = result.loopEnabled || false;
  if (loopEnabled) {
    enableLoop();
  }
});

function enableLoop() {
  if (videoElement) {
    videoElement.loop = true;
  }
}

function disableLoop() {
  if (videoElement) {
    videoElement.loop = false;
  }
}

function findVideoElement() {
  videoElement = document.querySelector('video');
  if (videoElement && loopEnabled) {
    videoElement.loop = true; 
  }
}

const observer = new MutationObserver(findVideoElement);
observer.observe(document.body, { childList: true, subtree: true });

findVideoElement();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  loopEnabled = request.loop;
  if (loopEnabled) {
    enableLoop();
  } else {
    disableLoop();
  }
});