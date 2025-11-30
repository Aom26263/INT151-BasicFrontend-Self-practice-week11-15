// ให้chatGPT สร้างโจทให้
// ใช้ Fetch API ดึงข้อมูลมาแสดงในตาราง
// สามารถเพิ่มนักศึกษาใหม่ผ่านฟอร์ม → POST → Reload ตาราง

document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("student-table")
    const nameInput = document.getElementById("name")
    const majorInput = document.getElementById("major")
    const addbtn = document.getElementById("add-btn") 

    async function loadStudents() {
        table.innerHTML = ""
        const res = await fetch("http://localhost:3000/students")
        const students = await res.json()
        students.forEach( s => {
            const row = document.createElement("tr")
            row.innerHTML = `
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.major}</td>
            `
        
            table.appendChild(row)
        })
    }

    addbtn.addEventListener("click", async () => {
        const name = nameInput.value.trim()
        const major = majorInput.value.trim()
        if (!name || !major) return alert("Fill all fields")

        const res = await fetch("http://localhost:3000/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, major })
        });

        if (res.ok) {
            nameInput.value = ""
            majorInput.value = ""
            loadStudents()
        }
    })
    loadStudents();
})