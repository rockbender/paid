using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Paid.Database.Repositories;
using Paid.Domain.Entities;
using Paid.Domain.Models;

namespace Paid.Api.Controllers
{
    [ApiController]
    [Route("/api/[Controller]")]
    public class ProjectsController : ControllerBase
    {
        private ILogger<ProjectsController> _logger;
        private IProjectRepository _projectRepo;

        public ProjectsController(ILogger<ProjectsController> logger, IProjectRepository projectRepo)
        {
            _logger = logger;
            _projectRepo = projectRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Project[]>> GetProjectsAsync()
        {
            return new JsonResult(await _projectRepo.GetProjectsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProjectByIdAsync(int id)
        {
            var project = await _projectRepo.GetProjectAsync(id);

            if(project == null)
            {
                return NotFound();
            }

            return new JsonResult(project);
        }

        [HttpPost]
        public async Task<ActionResult<Project>> AddProjectAsync(ProjectModel projectModel)
        {
            var project = await _projectRepo.AddProjectAsync(projectModel);

            return new JsonResult(project);
        }

        [HttpPut]
        public async Task<ActionResult<Project>> UpdateProject(UpdateProjectModel projectModel)
        {
            var updatedProject = await _projectRepo.UpdateProjectAsync(projectModel);

            return new JsonResult(updatedProject);
        }
    }
}
