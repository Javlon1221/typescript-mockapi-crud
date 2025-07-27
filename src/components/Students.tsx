import React from 'react';
import { useStudent } from '../api/hooks/useStudent';

const Students = () => {
  const { getStudentsQuery, deleteStudents, editStudents } = useStudent();
  const { data: students = [], isLoading } = getStudentsQuery;

  const [data, setData] = React.useState(students);
  const [selectedStudent, setSelectedStudent] = React.useState<any>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    fname: '',
    lname: '',
    phone_number: '',
  });

  React.useEffect(() => {
    if (students) {
      setData(students);
    }
  }, [students]);

  const handleDelete = (id: string) => {
    if (window.confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
      deleteStudents.mutate(id);
    }
  };

  const handleEdit = (student: any) => {
    setSelectedStudent(student);
    setForm({
      fname: student.fname,
      lname: student.lname,
      phone_number: student.phone_number,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedStudent) {
      editStudents.mutate({
        ...selectedStudent,
        ...form,
      });
      setIsModalOpen(false);
    }
  };

  if (isLoading) return <p>Yuklanmoqda...</p>;

  return (
    <div className="container">
      <h2>Talabalar ro'yxati </h2>
      <div className="card-list">
        {data.map((student: any) => (
          <div className="card" key={student.id}>
            <img src={student.img} alt="student" className="avatar" />
            <h3>{student.fname} {student.lname}</h3>
            <p><b>Tug'ilgan sana:</b> {student.birthday}</p>
            <p><b>Manzil:</b> {student.addres}</p>
            <p><b>Telefon:</b> {student.phone_number}</p>
            <div className="actions">
              <button className="edit" onClick={() => handleEdit(student)}>Tahrirlash</button>
              <button className="delete" onClick={() => handleDelete(student.id)}>O'chirish</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal oynasi */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Talaba ma'lumotlarini tahrirlash</h3>
            <label>Ism</label>
            <input
              type="text"
              value={form.fname}
              onChange={(e) => setForm({ ...form, fname: e.target.value })}
            />
            <label>Familiya</label>
            <input
              type="text"
              value={form.lname}
              onChange={(e) => setForm({ ...form, lname: e.target.value })}
            />
            <label>Telefon</label>
            <input
              type="text"
              value={form.phone_number}
              onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={handleSave}>Saqlash</button>
              <button className="cancel" onClick={() => setIsModalOpen(false)}>Bekor qilish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Students);
