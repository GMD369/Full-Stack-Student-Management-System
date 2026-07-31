require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');

const firstNames = [
  'Aisha', 'Bilal', 'Chen', 'Diana', 'Ehsan', 'Fatima', 'Gabriel', 'Hina',
  'Imran', 'Jasmine', 'Kabir', 'Layla', 'Mikail', 'Noor', 'Omar', 'Priya',
  'Qasim', 'Rina', 'Sana', 'Tariq', 'Umar', 'Vera', 'Waleed', 'Xena',
  'Yusuf', 'Zara', 'Adeel', 'Bushra', 'Carlos', 'Dania',
];
const lastNames = [
  'Khan', 'Malik', 'Ahmed', 'Iqbal', 'Sheikh', 'Rizvi', 'Butt', 'Qureshi',
  'Chaudhry', 'Raza', 'Hussain', 'Farooq', 'Baig', 'Chishti', 'Abbasi',
  'Soomro', 'Mahmood', 'Javed', 'Siddiqui', 'Anwar',
];
const courses = [
  'Computer Science', 'Software Engineering', 'Information Technology',
  'Business Administration', 'Electrical Engineering', 'Data Science',
  'Mathematics', 'Physics', 'Graphic Design', 'Economics',
];

function pick(arr, i) {
  return arr[i % arr.length];
}

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const TOTAL = 200;
  const students = [];
  for (let i = 1; i <= TOTAL; i++) {
    const first = pick(firstNames, i - 1);
    const last = pick(lastNames, i + 3);
    const course = pick(courses, i);
    const year = 2022 + (i % 4);
    const enrolledDaysAgo = i <= 8 ? i : Math.floor(Math.random() * 300) + 10;

    students.push({
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@studentmail.com`,
      rollNumber: `SMS-${year}-${String(i).padStart(3, '0')}`,
      course,
      phone: `03${String(100000000 + i * 1234).slice(0, 9)}`,
      address: `House ${i}, Street ${((i - 1) % 20) + 1}, Sector ${((i - 1) % 6) + 1}, City`,
      dateOfEnrollment: new Date(Date.now() - enrolledDaysAgo * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - enrolledDaysAgo * 24 * 60 * 60 * 1000),
    });
  }

  await Student.deleteMany({ rollNumber: { $regex: '^SMS-' } });
  await Student.insertMany(students);
  console.log(`Inserted ${students.length} students`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
