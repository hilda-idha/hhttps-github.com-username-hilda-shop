let cart = [];
let products = [
    { nama: 'baju batik pria', harga: 200000, gambar: 'img/Baju Batik pria.jpeg' },
    { nama: 'baju batik wanita', harga: 150000, gambar: 'img/baju batik wanita.jpeg' },
    { nama: 'baju kaos', harga: 100000, gambar: 'img/baju kaos.jpeg' },
    { nama: 'cardigan rajut', harga: 200000, gambar: 'img/cardigan rajut.jpeg' },
    { nama: 'celana jins wanita', harga: 250000, gambar: 'img/celana jins wanita.jpeg' },
    { nama: 'gamis', harga: 300000, gambar: 'img/gamis.jpeg' },
    { nama: 'kemeja pria', harga: 150000, gambar: 'img/kemeja pria.jpeg' },
    { nama: 'kemeja wanita', harga: 200000, gambar: 'img/kemeja wanita.jpeg' },
    { nama: 'kaos crop top', harga: 80000, gambar: 'img/kaos crop top.jpeg' },
    { nama: 'baju krop top', harga: 100000, gambar: 'img/baju krop top.jpeg' },
    { nama: 'baju tidur', harga: 150000, gambar: 'img/baju tidur.jpeg' },
    { nama: 'blazer wanita', harga: 200000, gambar: 'img/blezer wanita.jpeg' },
    { nama: 'jas pria', harga: 300000, gambar: 'img/jas pria.jpeg' },
    { nama: 'kemeja crop top', harga: 150000, gambar: 'img/kemeja crop top.jpeg' },
    { nama: 'kerudung segi empat', harga: 50000, gambar: 'img/kerudung segi empat.jpeg' },
    { nama: 'Pashmina Kaos', harga: 50000, gambar: 'img/Pashmina Kaos.jpeg' }
];

/// Ambil data keranjang dari localStorage saat halaman dimuat
window.onload = function () {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    updateCart();  // Memperbarui jumlah produk di header
    if (typeof updateProductList === 'function') {
        updateProductList(); // Update produk di halaman utama (index.html)
    }
};

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(nama, harga) {
    const existingItem = cart.find(item => item.nama === nama);

    if (existingItem) {
        existingItem.jumlah += 1;
    } else {
        cart.push({ nama, harga, jumlah: 1 });
    }

    saveCart();
    updateCart(); // Perbarui jumlah produk di header dan keranjang
}


// Fungsi untuk menghapus produk dari keranjang
function removeFromCart(index) {
    if (cart[index].jumlah > 1) {
        cart[index].jumlah -= 1;
    } else {
        cart.splice(index, 1); // Hapus item kalau jumlah tinggal 1
    }
    saveCart();
    updateCart(); // Perbarui jumlah produk di header dan keranjang
}

// Fungsi untuk menghapus semua item dalam keranjang
function clearCart() {
    cart = [];
    saveCart();
    updateCart();
}
// Fungsi untuk menyimpan data keranjang ke localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCountHeader = document.getElementById("cart-count-header");
    const cartCountSection = document.getElementById("cart-count-section");
    const cartTotal = document.getElementById("cart-total");

    if (cartItems) cartItems.innerHTML = "";

    let total = 0;
    let totalJumlah = 0;

    cart.forEach((item, index) => {
        if (cartItems) {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.nama} (x${item.jumlah}) - Rp${(item.harga * item.jumlah).toLocaleString("id-ID")}
                <button class="hapus-btn" onclick="removeFromCart(${index})">❌</button>
            `;
            cartItems.appendChild(li);
        }

        total += item.harga * item.jumlah;
        totalJumlah += item.jumlah;
    });

    // Perbarui jumlah produk di menu header dan halaman keranjang
    if (cartCountHeader) cartCountHeader.textContent = totalJumlah;
    if (cartCountSection) cartCountSection.textContent = totalJumlah;
    if (cartTotal) cartTotal.textContent = `Rp${total.toLocaleString("id-ID")}`;
}

// Fungsi untuk menampilkan produk yang ada
function updateProductList() {
    const produkContainer = document.querySelector(".produk-container");
    produkContainer.innerHTML = '';

    products.forEach((product) => {
        const div = document.createElement('div');
        div.classList.add('produk');
        div.innerHTML = `
            <img src="${product.gambar}" alt="${product.nama}">
            <h3>${product.nama}</h3>
            <p>Rp${product.harga.toLocaleString('id-ID')}</p>
            <button onclick="addToCart('${product.nama}', ${product.harga})">Tambah ke Keranjang</button>
            <button onclick="buyNow('${product.nama}', ${product.harga})">Beli Sekarang</button> <!-- Tombol Beli Sekarang -->
        `;
        produkContainer.appendChild(div);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const checkoutBtn = document.getElementById("checkout-btn");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            if (cart.length === 0) {
                alert("Keranjang Anda kosong. Tambahkan produk terlebih dahulu.");
            } else {
                const total = cart.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);
                const konfirmasi = confirm(
                    `Total belanja Anda Rp${total.toLocaleString('id-ID')}. Lanjutkan pembelian?`
                );

                if (konfirmasi) {
                    alert("Terima kasih telah berbelanja! Pesanan Anda sedang diproses.");
                    cart = [];
                    saveCart();
                    updateCart();
                }
            }
            updateCart();
        });
    }
});
function increaseQuantity(index) {
    cart[index].jumlah += 1;
    saveCart();
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].jumlah > 1) {
        cart[index].jumlah -= 1;
    } else {
        cart.splice(index, 1); // hapus jika tinggal 1
    }
    saveCart();
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}
// Fungsi untuk menambahkan produk dan langsung menuju ke halaman keranjang
function buyNow(nama, harga) {
    addToCart(nama, harga); // Tambahkan produk ke keranjang
    goToCart(); // Arahkan ke bagian keranjang
}

// Fungsi untuk pergi ke bagian keranjang
function goToCart() {
    // Cek apakah keranjang berisi produk
    if (cart.length === 0) {
        alert("Keranjang Anda kosong.");
    } else {
        // Men-scroll ke bagian keranjang belanja
        const cartSection = document.getElementById("cart-section");
        if (cartSection) {
            cartSection.scrollIntoView({ behavior: "smooth" });
        }
    }
}


// Ambil data keranjang dari localStorage
window.onload = function () {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCart();
};

// Fungsi untuk memperbarui tampilan keranjang
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCountSection = document.getElementById("cart-count-section");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;
    let totalJumlah = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nama} (x${item.jumlah}) - Rp${(item.harga * item.jumlah).toLocaleString("id-ID")}
            <button class="hapus-btn" onclick="removeFromCart(${index})">❌</button>
        `;
        cartItems.appendChild(li);
        total += item.harga * item.jumlah;
        totalJumlah += item.jumlah;
    });

    cartCountSection.textContent = totalJumlah;
    cartTotal.textContent = `Rp${total.toLocaleString("id-ID")}`;
}
