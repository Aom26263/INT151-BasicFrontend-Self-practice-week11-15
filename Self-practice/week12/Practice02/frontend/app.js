// ให้chatGPT สร้างโจทให้
// เมื่อผู้ใช้กดปุ่ม “ลบ” ที่แถวของนักศึกษาแต่ละคน
// ถ้าลบสำเร็จ ให้ลบแถวนั้นออกจากตารางทันที

document.addEventListener("DOMContentLoaded", () => {
    const loadBtn = document.getElementById("load-btn")
    const table = document.getElementById("student-table") 

    loadBtn.addEventListener("click", loadStudent)
    async function loadStudent() {
        try {
            const res = await fetch("http://localhost:3000/students")
            if (!res.ok) {
                throw new Error ("load error")
            }

            const students = await res.json()
            table.innerHTML = ""
            students.forEach((student) => {
                const tr = document.createElement("tr")
                tr.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.major}</td>
                <td>
                <button class="delete-btn" data-id="${student.id}">Delete</button>
                </td>
                `
            table.appendChild(tr);
            })

            document.querySelectorAll(".delete-btn").forEach((btn) => {
                btn.addEventListener("click", () => {
                    const studentId = btn.dataset.id;
                    deleteStudent(studentId, btn);
                })
            })

        } catch (err) {
            console.log(err);
        }
    }

    async function deleteStudent(studentId, btn) {
        try {
            const res = await fetch(`http://localhost:3000/students/${studentId}`, {
                method: "DELETE"
            })

            if (!res.ok) {
                throw new Error ("delete error")
            }
            
            const row = btn.closest("tr")
            row.remove();
        } catch (err)  {
            console.log(err);
        }
    }
})