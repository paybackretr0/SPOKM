// notifFti.js
const socket = io("http://localhost:3000"); // Ganti URL dengan alamat server Anda jika berbeda

// Saat terhubung, bergabung dengan room 'adminfti'
socket.on("connect", () => {
  console.log("Connected to server");
  socket.emit("joinRoom", "adminfti"); // Emit untuk bergabung dengan room 'adminfti'
});

// Menerima notifikasi kegiatan baru
socket.on("new_kegiatan", (data) => {
  console.log("Notifikasi baru:", data);
  showNotification(data);
});

// Fungsi untuk menampilkan notifikasi di dashboard
function showNotification(data) {
  const notificationContainer = document.getElementById(
    "notification-container"
  );
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = `
    <strong>${data.message}</strong>
    <p>${data.kegiatan.namaKegiatan} oleh ${data.kegiatan.nama}</p>
  `;
  notificationContainer.appendChild(notification);

  // Menghapus notifikasi setelah beberapa detik
  setTimeout(() => {
    notificationContainer.removeChild(notification);
  }, 5000);
}
