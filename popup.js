chrome.storage.sync.get(['loopEnabled'], function(result) {
    const toggle = document.getElementById('loopToggle');
    toggle.checked = result.loopEnabled || false;
  });
  
  document.getElementById('loopToggle').addEventListener('change', function() {
    const loopEnabled = this.checked;
    chrome.storage.sync.set({ loopEnabled: loopEnabled }, function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { loop: loopEnabled });
      });
    });
  });