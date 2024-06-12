const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to User");
  socket.emit("joinRoom", "adminorg");
});

socket.on("accKegiatan", (data) => {
  console.log("Notifikasi baru:", data);
  showNotification(data, "accKegiatan");
});

function showNotification(data, type) {
  const notificationContainer = document.getElementById(
    "notification-container"
  );
  const notification = document.createElement("div");
  notification.className = "notification";
  if (type === "accKegiatan") {
    notification.innerHTML = `
      <strong>${data.message}</strong>
      <p>Silakan Temui Pihak Fakultas</p>
    `;
  }
  notificationContainer.appendChild(notification);

  setTimeout(() => {
    notificationContainer.removeChild(notification);
  }, 5000);
}
