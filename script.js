const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.bridestory.com/id/indonesia";

async function getData() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const targetCity = "Bali"; // Kota yang ingin difilter
    const vendors = [];

    $(".vendor-list-card").each((i, element) => {
      const name = $(element).find(".name").text().trim();

      // Mengambil elemen <a> yang berisi kota
      const cityElement = $(element).find("a.city_helper");
      const city = cityElement.text().trim(); // Ambil teks kota

      // Mengambil link vendor
      let link = $(element).find("a").attr("href");
      // Menambahkan domain jika link tidak lengkap
      if (link && !link.startsWith("http")) {
        link = "http://bridestory.com" + link;
      }

      // Filter berdasarkan kota
      if (city.includes(targetCity)) {
        // Menggunakan includes untuk mencocokkan nama kota
        vendors.push({ name, city, link });
      }
    });

    // Ambil hanya 5 vendor pertama
    const limitedVendors = vendors.slice(0, 5);
    console.log(limitedVendors); // Tampilkan hanya 5 vendor yang berada di Bali
  } catch (error) {
    console.error("Error fetching vendors:", error);
  }
}

getData();
