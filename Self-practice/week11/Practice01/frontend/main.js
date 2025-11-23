// ให้chatGPT สร้างโจทให้
// เมื่อผู้ใช้กดปุ่ม “โหลดข้อมูลนักศึกษา”
// frontend ต้องเรียก API:
// GET http://localhost:3000/students
// ให้นำข้อมูลที่ได้มา “แสดงในตาราง”
// หาก API ช้า ให้แสดงข้อความ
// กำลังโหลดข้อมูล...
// หาก fetch แล้วเกิด error เช่น
// ให้แสดงข้อความ - โหลดข้อมูลล้มเหลว
// ปุ่มกดทำงานโหลดข้อมูล เเล้วตารางขึ้นมา

document.addEventListener("DOMContentLoaded", () => {
    const studenttable = document.getElementById("student-table")
    const loadbtn = document.getElementById("load-btn")
    const status = document.getElementById("status")

    loadbtn.addEventListener("click", async () => {
        studenttable.innerHTML = ""         
        status.textContent = "กำลังโหลดข้อมูล..."

        try {
            const res = await fetch("http://localhost:3000/students")
            const students = await res.json()

            students.forEach(student => {
                const tr = document.createElement("tr")
                tr.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.major}</td>
                `;
                studenttable.appendChild(tr)
            });

            status.textContent = ""
        } catch (err) {
            console.error(err)
            status.textContent = "โหลดข้อมูลล้มเหลว"
        }
    })
})