// ================= DATA SIMULASI UTAMA (KYUSHOP) =================
let currentRole = 'owner';

// Data Perhitungan Utama Owner
let persentaseKomisi = 15;
let totalPenjualanGross = 245800000;

// Data Katalog Produk Mitra (Lengkap & Melimpah)
let produkData = [
  { sku: 'TSH-001', nama: 'Kaos Oversize Streetwear Black', kategori: 'Atasan', harga: 150000, stok: 3, status: 'Stok Tipis' },
  { sku: 'TSH-002', nama: 'Kaos Graphic Vintage White', kategori: 'Atasan', harga: 165000, stok: 48, status: 'Aman' },
  { sku: 'JKT-001', nama: 'Jaket Canvas Casual Olive', kategori: 'Outwear', harga: 350000, stok: 2, status: 'Stok Tipis' },
  { sku: 'HD-001', nama: 'Hoodie Heavyweight Fleece Navy', kategori: 'Outwear', harga: 290000, stok: 35, status: 'Aman' },
  { sku: 'PNT-001', nama: 'Celana Chino Slim Fit Grey', kategori: 'Bawahan', harga: 225000, stok: 60, status: 'Aman' },
  { sku: 'PNT-002', nama: 'Celana Cargo Tactical Black', kategori: 'Bawahan', harga: 250000, stok: 4, status: 'Stok Tipis' },
  { sku: 'SHT-001', nama: 'Kemeja Flannel Tartan Red', kategori: 'Atasan', harga: 195000, stok: 18, status: 'Aman' },
  { sku: 'SHT-002', nama: 'Kemeja Cuban Collar Summer', kategori: 'Atasan', harga: 180000, stok: 22, status: 'Aman' },
  { sku: 'ACC-001', nama: 'Topi Bucket Hat Canvas', kategori: 'Aksesoris', harga: 85000, stok: 1, status: 'Stok Tipis' },
  { sku: 'ACC-002', nama: 'Tote Bag Canvas Plain White', kategori: 'Aksesoris', harga: 95000, stok: 50, status: 'Aman' },
  { sku: 'SWT-001', nama: 'Sweater Knit Crewneck Cream', kategori: 'Outwear', harga: 275000, stok: 14, status: 'Aman' },
  { sku: 'ACC-003', nama: 'Sabuk Kulit Genuine Leather', kategori: 'Aksesoris', harga: 135000, stok: 29, status: 'Aman' }
];

// Data Payout Bagi Hasil Mitra
let payoutData = [
  { id: 'MTR-001', brand: 'Brand Pakaian A (Streetwear)', rek: 'BCA-8820491022', nominal: 12500000, status: 'Menunggu Transfer' },
  { id: 'MTR-002', brand: 'Urban Denim Co.', rek: 'Mandiri-1370019283', nominal: 18200000, status: 'Menunggu Transfer' },
  { id: 'MTR-003', brand: 'Minimalist Activewear', rek: 'BNI-0918239128', nominal: 9450000, status: 'Transfer Selesai' },
  { id: 'MTR-004', brand: 'Vintage Culture ID', rek: 'BRI-0219283120', nominal: 14100000, status: 'Transfer Selesai' },
  { id: 'MTR-005', brand: 'Knitwear Studio', rek: 'BCA-7729102911', nominal: 6800000, status: 'Transfer Selesai' },
  { id: 'MTR-006', brand: 'Outerwear Official', rek: 'Mandiri-1440019288', nominal: 11300000, status: 'Transfer Selesai' },
  { id: 'MTR-007', brand: 'Formal Suit Custom', rek: 'BSI-7182938192', nominal: 22000000, status: 'Transfer Selesai' }
];

