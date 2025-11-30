// ให้chatGPT สร้างโจทให้
// 1
// แสดงเวลาปัจจุบัน (อัพเดตทุกวินาที)
// เมื่อเปิดหน้าขึ้นมา ให้แสดงเวลาแบบ HH:MM:SS ที่ <span id="current-time">
// ต้อง update ทุก 1 วินาที

function updateCurrentTime() {
    const time = document.getElementById("current-time")
    setInterval(() => {
    const now = new Date()
    const hh = String(now.getHours()).padStart(2, "0")
    const mm = String(now.getMinutes()).padStart(2, "0")
    const ss = String(now.getSeconds()).padStart(2, "0")

    time.textContent = `${hh}:${mm}:${ss}`
  }, 1000)
}

updateCurrentTime()

// 2
// คำนวณอายุจากวันเกิด
// ผู้ใช้กรอกวันเกิดใน <input type="date" id="birth-input">
// กดปุ่ม “คำนวณอายุ”
// แสดงผลที่ <div id="age-result">

document.getElementById("calc-age-btn").addEventListener("click", () => {
  try {
    const input = document.getElementById("birth-input").value
    const result = document.getElementById("age-result")

    if (!input) {
      result.textContent = "Choose date"
      result.style.color = "red"
      return
    }

    const birth = new Date(input)
    const today = new Date()
    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) {
      months--
      days += 30;
    }
    if (months < 0) {
      years--
      months += 12
    }

    result.style.color = "black"
    result.textContent = `${years} ปี ${months} เดือน ${days} วัน`

  } catch (err) {
    console.log(err);
  }
})