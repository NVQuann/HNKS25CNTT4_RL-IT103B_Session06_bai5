let choice;
let contractRevenue = 0;
let vatTotal = 0;
let bankRevenue = 0;
let contractCount = 0;
let transactionData = "";
let transactionCount = 0;
let cashRevenue = 0;
let transferRevenue = 0;
let cardRevenue = 0;

do {
  console.log("---------- GYM FITNESS FINANCE ----------");
  console.log("1. Quyet toan hop dong goi tap");
  console.log("2. Doi soat chuoi giao dich ngan hang");
  console.log("3. Tra cuu giao dich");
  console.log("4. Bao cao quyet toan tai chinh");
  console.log("0. Thoat chuong trinh");
  console.log("---------------------------------");

  choice = prompt("Nhap lua chon cua ban:");

  switch (choice) {
    case "1": {
      let memberName = prompt("Nhap ten hoi vien:");
      memberName = memberName.trim();

      if (memberName === "") {
        console.log("Ten hoi vien khong duoc de trong!");
        break;
      }

      let sessions = Number(prompt("Nhap so buoi tap:"));

      if (!Number.isInteger(sessions) || sessions <= 0) {
        console.log("So buoi tap khong hop le!");
        break;
      }

      let paymentMethod = prompt(
        "Chon phuong thuc thanh toan (CASH/TRANSFER/CARD):",
      );
      paymentMethod = paymentMethod.trim().toUpperCase();

      if (
        paymentMethod !== "CASH" &&
        paymentMethod !== "TRANSFER" &&
        paymentMethod !== "CARD"
      ) {
        console.log("Phuong thuc thanh toan khong hop le!");
        break;
      }

      let price = 350000;
      let subtotal = sessions * price;
      let discountRate = 0;

      if (sessions > 50) {
        discountRate = 0.2;
      } else if (sessions > 30) {
        discountRate = 0.1;
      }

      let discount = subtotal * discountRate;
      let afterDiscount = subtotal - discount;
      let vat = afterDiscount * 0.08;
      let finalTotal = afterDiscount + vat;

      console.log("          HOA DON QUYET TOAN HOP DONG");
      console.log(`Hoi vien: ${memberName}`);
      console.log(`So buoi tap: ${sessions}`);
      console.log(`Don gia: ${price.toLocaleString("vi-VN")} VND`);
      console.log(`Tien truoc giam: ${subtotal.toLocaleString("vi-VN")} VND`);
      console.log(`Chiet khau: ${discountRate * 100}%`);
      console.log(`Tien giam: ${discount.toLocaleString("vi-VN")} VND`);
      console.log(
        `Tien sau giam: ${afterDiscount.toLocaleString("vi-VN")} VND`,
      );
      console.log(`VAT (8%): ${vat.toLocaleString("vi-VN")} VND`);
      console.log(`Tong thanh toan: ${finalTotal.toLocaleString("vi-VN")} VND`);
      console.log(`Phuong thuc: ${paymentMethod}`);
      contractRevenue += finalTotal;
      vatTotal += vat;
      contractCount++;

      if (paymentMethod === "CASH") {
        cashRevenue += finalTotal;
      } else if (paymentMethod === "TRANSFER") {
        transferRevenue += finalTotal;
      } else {
        cardRevenue += finalTotal;
      }

      console.log("Quyet toan hop dong thanh cong!");

      break;
    }

    case "2": {
      let input = prompt(
        "Nhap chuoi giao dich (VD: TX01:500000:SUCCESS|TX02:1200000:SUCCESS):",
      );

      if (input === null || input.trim() === "") {
        console.log("Chuoi giao dich khong duoc de trong!");
        break;
      }

      input = input.trim().toUpperCase();

      let remaining = input;
      let total = 0;
      let count = 0;
      let valid = true;
      let seenCodes = "|";

      while (remaining.length > 0) {
        let separator = remaining.indexOf("|");
        let transaction;

        if (separator === -1) {
          transaction = remaining;
          remaining = "";
        } else {
          transaction = remaining.slice(0, separator);
          remaining = remaining.slice(separator + 1);
        }

        let firstColon = transaction.indexOf(":");
        let lastColon = transaction.lastIndexOf(":");

        if (
          firstColon === -1 ||
          lastColon === firstColon ||
          firstColon === 0 ||
          lastColon === transaction.length - 1
        ) {
          valid = false;
          break;
        }

        let code = transaction.slice(0, firstColon).trim();
        let amountText = transaction.slice(firstColon + 1, lastColon).trim();
        let status = transaction.slice(lastColon + 1).trim();
        let amount = Number(amountText);

        if (
          code === "" ||
          amountText === "" ||
          !Number.isFinite(amount) ||
          amount < 0 ||
          (status !== "SUCCESS" && status !== "FAILED") ||
          seenCodes.indexOf("|" + code + "|") !== -1
        ) {
          valid = false;
          break;
        }

        seenCodes += code + "|";

        if (status === "SUCCESS") {
          total += amount;
          count++;
        }
      }

      if (!valid) {
        console.log("Du lieu giao dich khong hop le!");
        break;
      }

      transactionData = input;
      bankRevenue = total;
      transactionCount = count;

      console.log("          KET QUA DOI SOAT");
      console.log(`Tong giao dich SUCCESS: ${transactionCount}`);
      console.log(
        `Tong tien thuc thu: ${bankRevenue.toLocaleString("vi-VN")} VND`,
      );
      console.log("-".repeat(50));
      console.log("Cac giao dich FAILED da duoc bo qua.");

      break;
    }

    case "3": {
      if (transactionData === "") {
        console.log("Vui long doi soat giao dich truoc!");
        break;
      }

      let searchCode = prompt("Nhap ma giao dich can tra cuu:");
      searchCode = searchCode.trim().toUpperCase();

      if (searchCode === "") {
        console.log("Ma giao dich khong duoc de trong!");
        break;
      }

      let remaining = transactionData;
      let found = false;

      while (remaining.length > 0) {
        let separator = remaining.indexOf("|");
        let transaction;

        if (separator === -1) {
          transaction = remaining;
          remaining = "";
        } else {
          transaction = remaining.slice(0, separator);
          remaining = remaining.slice(separator + 1);
        }

        let firstColon = transaction.indexOf(":");
        let lastColon = transaction.lastIndexOf(":");

        let code = transaction.slice(0, firstColon).trim();

        if (code === searchCode) {
          let amount = Number(
            transaction.slice(firstColon + 1, lastColon).trim(),
          );
          let status = transaction.slice(lastColon + 1).trim();

          console.log("          THONG TIN GIAO DICH");
          console.log(`Ma giao dich: ${code}`);
          console.log(`So tien: ${amount.toLocaleString("vi-VN")} VND`);
          console.log(`Trang thai: ${status}`);

          found = true;
          break;
        }
      }

      if (!found) {
        console.log("Khong tim thay giao dich!");
      }

      break;
    }

    case "4": {
      console.log("           BAO CAO QUYET TOAN TAI CHINH");
      console.log("DOANH THU HOP DONG");
      console.log(
        "So hop dong:".padEnd(30) + String(contractCount).padStart(15),
      );
      console.log(
        "Doanh thu hop dong:".padEnd(30) +
          (contractRevenue.toLocaleString("vi-VN") + " VND").padStart(25),
      );
      console.log(
        "Tong VAT:".padEnd(30) +
          (vatTotal.toLocaleString("vi-VN") + " VND").padStart(25),
      );

      console.log("DOANH THU THEO PHUONG THUC");
      console.log(
        "Tien mat:".padEnd(30) +
          (cashRevenue.toLocaleString("vi-VN") + " VND").padStart(25),
      );
      console.log(
        "Chuyen khoan:".padEnd(30) +
          (transferRevenue.toLocaleString("vi-VN") + " VND").padStart(25),
      );
      console.log(
        "The tin dung:".padEnd(30) +
          (cardRevenue.toLocaleString("vi-VN") + " VND").padStart(25),
      );

      console.log("DOI SOAT NGAN HANG");
      console.log(
        "Giao dich SUCCESS:".padEnd(30) + String(transactionCount).padStart(15),
      );
      console.log(
        "Tien thuc thu:".padEnd(30) +
          (bankRevenue.toLocaleString("vi-VN") + " VND").padStart(25),
      );
      console.log("Ket thuc bao cao tai chinh.");
      break;
    }

    case "0":
      console.log("Da thoat chuong trinh!");
      break;

    default:
      console.log("Lua chon khong hop le! Vui long chon lai.");
  }
} while (choice !== "0");