// Data Log Biaya Operasional Owner (Lengkap)
let operasionalData = [
  { tgl: '24 Oct 2026', ket: 'Sewa Cloud Server AWS Oct', kat: 'Infrastructure', nominal: 3200000 },
  { tgl: '20 Oct 2026', ket: 'Iklan Meta Ads & TikTok', kat: 'Marketing', nominal: 3500000 },
  { tgl: '15 Oct 2026', ket: 'Gaji Admin Customer Care', kat: 'Payroll', nominal: 1750000 },
  { tgl: '10 Oct 2026', ket: 'Domain & SSL Certificate Renewal', kat: 'Software', nominal: 450000 },
  { tgl: '05 Oct 2026', ket: 'Langganan Email Gateway SendGrid', kat: 'Software', nominal: 600000 },
  { tgl: '01 Oct 2026', ket: 'Biaya Payment Gateway Midtrans', kat: 'Transaction Fee', nominal: 1120000 },
  { tgl: '28 Sep 2026', ket: 'Perbaikan UI/UX App Bugfit', kat: 'Maintenance', nominal: 1500000 },
  { tgl: '25 Sep 2026', ket: 'Peralatan Barcode Scanner Gudang', kat: 'Hardware', nominal: 850000 }
];

// ================= SISTEM LOGIN & ALUR NAVIGASI =================
function loginAs(role) {
  currentRole = role;
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('dashboardApp').classList.remove('hidden');
  
  const userBadge = document.getElementById('userRoleBadge');
  userBadge.innerText = role === 'owner' ? 'Owner Executive' : 'Mitra Portal';

  renderTopNavbar();
  if (role === 'owner') {
    loadOwnerDashboard();
  } else {
    loadMitraDashboard();
  }
}

function logout() {
  document.getElementById('dashboardApp').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');
}

function renderTopNavbar() {
  const navMenu = document.getElementById('navMenu');
  if (currentRole === 'owner') {
    navMenu.innerHTML = `
      <button class="nav-tab active" onclick="setActiveTab(this, loadOwnerDashboard)">Executive Dashboard</button>
      <button class="nav-tab" onclick="setActiveTab(this, loadOwnerPayout)">Konfirmasi Payout Mitra</button>
      <button class="nav-tab" onclick="setActiveTab(this, loadOwnerKomisi)">Komisi & Operasional</button>
    `;
  } else {
    navMenu.innerHTML = `
      <button class="nav-tab active" onclick="setActiveTab(this, loadMitraDashboard)">Dashboard Overview</button>
      <button class="nav-tab" onclick="setActiveTab(this, loadMitraStok)">Kelola Produk & Stok</button>
      <button class="nav-tab" onclick="setActiveTab(this, loadMitraPayout)">Laporan Penjualan & Payout</button>
    `;
  }
}

function setActiveTab(element, renderFunction) {
  document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
  element.classList.add('active');
  renderFunction();
}


// ================= MODUL HALAMAN OWNER =================

function loadOwnerDashboard() {
  const main = document.getElementById('mainContent');
  
  let totalOps = operasionalData.reduce((acc, curr) => acc + curr.nominal, 0);
  let pendapatanKomisi = (totalPenjualanGross * persentaseKomisi) / 100;
  let labaBersih = pendapatanKomisi - totalOps;

  main.innerHTML = `
    <div class="kpi-grid">
      <div class="kpi-card">
        <h4>Total Penjualan Impor</h4>
        <div class="value">Rp ${totalPenjualanGross.toLocaleString()}</div>
        <div class="sub-text">↑ +18.4% bulan ini</div>
      </div>
      <div class="kpi-card">
        <h4>Pendapatan Komisi (${persentaseKomisi}%)</h4>
        <div class="value">Rp ${pendapatanKomisi.toLocaleString()}</div>
        <div class="sub-text">Platform Fee Gross</div>
      </div>
      <div class="kpi-card">
        <h4>Biaya Operasional</h4>
        <div class="value" style="color:#dc2626;">Rp ${totalOps.toLocaleString()}</div>
        <div class="sub-text">${operasionalData.length} Transaksi Dicatat</div>
      </div>
      <div class="kpi-card">
        <h4>Laba Rugi Bersih</h4>
        <div class="value" style="color:${labaBersih >= 0 ? '#ff6b35' : '#dc2626'};">Rp ${labaBersih.toLocaleString()}</div>
        <div class="sub-text">Net Margin Terkalkulasi</div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="card-box">
        <h3>Tren Pendapatan vs Laba Bersih (2026)</h3>
        <canvas id="ownerChart" height="120"></canvas>
      </div>
      <div class="card-box">
        <h3>Log Biaya Operasional Terkini</h3>
        <table class="custom-table">
          <thead><tr><th>Tanggal</th><th>Keterangan</th><th>Nominal</th></tr></thead>
          <tbody>
            ${operasionalData.slice(0, 5).map(o => `<tr><td><small>${o.tgl}</small></td><td>${o.ket}</td><td>Rp ${o.nominal.toLocaleString()}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  const ctx = document.getElementById('ownerChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      datasets: [
        { label: 'Pendapatan Komisi (Juta)', data: [18, 22, 28, 26, 32, pendapatanKomisi / 1000000], borderColor: '#ff6b35', fill: false, tension: 0.3 },
        { label: 'Laba Bersih (Juta)', data: [12, 15, 20, 19, 24, labaBersih / 1000000], borderColor: '#10b981', fill: false, tension: 0.3 }
      ]
    }
  });
}

