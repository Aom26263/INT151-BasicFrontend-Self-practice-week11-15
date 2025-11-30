// ให้chatGPT สร้างโจทให้
// ดึง element:
// ปุ่ม #load-btn
// ตาราง <tbody id="student-table">
// status #global-status (แสดงสถานะโหลดรวม)
// เมื่อกด #load-btn → ดำเนินการ:
// แสดง กำลังโหลดข้อมูล... (ใน global-status หรือในตารางระหว่างโหลด)
// GET http://localhost:3000/students (หรือใช้ relative /students ถ้า serve ด้วย Express)
// ถ้าสำเร็จ → สร้างแถว <tr> สำหรับแต่ละ student ตามรูปแบบ:
// <tr>
//   <td>{id}</td>
//   <td>{name or input when editing}</td>
//   <td>{major or input when editing}</td>
//   <td><!-- action buttons --></td>
// </tr>
// ในโหมดปกติ: action cell แสดงปุ่ม Edit (class edit-btn)
// เมื่อต้องการแก้ไข: replace ช่องชื่อ/สาขาด้วย <input class="input-edit"> และ action cell แสดงปุ่ม Save (class save-btn) และ Cancel (class cancel-btn)
// เมื่อผู้ใช้กด Edit บนแถวใดแถวหนึ่ง:
// เปลี่ยนแถวเป็นโหมดแก้ไข (input สำหรับ name และ major)
// ปุ่ม Edit เปลี่ยนเป็น Save และ Cancel
// เมื่อกด Save:
// แสดงข้อความสถานะในแถว เช่น กำลังบันทึก... (หรือ disable ปุ่มชั่วคราว)
// ส่ง PUT http://localhost:3000/students/:id โดย body เป็น JSON { name, major }
// ถ้า HTTP response OK → update DOM ให้แสดงค่าที่บันทึก (กลับเป็นโหมดปกติ)
// ถ้าเกิด error → ตรง action cell ให้แสดงข้อความ แก้ไขล้มเหลว (สีแดง) และอย่าเปลี่ยนข้อมูลเดิม (หรืออนุญาตให้ผู้ใช้ลองใหม่/cancel)
// เมื่อกด Cancel:
// ย้อนกลับเป็นโหมดปกติโดยแสดงข้อมูลเดิมจาก DOM (ไม่ส่งคำขอ)

document.addEventListener("DOMContentLoaded", () => {
    const loadbtn = document.getElementById("load-btn")
    const table = document.getElementById("student-table")

    loadbtn.addEventListener("click", loadstudent)
    async function loadstudent() {
        const res = await fetch("http://localhost:3000/students")
        if (!res.ok) {
            throw new Error ("load Error")
        }

        const student = await res.json()
        table.innerHTML = ""
        student.forEach((students) => {
            const tr = document.createElement("tr")
            tr.innerHTML = `
            <td>${students.id}</td>
            <td>${students.name}</td>
            <td>${students.major}</td>
            <td> 
            <button class="edit-btn">Edit</button>
            </td>
            `
            table.appendChild(tr);
            document.querySelectorAll(".edit-btn").forEach((btn) => {
                btn.addEventListener("click", () => enterEditMode(btn))
            })
        })
    }

    function enterEditMode(btn) {
    const row = btn.closest("tr");

    const id = row.children[0].textContent.trim();
    const oldName = row.children[1].textContent.trim();
    const oldMajor = row.children[2].textContent.trim();

    row.children[1].innerHTML = `<input class="input-edit" value="${oldName}">`;
    row.children[2].innerHTML = `<input class="input-edit" value="${oldMajor}">`;
    row.children[3].innerHTML = `
        <button class="save-btn">Save</button>
        <button class="cancel-btn">Cancel</button>
    `;

    const saveBtn = row.querySelector(".save-btn");
    const cancelBtn = row.querySelector(".cancel-btn");

    saveBtn.addEventListener("click", () => saveEdit(row, id));

    cancelBtn.addEventListener("click", () =>
      cancelEdit(row, oldName, oldMajor)
    );
  }

  async function saveEdit(row, id) {
    const newName = row.children[1].querySelector("input").value;
    const newMajor = row.children[2].querySelector("input").value;


    row.children[3].innerHTML = `<span style="color:#2563eb">กำลังบันทึก...</span>`;

    try {
      const res = await fetch(`http://localhost:3000/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          major: newMajor,
        }),
      });

      if (!res.ok) throw new Error("update failed");


      row.children[1].textContent = newName;
      row.children[2].textContent = newMajor;


      row.children[3].innerHTML = `<button class="edit-btn">Edit</button>`;

      row.querySelector(".edit-btn").addEventListener("click", (e) =>
        enterEditMode(e.target)
      );
    } catch (err) {
      console.error(err);
    }
  }

  function cancelEdit(row, oldName, oldMajor) {
    row.children[1].textContent = oldName;
    row.children[2].textContent = oldMajor;

    row.children[3].innerHTML = `<button class="edit-btn">Edit</button>`;
    row.querySelector(".edit-btn").addEventListener("click", (e) =>
      enterEditMode(e.target)
    );
  }
})