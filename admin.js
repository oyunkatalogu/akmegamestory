import { getDatabase, ref, set, push, onValue } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js';
import { database } from './firebase.js';

const deviceSelect = document.getElementById('deviceSelect');
const status = document.getElementById('status');

// Cihaz listesi güncelle
function updateDeviceList() {
  const deviceRef = ref(database, 'devices');
  onValue(deviceRef, snapshot => {
    deviceSelect.innerHTML = '';
    snapshot.forEach(child => {
      const option = document.createElement('option');
      option.value = child.key;
      option.textContent = child.val().name;
      deviceSelect.appendChild(option);
    });
  });
}

// Cihaz ekle
window.addDevice = () => {
  const name = document.getElementById('deviceName').value;
  if (!name) return;
  const newRef = push(ref(database, 'devices'));
  set(newRef, { name }).then(() => {
    status.textContent = 'Cihaz eklendi.';
    document.getElementById('deviceName').value = '';
  });
};

// Oyun ekle
window.addGame = () => {
  const deviceId = deviceSelect.value;
  const name = document.getElementById('gameName').value;
  const price = document.getElementById('gamePrice').value;
  const image = document.getElementById('gameImage').value;
  const video = document.getElementById('gameVideo').value;

  if (!deviceId || !name || !price || !image) return;

  const newRef = push(ref(database, games/${deviceId}));
  set(newRef, {
    name, price, image, video
  }).then(() => {
    status.textContent = 'Oyun eklendi.';
    document.getElementById('gameName').value = '';
    document.getElementById('gamePrice').value = '';
    document.getElementById('gameImage').value = '';
    document.getElementById('gameVideo').value = '';
  });
};

// Kampanya tanımla
window.setDiscount = () => {
  const userId = document.getElementById('userId').value;
  const discount = parseInt(document.getElementById('discount').value);
  if (!userId || isNaN(discount)) return;
  set(ref(database, users/${userId}/discount), discount).then(() => {
    status.textContent = 'İndirim uygulandı.';
    document.getElementById('userId').value = '';
    document.getElementById('discount').value = '';
  });
};

updateDeviceList();