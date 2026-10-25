import { Employee } from '../models/Employee.js';
import { getDBStatus, inMemoryEmployees } from '../config/db.js';

/**
 * 1. GET /api/employees
 * Retrieve all employees with Department Filter, Search & Sorting
 */
export const getEmployees = async (req, res) => {
  try {
    const { department, status, search, sort } = req.query;
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      // Real MongoDB Atlas Query
      let query = {};
      if (department && department !== 'All') query.department = department;
      if (status && status !== 'All') query.status = status;
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { empId: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }

      let sortOptions = {};
      if (sort === 'salary_desc') sortOptions.salary = -1;
      else if (sort === 'salary_asc') sortOptions.salary = 1;
      else sortOptions.createdAt = -1;

      const employees = await Employee.find(query).sort(sortOptions);
      return res.status(200).json({
        success: true,
        source: 'MongoDB Atlas Cloud',
        count: employees.length,
        data: employees
      });
    }

    // High-Fidelity Local Mongo Engine
    let result = [...inMemoryEmployees];

    if (department && department !== 'All') {
      result = result.filter((e) => e.department.toLowerCase() === department.toLowerCase());
    }
    if (status && status !== 'All') {
      result = result.filter((e) => e.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.empId.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q)
      );
    }

    if (sort === 'salary_desc') result.sort((a, b) => b.salary - a.salary);
    else if (sort === 'salary_asc') result.sort((a, b) => a.salary - b.salary);
    else result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      source: dbStatus.mode,
      count: result.length,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 2. GET /api/employees/:id
 * Retrieve single employee by MongoDB ObjectId or empId
 */
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      const employee = id.startsWith('EMP')
        ? await Employee.findOne({ empId: id.toUpperCase() })
        : await Employee.findById(id);

      if (!employee) {
        return res.status(404).json({ success: false, message: `Employee ${id} not found.` });
      }
      return res.status(200).json({ success: true, data: employee });
    }

    const employee = inMemoryEmployees.find(
      (e) => e._id === id || e.empId.toUpperCase() === id.toUpperCase()
    );

    if (!employee) {
      return res.status(404).json({ success: false, message: `Employee ${id} not found in database.` });
    }

    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 3. POST /api/employees
 * Create a new employee with Mongoose validation
 */
export const createEmployee = async (req, res) => {
  try {
    const { empId, name, email, department, designation, salary, status } = req.body;
    const dbStatus = getDBStatus();

    // Basic Validation
    if (!empId || !name || !email || !department || !salary) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: empId, name, email, department, and salary are required.'
      });
    }

    if (dbStatus.isAtlas) {
      const existing = await Employee.findOne({ $or: [{ empId: empId.toUpperCase() }, { email }] });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Conflict Error: Employee with this empId or email already exists in Atlas.'
        });
      }

      const newEmp = await Employee.create({
        empId: empId.toUpperCase(),
        name,
        email,
        department,
        designation: designation || 'Specialist',
        salary: Number(salary),
        status: status || 'Active'
      });

      return res.status(201).json({
        success: true,
        message: 'Employee document successfully created in MongoDB Atlas.',
        data: newEmp
      });
    }

    // Local Mode
    const duplicate = inMemoryEmployees.some(
      (e) => e.empId.toUpperCase() === empId.toUpperCase() || e.email.toLowerCase() === email.toLowerCase()
    );
    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: 'Conflict Error: Employee with this empId or email already exists.'
      });
    }

    const newEmp = {
      _id: `671ba111${Date.now().toString().slice(-16)}`,
      empId: empId.toUpperCase().trim(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      department,
      designation: designation ? designation.trim() : 'Associate',
      salary: Number(salary),
      status: status || 'Active',
      joiningDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    inMemoryEmployees.unshift(newEmp);

    res.status(201).json({
      success: true,
      message: 'Employee record created successfully.',
      data: newEmp
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * 4. PUT /api/employees/:id
 * Update an existing employee document
 */
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      const updated = await Employee.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });

      if (!updated) {
        return res.status(404).json({ success: false, message: `Employee document ${id} not found.` });
      }

      return res.status(200).json({
        success: true,
        message: 'Employee updated successfully in MongoDB Atlas.',
        data: updated
      });
    }

    const index = inMemoryEmployees.findIndex(
      (e) => e._id === id || e.empId.toUpperCase() === id.toUpperCase()
    );

    if (index === -1) {
      return res.status(404).json({ success: false, message: `Employee ${id} not found.` });
    }

    inMemoryEmployees[index] = {
      ...inMemoryEmployees[index],
      ...req.body,
      updatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      message: 'Employee record updated successfully.',
      data: inMemoryEmployees[index]
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * 5. DELETE /api/employees/:id
 * Remove employee document
 */
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      const deleted = await Employee.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: `Employee ${id} not found.` });
      }
      return res.status(200).json({
        success: true,
        message: `Employee ${deleted.name} (${deleted.empId}) removed from Atlas.`,
        data: deleted
      });
    }

    const index = inMemoryEmployees.findIndex(
      (e) => e._id === id || e.empId.toUpperCase() === id.toUpperCase()
    );

    if (index === -1) {
      return res.status(404).json({ success: false, message: `Employee ${id} not found.` });
    }

    const deleted = inMemoryEmployees.splice(index, 1)[0];

    res.status(200).json({
      success: true,
      message: `Employee ${deleted.name} (${deleted.empId}) deleted successfully.`,
      data: deleted
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 6. GET /api/employees/analytics/overview
 * MongoDB Aggregation Pipeline simulation: Department salary averages & headcount
 */
export const getDepartmentAnalytics = async (req, res) => {
  try {
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      const stats = await Employee.aggregate([
        {
          $group: {
            _id: '$department',
            headcount: { $sum: 1 },
            avgSalary: { $avg: '$salary' },
            totalPayroll: { $sum: '$salary' }
          }
        },
        { $sort: { headcount: -1 } }
      ]);

      return res.status(200).json({ success: true, data: stats });
    }

    // In-memory Aggregation simulation
    const groups = {};
    inMemoryEmployees.forEach((emp) => {
      if (!groups[emp.department]) {
        groups[emp.department] = { _id: emp.department, headcount: 0, totalSalary: 0 };
      }
      groups[emp.department].headcount += 1;
      groups[emp.department].totalSalary += emp.salary;
    });

    const stats = Object.values(groups).map((g) => ({
      _id: g._id,
      headcount: g.headcount,
      avgSalary: Math.round(g.totalSalary / g.headcount),
      totalPayroll: g.totalSalary
    }));

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
