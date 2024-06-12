const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to Admin FTI");
  socket.emit("joinRoom", "adminfti");
});

socket.on("new_kegiatan", (data) => {
  console.log(data);
  console.log("Notifikasi baru:", data);
  showNotification(data, "kegiatan");
});

socket.on("new_kegiatanMhs", (dataMhs) => {
  console.log(dataMhs);
  console.log("Notifikasi baru dari Mahasiswa:", dataMhs);
  showNotification(dataMhs, "kegiatan");
});

socket.on("new_organisasi", (dataOrg) => {
  console.log(dataOrg);
  console.log("Notifikasi baru dari Mahasiswa:", dataOrg);
  showNotification(dataOrg, "orga");
});

function showNotification(data, type) {
  const notificationContainer = document.getElementById(
    "notification-container"
  );
  const notification = document.createElement("div");
  notification.className = "notification";
  if (type === "kegiatan") {
    notification.innerHTML = `
      <strong>${data.message}</strong>
      <p>${data.kegiatan.namaKegiatan} oleh ${data.kegiatan.nama}</p>
    `;
  } else if (type === "orga") {
    notification.innerHTML = `
      <strong>${data.message}</strong>
      <p>${data.orga.namaOrga} oleh ${data.orga.nama}</p>
    `;
  } else if (type === "accKegiatan") {
    notification.innerHTML = `
      <strong>${data.message}</strong>
      <p>Notification from adminfti</p>
    `;
  }
  notificationContainer.appendChild(notification);

  setTimeout(() => {
    notificationContainer.removeChild(notification);
  }, 5000);
}
