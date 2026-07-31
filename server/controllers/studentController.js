const Student = require('../models/Student');

async function listStudents(req, res) {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
  const q = (req.query.q || '').trim();

  const filter = q
    ? {
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } },
          { rollNumber: { $regex: q, $options: 'i' } },
          { course: { $regex: q, $options: 'i' } },
        ],
      }
    : {};

  const [data, total] = await Promise.all([
    Student.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Student.countDocuments(filter),
  ]);

  res.json({ data, total, page, pages: Math.ceil(total / limit) || 1 });
}

async function getStudent(req, res) {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json({ student });
}

async function createStudent(req, res) {
  const { name, email, rollNumber, course, phone, address, dateOfEnrollment } = req.body;

  const existing = await Student.findOne({ $or: [{ email }, { rollNumber }] });
  if (existing) return res.status(409).json({ message: 'Student with this email or roll number already exists' });

  const student = await Student.create({
    name,
    email,
    rollNumber,
    course,
    phone,
    address,
    dateOfEnrollment,
    createdBy: req.user._id,
  });
  res.status(201).json({ student });
}

async function updateStudent(req, res) {
  const { name, email, rollNumber, course, phone, address, dateOfEnrollment } = req.body;

  const duplicate = await Student.findOne({
    _id: { $ne: req.params.id },
    $or: [{ email }, { rollNumber }],
  });
  if (duplicate) return res.status(409).json({ message: 'Another student already uses this email or roll number' });

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { name, email, rollNumber, course, phone, address, dateOfEnrollment },
    { new: true, runValidators: true }
  );
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json({ student });
}

async function deleteStudent(req, res) {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json({ message: 'Student deleted' });
}

async function getStats(req, res) {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [total, recent, recentList] = await Promise.all([
    Student.countDocuments(),
    Student.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    Student.find({ createdAt: { $gte: sevenDaysAgo } }).sort({ createdAt: -1 }).limit(5),
  ]);

  res.json({ totalStudents: total, recentRegistrations: recent, recentList });
}

module.exports = { listStudents, getStudent, createStudent, updateStudent, deleteStudent, getStats };
