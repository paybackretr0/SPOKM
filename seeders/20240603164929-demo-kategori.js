"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { customAlphabet } = await import("nanoid");
    const nanoid = customAlphabet("0123456789", 2);
    await queryInterface.bulkInsert(
      "Kategoris",
      [
        {
          idKategori: "K" + nanoid(),
          namaKategori: "Pengumuman",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idKategori: "K" + nanoid(),
          namaKategori: "Berita",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idKategori: "K" + nanoid(),
          namaKategori: "Kegiatan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idKategori: "K" + nanoid(),
          namaKategori: "Tulisan Pendek",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idKategori: "K" + nanoid(),
          namaKategori: "Opini",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Kategoris", null, {});
  },
};