function loadOwnerPayout() {
  const main = document.getElementById('mainContent');
  let tableRows = payoutData.map((p, idx) => `
    <tr>
      <td>${p.id}</td>
      <td><strong>${p.brand}</strong></td>
      <td>${p.rek}</td>
      <td>Rp ${p.nominal.toLocaleString()}</td>
      <td><span class="badge ${p.status === 'Transfer Selesai' ? 'badge-success' : 'badge-pending'}">${p.status}</span></td>
      <td>
        ${p.status === 'Menunggu Transfer' 
          ? `<button class="btn-action" onclick="konfirmasiTransfer(${idx})">Upload & Konfirmasi</button>` 
          : `<span style="color:#10b981; font-weight:600;">✓ Verified</span>`}
      </td>
    </tr>
  `).join('');

  main.innerHTML = `
    <div class="card-box">
      <h3>Konfirmasi Transfer Payout Mitra</h3>
      <p style="color:var(--muted-text); font-size:0.85rem; margin-bottom:15px;">Proses verifikasi dan unggah bukti transfer pembagian bagi hasil ke mitra brand.</p>
      <table class="custom-table">
        <thead>
          <tr><th>ID Mitra</th><th>Brand Mitra</th><th>Rekening Tujuan</th><th>Nilai Bagi Hasil</th><th>Status</th><th>Aksi Operator</th></tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>
  `;
}

function konfirmasiTransfer(idx) {
  payoutData[idx].status = 'Transfer Selesai';
  loadOwnerPayout();
}

function loadOwnerKomisi() {
  const main = document.getElementById('mainContent');
  let logRows = operasionalData.map((item, idx) => `
    <tr>
      <td>${item.tgl}</td>
      <td><strong>${item.ket}</strong></td>
      <td><span class="badge badge-warning">${item.kat}</span></td>
      <td>Rp ${item.nominal.toLocaleString()}</td>
      <td><button class="btn-action" style="background:#dc2626;" onclick="hapusOperasional(${idx})">Hapus</button></td>
    </tr>
  `).join('');

  main.innerHTML = `
    <div class="dashboard-grid" style="margin-bottom:24px;">
      <div class="card-box">
        <h3>Pengaturan Skema Komisi</h3>
        <p style="font-size:0.85rem; color:var(--muted-text); margin-bottom:12px;">Persentase Potongan Owner (%):</p>
        <div style="display:flex; gap:10px;">
          <input type="number" id="inputKomisi" value="${persentaseKomisi}" min="1" max="100" style="padding:10px; border:1px solid #ccc; border-radius:8px; width:100px;">
          <button class="btn-action" onclick="simpanKomisi()">Simpan Komisi</button>
        </div>
      </div>

      <div class="card-box">
        <h3>+ Input Biaya Operasional Baru</h3>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <input type="text" id="opKet" placeholder="Keterangan Biaya (misal: Sewa Gudang/Ads)" style="padding:10px; border:1px solid #ccc; border-radius:8px;">
          <select id="opKat" style="padding:10px; border:1px solid #ccc; border-radius:8px;">
            <option value="Infrastructure">Infrastructure</option>
            <option value="Marketing">Marketing</option>
            <option value="Payroll">Payroll</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
          </select>
          <input type="number" id="opNominal" placeholder="Nominal Biaya (Rp)" style="padding:10px; border:1px solid #ccc; border-radius:8px;">
          <button class="btn-action" onclick="tambahOperasional()">Simpan Biaya Operasional</button>
        </div>
      </div>
    </div>

    <div class="card-box">
      <h3>Daftar Log Biaya Operasional Usaha</h3>
      <table class="custom-table">
        <thead>
          <tr><th>Tanggal</th><th>Keterangan Biaya</th><th>Kategori</th><th>Nominal (Rp)</th><th>Aksi</th></tr>
        </thead>
        <tbody>${logRows}</tbody>
      </table>
    </div>
  `;
}

