let games = [], cart = [];

const deviceSelect = document.getElementById('deviceSelect');
const gameList = document.getElementById('gameList');
const cartList = document.getElementById('cart');
const totalPriceEl = document.getElementById('totalPrice');
const searchInput = document.getElementById('search');
const addressInput = document.getElementById('address');
const buyButton = document.getElementById('buy');

// Sepet güncelleme
function updateCart() {
  cartList.innerHTML = '';
  let total = 0;
  cart.forEach(g => {
    const li = document.createElement('li');
    li.textContent = ${g.name} - ${g.price} TL;

    const btn = document.createElement('button');
    btn.textContent = 'Çıkar';
    btn.onclick = () => {
      cart = cart.filter(item => item.code !== g.code);
      updateCart();
    };

    li.appendChild(btn);
    cartList.appendChild(li);
    total += parseFloat(g.price);
  });
  totalPriceEl.textContent = total.toFixed(2);
}

// Oyunları listeleme
function renderGames() {
  gameList.innerHTML = '';
  const search = searchInput.value.toLowerCase();
  const selectedDevice = deviceSelect.value;

  games.filter(g =>
    (!selectedDevice || g.device === selectedDevice) &&
    g.name.toLowerCase().includes(search)
  ).forEach(g => {
    const div = document.createElement('div');
    div.className = 'game';
    div.innerHTML = `
      <h3>${g.name}</h3>
      <img src="${g.image}" alt="${g.name}" width="150">
      ${g.video ? <video src="${g.video}" controls width="200"></video> : ''}
      <p>${g.price} TL</p>
    `;

    const btn = document.createElement('button');
    btn.textContent = 'Sepete Ekle';
    btn.onclick = () => {
      if (!cart.some(item => item.code === g.code)) {
        cart.push(g);
        updateCart();
      }
    };

    div.appendChild(btn);
    gameList.appendChild(div);
  });
}

// Cihazları getir
firebase.database().ref('devices').on('value', snap => {
  deviceSelect.innerHTML = '<option value="">Tüm Cihazlar</option>';
  snap.forEach(child => {
    const opt = document.createElement('option');
    opt.value = child.key;
    opt.textContent = child.key;
    deviceSelect.appendChild(opt);
  });
  renderGames();
});

// Oyunları getir
firebase.database().ref('games').on('value', snap => {
  games = [];
  snap.forEach(child => {
    games.push(child.val());
  });
  renderGames();
});

// Siparişi WhatsApp'tan gönder
buyButton.onclick = () => {
  const address = addressInput.value.trim();
  if (!address) return alert('Lütfen kargo adresinizi girin.');
  if (cart.length === 0) return alert('Sepetiniz boş!');

  const message = Sipariş Listesi:\n${cart.map(g => `- ${g.name} - ${g.price}TL).join('\n')}\nToplam: ${totalPriceEl.textContent} TL\nKargo Adresi: ${address}`;
  const encodedMessage = encodeURIComponent(message);
  window.open(https://wa.me/905548801010?text=${encodedMessage}, '_blank');
};

// Arama ve filtreleme
searchInput.addEventListener('input', renderGames);
deviceSelect.addEventListener('change', renderGames);