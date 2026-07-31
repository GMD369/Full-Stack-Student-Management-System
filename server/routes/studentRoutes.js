const express = require('express');
const {
  listStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStats,
} = require('../controllers/studentController');
const { verifyToken, requireRole } = require('../middleware/auth');
const { studentRules, handleValidation } = require('../utils/validators');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.use(verifyToken);

router.get('/stats', asyncHandler(getStats));
router.get('/', asyncHandler(listStudents));
router.get('/:id', asyncHandler(getStudent));
router.post('/', requireRole('admin'), studentRules, handleValidation, asyncHandler(createStudent));
router.put('/:id', requireRole('admin'), studentRules, handleValidation, asyncHandler(updateStudent));
router.delete('/:id', requireRole('admin'), asyncHandler(deleteStudent));

module.exports = router;
