import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Save,
  RotateCcw,
  X
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import './StudentForm.css';

const SKILLS_LIST = ['React', 'Node.js', 'Python', 'MongoDB', 'Docker', 'Git'];
const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'AI & Data Science',
  'Electronics & Communication'
];

/**
 * StudentForm Feature Component
 * Demonstrates:
 * 1. Multi-input Controlled Components with unified React state
 * 2. Real-time client-side validation logic with Regex patterns
 * 3. Touched vs Dirty tracking for smooth UX
 * 4. Multi-select checkboxes array state management
 * 5. Edit mode vs Create mode lifecycle
 */
export const StudentForm = ({ onSaveStudent, editingStudent = null, onCancelEdit = null }) => {
  const initialValues = {
    rollNo: '',
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    department: 'Computer Science',
    semester: '1',
    cgpa: '',
    gender: 'Male',
    skills: ['React'],
    agreeTerms: false
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Load existing student when in edit mode
  useEffect(() => {
    if (editingStudent) {
      setValues({
        ...editingStudent,
        agreeTerms: true
      });
      setErrors({});
      setTouched({});
      setSubmitAttempted(false);
    } else {
      setValues(initialValues);
    }
  }, [editingStudent]);

  // VALIDATION FUNCTION
  const validate = (formValues) => {
    const errs = {};

    // Roll Number: Must match STU-XXXX (4 digits)
    const rollRegex = /^STU-\d{4}$/;
    if (!formValues.rollNo.trim()) {
      errs.rollNo = 'Roll Number is required.';
    } else if (!rollRegex.test(formValues.rollNo.trim())) {
      errs.rollNo = 'Format must be "STU-XXXX" (e.g. STU-1001).';
    }

    // Full Name: Letters & spaces only, 3-50 chars
    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    if (!formValues.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (!nameRegex.test(formValues.fullName.trim())) {
      errs.fullName = 'Name must be 3-50 characters (letters and spaces only).';
    }

    // Email Validation (RFC compliant regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formValues.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    // Phone Validation: 10 Digits
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formValues.phone.trim()) {
      errs.phone = 'Contact number is required.';
    } else if (!phoneRegex.test(formValues.phone.trim())) {
      errs.phone = 'Enter valid 10-digit mobile number (starts with 6-9).';
    }

    // Date of Birth: Must be at least 16 years old
    if (!formValues.dob) {
      errs.dob = 'Date of Birth is required.';
    } else {
      const birthDate = new Date(formValues.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 16) {
        errs.dob = 'Student must be at least 16 years old.';
      }
    }

    // CGPA Validation: Float between 0.00 and 10.00
    const cgpaNum = parseFloat(formValues.cgpa);
    if (!formValues.cgpa) {
      errs.cgpa = 'CGPA is required.';
    } else if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      errs.cgpa = 'CGPA must be a decimal between 0.00 and 10.00.';
    }

    // Skills Validation: At least one skill selected
    if (!formValues.skills || formValues.skills.length === 0) {
      errs.skills = 'Select at least one technical skill.';
    }

    // Terms & Code of conduct
    if (!formValues.agreeTerms) {
      errs.agreeTerms = 'You must confirm student eligibility & code of conduct.';
    }

    return errs;
  };

  // GENERIC CHANGE HANDLER (Controlled Component Engine)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    const newValues = {
      ...values,
      [name]: updatedValue
    };

    setValues(newValues);

    // Live validation update if field was already touched
    if (touched[name] || submitAttempted) {
      const validationErrors = validate(newValues);
      setErrors(validationErrors);
    }
  };

  // MULTI-CHECKBOX SKILLS HANDLER
  const handleSkillToggle = (skill) => {
    const currentSkills = values.skills || [];
    let updatedSkills;
    if (currentSkills.includes(skill)) {
      updatedSkills = currentSkills.filter((s) => s !== skill);
    } else {
      updatedSkills = [...currentSkills, skill];
    }

    const newValues = { ...values, skills: updatedSkills };
    setValues(newValues);

    if (touched.skills || submitAttempted) {
      setErrors(validate(newValues));
    }
  };

  // BLUR HANDLER (Tracks 'Touched' state)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  };

  // FORM SUBMISSION HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const validationErrors = validate(values);
    setErrors(validationErrors);

    // Mark all inputs as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (Object.keys(validationErrors).length === 0) {
      // Valid submission
      onSaveStudent({
        ...values,
        id: editingStudent ? editingStudent.id : Date.now(),
        cgpa: parseFloat(values.cgpa).toFixed(2),
        status: 'Active'
      });

      if (!editingStudent) {
        setValues(initialValues);
        setTouched({});
        setSubmitAttempted(false);
      }
    }
  };

  // RESET FORM HANDLER
  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitAttempted(false);
  };

  const isFieldInvalid = (fieldName) => {
    return (touched[fieldName] || submitAttempted) && Boolean(errors[fieldName]);
  };

  return (
    <Card variant="glass" padding="lg" className="student-form-card">
      <div className="form-header-bar">
        <div>
          <h2 className="form-title">
            <UserCheck size={22} className="header-icon" />
            {editingStudent ? 'Edit Student Record' : 'Student Enrollment & Registration'}
          </h2>
          <p className="form-subtitle">
            Demonstrating Controlled Components, field validation regex, and touched error feedback.
          </p>
        </div>

        {editingStudent && (
          <Button
            variant="ghost"
            size="sm"
            icon={<X size={16} />}
            onClick={onCancelEdit}
          >
            Cancel Edit
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="student-form">
        {/* ROW 1: Roll No & Full Name */}
        <div className="form-grid-2">
          <div className="form-field">
            <label className="field-label" htmlFor="rollNo">
              Roll Number <span className="req-star">*</span>
            </label>
            <input
              id="rollNo"
              name="rollNo"
              type="text"
              placeholder="e.g. STU-1001"
              className={`field-input ${isFieldInvalid('rollNo') ? 'input-error' : ''}`}
              value={values.rollNo}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {isFieldInvalid('rollNo') && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.rollNo}
              </span>
            )}
          </div>

          <div className="form-field">
            <label className="field-label" htmlFor="fullName">
              Full Name <span className="req-star">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="e.g. Aarav Sharma"
              className={`field-input ${isFieldInvalid('fullName') ? 'input-error' : ''}`}
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {isFieldInvalid('fullName') && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.fullName}
              </span>
            )}
          </div>
        </div>

        {/* ROW 2: Email & Phone */}
        <div className="form-grid-2">
          <div className="form-field">
            <label className="field-label" htmlFor="email">
              College / Official Email <span className="req-star">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="student@college.edu"
              className={`field-input ${isFieldInvalid('email') ? 'input-error' : ''}`}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {isFieldInvalid('email') && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.email}
              </span>
            )}
          </div>

          <div className="form-field">
            <label className="field-label" htmlFor="phone">
              Mobile Contact (10 Digits) <span className="req-star">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="9876543210"
              maxLength={10}
              className={`field-input ${isFieldInvalid('phone') ? 'input-error' : ''}`}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {isFieldInvalid('phone') && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.phone}
              </span>
            )}
          </div>
        </div>

        {/* ROW 3: Date of Birth, Department & CGPA */}
        <div className="form-grid-3">
          <div className="form-field">
            <label className="field-label" htmlFor="dob">
              Date of Birth <span className="req-star">*</span>
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              className={`field-input ${isFieldInvalid('dob') ? 'input-error' : ''}`}
              value={values.dob}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {isFieldInvalid('dob') && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.dob}
              </span>
            )}
          </div>

          <div className="form-field">
            <label className="field-label" htmlFor="department">
              Department / Discipline <span className="req-star">*</span>
            </label>
            <select
              id="department"
              name="department"
              className="field-input field-select"
              value={values.department}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label className="field-label" htmlFor="cgpa">
              Current CGPA (0 - 10) <span className="req-star">*</span>
            </label>
            <input
              id="cgpa"
              name="cgpa"
              type="number"
              step="0.01"
              min="0"
              max="10"
              placeholder="e.g. 9.25"
              className={`field-input ${isFieldInvalid('cgpa') ? 'input-error' : ''}`}
              value={values.cgpa}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {isFieldInvalid('cgpa') && (
              <span className="field-error-msg">
                <AlertCircle size={13} /> {errors.cgpa}
              </span>
            )}
          </div>
        </div>

        {/* ROW 4: Semester Selection (Radio Group) */}
        <div className="form-field">
          <label className="field-label">Current Academic Semester (Radio Group):</label>
          <div className="semester-radio-group">
            {['1', '2', '3', '4', '5', '6', '7', '8'].map((sem) => (
              <label key={sem} className={`sem-radio-pill ${values.semester === sem ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="semester"
                  value={sem}
                  checked={values.semester === sem}
                  onChange={handleChange}
                />
                <span>Sem {sem}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ROW 5: Gender Selection */}
        <div className="form-field">
          <label className="field-label">Gender:</label>
          <div className="gender-radio-row">
            {['Male', 'Female', 'Other'].map((gen) => (
              <label key={gen} className="gender-label">
                <input
                  type="radio"
                  name="gender"
                  value={gen}
                  checked={values.gender === gen}
                  onChange={handleChange}
                />
                <span>{gen}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ROW 6: Technical Skills (Multi-select Checkbox Array) */}
        <div className="form-field">
          <label className="field-label">
            Technical Electives & Skills (Array State): <span className="req-star">*</span>
          </label>
          <div className="skills-checkbox-grid">
            {SKILLS_LIST.map((skill) => (
              <label
                key={skill}
                className={`skill-checkbox-pill ${(values.skills || []).includes(skill) ? 'checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={(values.skills || []).includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
          {isFieldInvalid('skills') && (
            <span className="field-error-msg">
              <AlertCircle size={13} /> {errors.skills}
            </span>
          )}
        </div>

        {/* ROW 7: Declaration Checkbox */}
        <div className="form-field declaration-field">
          <label className="declaration-label">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={values.agreeTerms}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span>
              I confirm that all entered academic information is authentic and adheres to university examination regulations.
            </span>
          </label>
          {isFieldInvalid('agreeTerms') && (
            <span className="field-error-msg">
              <AlertCircle size={13} /> {errors.agreeTerms}
            </span>
          )}
        </div>

        {/* Form Actions */}
        <div className="form-action-row">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={<Save size={18} />}
          >
            {editingStudent ? 'Update Student Record' : 'Submit & Register Student'}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="lg"
            icon={<RotateCcw size={16} />}
            onClick={handleReset}
          >
            Reset Form
          </Button>
        </div>
      </form>
    </Card>
  );
};
