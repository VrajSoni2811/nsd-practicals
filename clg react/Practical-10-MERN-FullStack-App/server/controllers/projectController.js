import { Project } from '../models/Project.js';
import { inMemoryProjects, getDBStatus } from '../config/db.js';

/**
 * 1. GET /api/projects
 * Retrieve projects with filtering, search and sorting
 */
export const getProjects = async (req, res) => {
  try {
    const { category, status, search, sort } = req.query;
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      let query = {};
      if (category && category !== 'All') query.category = category;
      if (status && status !== 'All') query.status = status;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { lead: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      let sortOption = { createdAt: -1 };
      if (sort === 'budget_desc') sortOption = { budget: -1 };
      else if (sort === 'budget_asc') sortOption = { budget: 1 };
      else if (sort === 'completion') sortOption = { completionPercentage: -1 };

      const projects = await Project.find(query).sort(sortOption);
      return res.status(200).json({ success: true, count: projects.length, data: projects });
    }

    // In-memory fallback
    let result = [...inMemoryProjects];
    if (category && category !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (status && status !== 'All') {
      result = result.filter((p) => p.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.lead.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sort === 'budget_desc') result.sort((a, b) => b.budget - a.budget);
    else if (sort === 'budget_asc') result.sort((a, b) => a.budget - b.budget);
    else if (sort === 'completion') result.sort((a, b) => b.completionPercentage - a.completionPercentage);
    else result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 2. GET /api/projects/:id
 * Retrieve single project by ID
 */
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      const proj = await Project.findById(id);
      if (!proj) return res.status(404).json({ success: false, message: 'Project not found.' });
      return res.status(200).json({ success: true, data: proj });
    }

    const proj = inMemoryProjects.find((p) => p._id === id);
    if (!proj) return res.status(404).json({ success: false, message: 'Project not found.' });
    res.status(200).json({ success: true, data: proj });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 3. POST /api/projects
 * Create a new project document
 */
export const createProject = async (req, res) => {
  try {
    const { title, description, category, status, priority, lead, budget, completionPercentage, dueDate } = req.body;
    const dbStatus = getDBStatus();

    if (!title || !lead || !budget) {
      return res.status(400).json({
        success: false,
        message: 'Validation Failure: title, lead, and budget are required.'
      });
    }

    const projectData = {
      title: title.trim(),
      description: description ? description.trim() : 'Active sprint project',
      category: category || 'FullStack',
      status: status || 'In-Progress',
      priority: priority || 'Medium',
      lead: lead.trim(),
      budget: Number(budget),
      completionPercentage: completionPercentage !== undefined ? Number(completionPercentage) : 0,
      dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };

    if (dbStatus.isAtlas) {
      const created = await Project.create(projectData);
      return res.status(201).json({ success: true, message: 'Project created in MongoDB Atlas.', data: created });
    }

    const mockCreated = {
      _id: `671dd${Date.now().toString().slice(-19)}`,
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    inMemoryProjects.unshift(mockCreated);

    res.status(201).json({ success: true, message: 'Project created successfully.', data: mockCreated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * 4. PUT /api/projects/:id
 * Update project details
 */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      const updated = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Project not found.' });
      return res.status(200).json({ success: true, message: 'Project updated in Atlas.', data: updated });
    }

    const index = inMemoryProjects.findIndex((p) => p._id === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Project not found.' });

    inMemoryProjects[index] = {
      ...inMemoryProjects[index],
      ...req.body,
      updatedAt: new Date()
    };

    res.status(200).json({ success: true, message: 'Project updated successfully.', data: inMemoryProjects[index] });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * 5. DELETE /api/projects/:id
 * Delete project
 */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.isAtlas) {
      const deleted = await Project.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Project not found.' });
      return res.status(200).json({ success: true, message: `Project '${deleted.title}' deleted.`, data: deleted });
    }

    const index = inMemoryProjects.findIndex((p) => p._id === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Project not found.' });

    const deleted = inMemoryProjects.splice(index, 1)[0];
    res.status(200).json({ success: true, message: `Project '${deleted.title}' deleted.`, data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 6. GET /api/projects/analytics/summary
 * Project status summary & budget rollups
 */
export const getProjectAnalytics = async (req, res) => {
  try {
    const dbStatus = getDBStatus();
    let projects = [];

    if (dbStatus.isAtlas) {
      projects = await Project.find({});
    } else {
      projects = inMemoryProjects;
    }

    const totalProjects = projects.length;
    const completedProjects = projects.filter((p) => p.status === 'Completed').length;
    const inProgressProjects = projects.filter((p) => p.status === 'In-Progress').length;
    const totalBudget = projects.reduce((acc, p) => acc + (p.budget || 0), 0);
    const avgCompletion =
      totalProjects > 0 ? Math.round(projects.reduce((acc, p) => acc + (p.completionPercentage || 0), 0) / totalProjects) : 0;

    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        completedProjects,
        inProgressProjects,
        totalBudget,
        avgCompletion
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