function simpanKomisi() {
  const val = parseInt(document.getElementById('inputKomisi').value);
  if (val > 0) {
    persentaseKomisi = val;
    alert(`Skema komisi berhasil diubah menjadi ${persentaseKomisi}%!`);
    loadOwnerDashboard();
  }
}

function tambahOperasional() {
  const ket = document.getElementById('opKet').value;
  const kat = document.getElementById('opKat').value;
  const nom = parseInt(document.getElementById('opNominal').value);

  if (ket && nom > 0) {
    const today = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    operasionalData.unshift({ tgl: today, ket: ket, kat: kat, nominal: nom });
    alert('Data biaya operasional berhasil ditambahkan!');
    loadOwnerKomisi();
  } else {
    alert('Mohon isi keterangan dan nominal biaya dengan benar.');
  }
}

function hapusOperasional(idx) {
  operasionalData.splice(idx, 1);
  loadOwnerKomisi();
}


// ================= MODUL HALAMAN MITRA =================

function loadMitraDashboard() {
  const main = document.getElementById('mainContent');
  const stokTipisCount = produkData.filter(p => p.stok < 5).length;

  main.innerHTML = `
    <div class="banner-alert">
      ⚠️ <strong>Peringatan Stok Tipis:</strong> Ada ${stokTipisCount} produk Anda yang stoknya kurang dari 5 unit! Memerlukan restok segera.
    </div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <h4>Total Saldo Bagi Hasil</h4>
        <div class="value">Rp 34.500.000</div>
        <div class="sub-text">↑ +14.2% dari bulan lalu</div>
      </div>
      <div class="kpi-card">
        <h4>Total Terjual</h4>
        <div class="value">1,420 Pcs</div>
        <div class="sub-text">↑ +8.5% pesanan baru</div>
      </div>
      <div class="kpi-card">
        <h4>Status Payout Terbaru</h4>
        <div class="value">Diproses</div>
        <div class="sub-text">Estimasi Cair: 28 Oct</div>
      </div>
      <div class="kpi-card">
        <h4>Produk Aktif</h4>
        <div class="value">${produkData.length} SKU</div>
        <div class="sub-text" style="color:#d97706;">${stokTipisCount} Butuh Restok</div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="card-box">
        <h3>Grafik Penjualan Bulanan (2026)</h3>
        <canvas id="mitraChart" height="120"></canvas>
      </div>
      <div class="card-box">
        <h3>Top 3 Produk Terlaris</h3>
        <ul style="list-style:none; padding-top:10px;">
          <li style="padding:10px 0; border-bottom:1px solid #eee;">
            <strong>Kaos Oversize Streetwear</strong><br>
            <small style="color:var(--muted-text);">420 Pcs Terjual • Rp 63.0M</small>
          </li>
          <li style="padding:10px 0; border-bottom:1px solid #eee;">
            <strong>Hoodie Heavyweight Fleece</strong><br>
            <small style="color:var(--muted-text);">310 Pcs Terjual • Rp 89.9M</small>
          </li>
          <li style="padding:10px 0;">
            <strong>Celana Cargo Tactical</strong><br>
            <small style="color:var(--muted-text);">250 Pcs Terjual • Rp 62.5M</small>
          </li>
        </ul>
      </div>
    </div>
  `;

  const ctx = document.getElementById('mitraChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      datasets: [{ label: 'Unit Terjual (Pcs)', data: [180, 240, 310, 290, 350, 420], backgroundColor: '#ff6b35' }]
    }
  });
}

