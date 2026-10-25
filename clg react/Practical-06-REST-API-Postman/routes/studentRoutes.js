import express from 'express';
import { students } from '../data/studentsData.js';

const router = express.Router();

/**
 * 1. GET /api/students/stats/summary
 * Aggregated analytics
 */
router.get('/stats/summary', (req, res) => {
  const total = students.length;
  const avgCgpa =
    total > 0
      ? (students.reduce((acc, s) => acc + (s.cgpa || 0), 0) / total).toFixed(2)
      : 0;

  const deptCounts = students.reduce((acc, curr) => {
    acc[curr.department] = (acc[curr.department] || 0) + 1;
    return acc;
  }, {});

  res.status(200).json({
    success: true,
    data: {
      totalStudents: total,
      averageCgpa: parseFloat(avgCgpa),
      departmentBreakdown: deptCounts
    }
  });
});

/**
 * 2. GET /api/students
 * Read all students with Pagination, Sorting, Search & Department filtering
 */
router.get('/', (req, res) => {
  let result = [...students];
  const { department, search, sort, page, limit } = req.query;

  // Filter by Department
  if (department && department !== 'All') {
    result = result.filter(
      (s) => s.department.toLowerCase() === department.toLowerCase()
    );
  }

  // Search by Roll No, Name, or Email
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (s) =>
        s.fullName.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
    );
  }

  // Sorting: e.g. ?sort=cgpa:desc or ?sort=fullName:asc
  if (sort) {
    const [field, direction] = sort.split(':');
    result.sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (direction === 'desc') {
        return valA < valB ? 1 : valA > valB ? -1 : 0;
      }
      return valA > valB ? 1 : valA < valB ? -1 : 0;
    });
  }

  // Pagination: e.g. ?page=1&limit=5
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = pageNum * limitNum;
  const paginatedData = result.slice(startIndex, endIndex);

  res.status(200).json({
    success: true,
    totalRecords: result.length,
    page: pageNum,
    totalPages: Math.ceil(result.length / limitNum),
    count: paginatedData.length,
    data: paginatedData
  });
});

/**
 * 3. GET /api/students/:id
 * Retrieve single student by ID
 */
router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student Record with ID ${studentId} not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

/**
 * 4. POST /api/students
 * Create new student record with validation
 */
router.post('/', (req, res) => {
  const { rollNo, fullName, email, phone, department, semester, cgpa, gender, skills } = req.body;

  // Validation
  if (!rollNo || !rollNo.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "rollNo" is required (e.g. STU-1006).'
    });
  }

  if (!fullName || !fullName.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "fullName" is required.'
    });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Valid "email" address is required.'
    });
  }

  // Check unique rollNo
  const duplicate = students.some(
    (s) => s.rollNo.toUpperCase() === rollNo.trim().toUpperCase()
  );
  if (duplicate) {
    return res.status(400).json({
      success: false,
      message: `Conflict Error: Roll Number "${rollNo}" is already registered.`
    });
  }

  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  const newStudent = {
    id: newId,
    rollNo: rollNo.trim().toUpperCase(),
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : 'N/A',
    department: department || 'Computer Science',
    semester: semester ? parseInt(semester, 10) : 1,
    cgpa: cgpa !== undefined ? parseFloat(cgpa) : 0.0,
    gender: gender || 'Not Specified',
    skills: Array.isArray(skills) ? skills : ['General'],
    enrollmentDate: new Date().toISOString().split('T')[0]
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student record created successfully.',
    data: newStudent
  });
});

/**
 * 5. PUT /api/students/:id
 * Replace / Update entire student record
 */
router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student Record with ID ${studentId} not found.`
    });
  }

  const { rollNo, fullName, email, phone, department, semester, cgpa, gender, skills } = req.body;

  const updatedStudent = {
    id: studentId,
    rollNo: rollNo ? rollNo.trim().toUpperCase() : students[index].rollNo,
    fullName: fullName ? fullName.trim() : students[index].fullName,
    email: email ? email.trim().toLowerCase() : students[index].email,
    phone: phone ? phone.trim() : students[index].phone,
    department: department || students[index].department,
    semester: semester !== undefined ? parseInt(semester, 10) : students[index].semester,
    cgpa: cgpa !== undefined ? parseFloat(cgpa) : students[index].cgpa,
    gender: gender || students[index].gender,
    skills: Array.isArray(skills) ? skills : students[index].skills,
    enrollmentDate: students[index].enrollmentDate
  };

  students[index] = updatedStudent;

  res.status(200).json({
    success: true,
    message: `Student Record #${studentId} updated completely.`,
    data: updatedStudent
  });
});

/**
 * 6. PATCH /api/students/:id
 * Partial update of specific fields
 */
router.patch('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student Record with ID ${studentId} not found.`
    });
  }

  const allowedUpdates = ['fullName', 'email', 'phone', 'department', 'semester', 'cgpa', 'skills'];
  const updates = Object.keys(req.body);

  updates.forEach((field) => {
    if (allowedUpdates.includes(field)) {
      students[index][field] = req.body[field];
    }
  });

  res.status(200).json({
    success: true,
    message: `Student Record #${studentId} partially updated.`,
    data: students[index]
  });
});

/**
 * 7. DELETE /api/students/:id
 * Delete student record by ID
 */
router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student Record with ID ${studentId} not found.`
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Student "${deletedStudent.fullName}" (${deletedStudent.rollNo}) deleted successfully.`,
    data: deletedStudent
  });
});

export default router;
