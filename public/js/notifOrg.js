const socket = io("http://localhost:3000");
socket.on("connect", () => {
  console.log("Connected to Admin Organisasi");
  socket.emit("joinRoom", "adminorg");
});

socket.on("new_notifikasi", (data) => {
  console.log("Notifikasi baru:", data);
  showNotification(data);
});

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

  setTimeout(() => {
    notificationContainer.removeChild(notification);
  }, 5000);
}