function loadMitraStok() {
  const main = document.getElementById('mainContent');
  let tableRows = produkData.map((item, index) => `
    <tr>
      <td><strong>${item.sku}</strong></td>
      <td>${item.nama}</td>
      <td>${item.kategori}</td>
      <td>Rp ${item.harga.toLocaleString()}</td>
      <td><strong>${item.stok} Pcs</strong></td>
      <td><span class="badge ${item.stok < 5 ? 'badge-warning' : 'badge-success'}">${item.status}</span></td>
      <td><button class="btn-action" onclick="restokProdukMitra(${index})">+ Restok 10</button></td>
    </tr>
  `).join('');

  main.innerHTML = `
    <div class="card-box">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
        <h3>Kelola Produk & Stok Masuk</h3>
        <button class="btn-action" onclick="tambahProdukBaru()">+ Tambah Produk Baru</button>
      </div>
      <table class="custom-table">
        <thead>
          <tr><th>SKU</th><th>Nama Produk</th><th>Kategori</th><th>Harga</th><th>Stok</th><th>Status</th><th>Aksi Stok</th></tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>
  `;
}

function restokProdukMitra(index) {
  produkData[index].stok += 10;
  if (produkData[index].stok >= 5) produkData[index].status = 'Aman';
  loadMitraStok();
}

function tambahProdukBaru() {
  const nama = prompt("Masukkan Nama Produk:");
  const harga = prompt("Masukkan Harga (Rp):");
  if (nama && harga) {
    produkData.push({ sku: 'NEW-' + Math.floor(Math.random() * 1000), nama: nama, kategori: 'Umum', harga: parseInt(harga), stok: 15, status: 'Aman' });
    loadMitraStok();
  }
}

function loadMitraPayout() {
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <div class="card-box" style="margin-bottom:20px; background:var(--accent-orange);">
      <h4 style="color:var(--primary-orange);">REKENING PENCAIRAN AKTIF</h4>
      <p style="font-size:1.1rem; font-weight:700; margin-top:4px;">Bank BCA - 8820491022</p>
      <p style="font-size:0.85rem; color:var(--muted-text);">a.n PT Mitra Brand Fashion Indonesia</p>
    </div>

    <div class="card-box">
      <h3>Riwayat Pencairan & Payout Bagi Hasil</h3>
      <table class="custom-table">
        <thead>
          <tr><th>ID Payout</th><th>Tanggal Pencairan</th><th>Nominal Bagi Hasil</th><th>Status Transfer</th><th>Bukti Transfer</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>PO-2026-101</td>
            <td>24 Oct 2026</td>
            <td>Rp 8.250.000</td>
            <td><span class="badge badge-warning">Sedang Diproses</span></td>
            <td>Pending</td>
          </tr>
          <tr>
            <td>PO-2026-098</td>
            <td>17 Oct 2026</td>
            <td>Rp 6.400.000</td>
            <td><span class="badge badge-success">Berhasil</span></td>
            <td><a href="#" style="color:var(--primary-orange);">Struk_098.pdf</a></td>
          </tr>
          <tr>
            <td>PO-2026-090</td>
            <td>10 Oct 2026</td>
            <td>Rp 5.150.000</td>
            <td><span class="badge badge-success">Berhasil</span></td>
            <td><a href="#" style="color:var(--primary-orange);">Struk_090.pdf</a></td>
          </tr>
          <tr>
            <td>PO-2026-082</td>
            <td>03 Oct 2026</td>
            <td>Rp 7.900.000</td>
            <td><span class="badge badge-success">Berhasil</span></td>
            <td><a href="#" style="color:var(--primary-orange);">Struk_082.pdf</a></td>
          </tr>
          <tr>
            <td>PO-2026-075</td>
            <td>26 Sep 2026</td>
            <td>Rp 4.800.000</td>
            <td><span class="badge badge-success">Berhasil</span></td>
            <td><a href="#" style="color:var(--primary-orange);">Struk_075.pdf</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}