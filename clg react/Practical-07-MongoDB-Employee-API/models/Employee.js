import mongoose from 'mongoose';

/**
 * Employee Mongoose Schema & Model
 * Demonstrates:
 * 1. Data Types (String, Number, Date, Boolean)
 * 2. Schema Validation (required, minlength, max, regex)
 * 3. Enums for Department and Status
 * 4. Automatic Timestamps (createdAt, updatedAt)
 */
const employeeSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: [true, 'Employee ID (empId) is mandatory (e.g. EMP-101)'],
      unique: true,
      trim: true,
      uppercase: true
    },
    name: {
      type: String,
      required: [true, 'Employee full name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [60, 'Name cannot exceed 60 characters']
    },
    email: {
      type: String,
      required: [true, 'Official email address is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid corporate email address'
      ]
    },
    department: {
      type: String,
      required: [true, 'Department assignment is required'],
      enum: {
        values: ['Engineering', 'Product', 'Human Resources', 'Finance', 'Design'],
        message: '{VALUE} is not a recognized corporate department'
      }
    },
    designation: {
      type: String,
      required: [true, 'Job designation/title is required'],
      trim: true
    },
    salary: {
      type: Number,
      required: [true, 'Annual or monthly salary is required'],
      min: [1000, 'Salary must be at least $1,000']
    },
    status: {
      type: String,
      enum: ['Active', 'On Leave', 'Resigned'],
      default: 'Active'
    },
    joiningDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Virtual property for formatted compensation
employeeSchema.virtual('formattedSalary').get(function () {
  return `$${this.salary.toLocaleString()}`;
});

export const Employee = mongoose.model('Employee', employeeSchema);
