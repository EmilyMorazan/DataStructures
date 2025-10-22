import React, { useState, useEffect } from 'react';
import './PortfolioBuilder.css';

const PortfolioBuilder = () => {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('manage');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    type: 'visualizer',
    category: 'datastructures',
    githubUrl: '',
    screenshot: '',
    technologies: [],
    status: 'completed'
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
    
    // Check for captured projects from visualizers
    const capturedProjects = localStorage.getItem('capturedProjects');
    if (capturedProjects) {
      const captured = JSON.parse(capturedProjects);
      if (captured.length > 0) {
        // Show notification about captured projects
        console.log('Found captured projects:', captured);
      }
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
  }, [projects]);

  const projectTypes = {
    visualizer: 'Interactive Visualizer',
    exercise: 'Coding Exercise',
    github: 'GitHub Project',
    algorithm: 'Algorithm Implementation'
  };

  const projectCategories = {
    datastructures: 'Data Structures',
    algorithms: 'Algorithms',
    webdev: 'Web Development',
    mobile: 'Mobile Development',
    ai: 'AI/ML',
    other: 'Other'
  };

  const handleAddProject = () => {
    if (!newProject.title.trim()) return;

    const project = {
      id: Date.now(),
      ...newProject,
      createdAt: new Date().toISOString(),
      technologies: newProject.technologies.filter(tech => tech.trim())
    };

    setProjects([...projects, project]);
    setNewProject({
      title: '',
      description: '',
      type: 'visualizer',
      category: 'datastructures',
      githubUrl: '',
      screenshot: '',
      technologies: [],
      status: 'completed'
    });
    setShowAddForm(false);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject(project);
    setShowAddForm(true);
  };

  const handleUpdateProject = () => {
    if (!newProject.title.trim()) return;

    const updatedProject = {
      ...newProject,
      technologies: newProject.technologies.filter(tech => tech.trim())
    };

    setProjects(projects.map(p => p.id === editingProject.id ? updatedProject : p));
    setShowAddForm(false);
    setEditingProject(null);
    setNewProject({
      title: '',
      description: '',
      type: 'visualizer',
      category: 'datastructures',
      githubUrl: '',
      screenshot: '',
      technologies: [],
      status: 'completed'
    });
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  const handleTechnologyChange = (index, value) => {
    const newTechnologies = [...newProject.technologies];
    newTechnologies[index] = value;
    setNewProject({ ...newProject, technologies: newTechnologies });
  };

  const addTechnology = () => {
    setNewProject({ ...newProject, technologies: [...newProject.technologies, ''] });
  };

  const removeTechnology = (index) => {
    const newTechnologies = newProject.technologies.filter((_, i) => i !== index);
    setNewProject({ ...newProject, technologies: newTechnologies });
  };

  const captureVisualizerProject = (type, data) => {
    const project = {
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Visualization`,
      description: `Interactive ${type} visualization with ${data.length || 0} elements`,
      type: 'visualizer',
      category: type === 'datastructures' ? 'datastructures' : 'algorithms',
      screenshot: '', // Could capture canvas/svg as base64
      technologies: ['React', 'JavaScript', 'CSS3'],
      status: 'completed',
      createdAt: new Date().toISOString()
    };
    
    setNewProject(project);
    setShowAddForm(true);
  };

  const generatePortfolioHTML = () => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
        .projects { padding: 40px; }
        .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .project-card { border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; transition: transform 0.3s; }
        .project-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
        .project-title { font-size: 1.5em; margin-bottom: 10px; color: #333; }
        .project-description { color: #666; margin-bottom: 15px; }
        .tech-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 15px; }
        .tech-tag { background: #667eea; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8em; }
        .project-links { margin-top: 15px; }
        .project-links a { color: #667eea; text-decoration: none; margin-right: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>My Development Portfolio</h1>
            <p>Showcasing my projects and technical skills</p>
        </div>
        <div class="projects">
            <h2>Featured Projects</h2>
            <div class="project-grid">
                ${projects.map(project => `
                    <div class="project-card">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank">GitHub</a>` : ''}
                            <span>Type: ${projectTypes[project.type]}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
</body>
</html>`;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generatePortfolioPDF = () => {
    // For PDF generation, we'd need a library like jsPDF or html2pdf
    // For now, we'll show an alert with instructions
    alert('PDF generation requires additional libraries. For now, you can:\n1. Generate HTML portfolio\n2. Open in browser\n3. Print to PDF');
  };

  return (
    <div className="portfolio-builder">
      <header className="portfolio-header">
        <h1>🎨 Project Portfolio Builder</h1>
        <p>Create and manage your development portfolio to showcase your skills</p>
      </header>

      <div className="portfolio-tabs">
        <button 
          className={activeTab === 'manage' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('manage')}
        >
          📁 Manage Projects
        </button>
        <button 
          className={activeTab === 'preview' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('preview')}
        >
          👁️ Preview Portfolio
        </button>
        <button 
          className={activeTab === 'export' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('export')}
        >
          📤 Export Portfolio
        </button>
      </div>

      <div className="portfolio-content">
        {activeTab === 'manage' && (
          <div className="manage-projects">
            <div className="projects-header">
              <h2>Your Projects ({projects.length})</h2>
              <button 
                className="add-project-btn"
                onClick={() => setShowAddForm(true)}
              >
                ➕ Add New Project
              </button>
            </div>

            {showAddForm && (
              <div className="add-project-form">
                <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Project Title *</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      placeholder="Enter project title"
                    />
                  </div>

                  <div className="form-group">
                    <label>Project Type</label>
                    <select
                      value={newProject.type}
                      onChange={(e) => setNewProject({...newProject, type: e.target.value})}
                    >
                      {Object.entries(projectTypes).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                    >
                      {Object.entries(projectCategories).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>GitHub URL</label>
                    <input
                      type="url"
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      placeholder="Describe your project..."
                      rows="3"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Technologies Used</label>
                    <div className="technologies-input">
                      {newProject.technologies.map((tech, index) => (
                        <div key={index} className="tech-input-group">
                          <input
                            type="text"
                            value={tech}
                            onChange={(e) => handleTechnologyChange(index, e.target.value)}
                            placeholder="Technology name"
                          />
                          <button 
                            type="button"
                            onClick={() => removeTechnology(index)}
                            className="remove-tech-btn"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button 
                        type="button"
                        onClick={addTechnology}
                        className="add-tech-btn"
                      >
                        + Add Technology
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    className="save-btn"
                    onClick={editingProject ? handleUpdateProject : handleAddProject}
                  >
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingProject(null);
                      setNewProject({
                        title: '',
                        description: '',
                        type: 'visualizer',
                        category: 'datastructures',
                        githubUrl: '',
                        screenshot: '',
                        technologies: [],
                        status: 'completed'
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="projects-grid">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <div className="project-actions">
                      <button 
                        onClick={() => handleEditProject(project)}
                        className="edit-btn"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="delete-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-meta">
                    <span className="project-type">{projectTypes[project.type]}</span>
                    <span className="project-category">{projectCategories[project.category]}</span>
                  </div>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="github-link">
                      🔗 View on GitHub
                    </a>
                  )}
                </div>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="empty-state">
                <h3>No projects yet</h3>
                <p>Start building your portfolio by adding your first project!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="portfolio-preview">
            <h2>Portfolio Preview</h2>
            <div className="preview-container">
              <div className="preview-header">
                <h1>My Development Portfolio</h1>
                <p>Showcasing my projects and technical skills</p>
              </div>
              <div className="preview-projects">
                <h2>Featured Projects ({projects.length})</h2>
                <div className="preview-grid">
                  {projects.map(project => (
                    <div key={project.id} className="preview-project-card">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="preview-tech-tags">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="preview-tech-tag">{tech}</span>
                        ))}
                      </div>
                      <div className="preview-meta">
                        <span>{projectTypes[project.type]}</span>
                        {project.githubUrl && <span>🔗 GitHub</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="portfolio-export">
            <h2>Export Your Portfolio</h2>
            <div className="export-options">
              <div className="export-card">
                <h3>🌐 Web Portfolio</h3>
                <p>Generate a clean HTML file you can host anywhere</p>
                <button 
                  className="export-btn"
                  onClick={generatePortfolioHTML}
                  disabled={projects.length === 0}
                >
                  Download HTML Portfolio
                </button>
              </div>
              
              <div className="export-card">
                <h3>📄 PDF Portfolio</h3>
                <p>Create a professional PDF for sharing with employers</p>
                <button 
                  className="export-btn"
                  onClick={generatePortfolioPDF}
                  disabled={projects.length === 0}
                >
                  Generate PDF Portfolio
                </button>
              </div>
            </div>
            
            {projects.length === 0 && (
              <div className="export-empty">
                <p>Add some projects first to generate your portfolio!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioBuilder;
