using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Paid.Database.DbContexts;
using Paid.Domain.Entities;
using Paid.Domain.Models;

namespace Paid.Database.Repositories
{
    public class ProjectRepository: IProjectRepository
    {
        private ILogger<ProjectRepository> _logger;
        private IMapper _mapper;
        private PaidDbContext _dbContext;

        public ProjectRepository(ILogger<ProjectRepository> logger, PaidDbContext dbContext, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<Project> AddProjectAsync(ProjectModel projectModel)
        {
            var newProject = _mapper.Map<Project>(projectModel);

            await _dbContext.AddAsync(newProject);
            await _dbContext.SaveChangesAsync();

            return newProject;
        }

        public Task<Project> GetProjectAsync(int id)
        {
            return Task.FromResult(_dbContext.Projects.SingleOrDefault(x => x.Id == id));
        }

        public Task<Project[]> GetProjectsAsync()
        {
            return Task.FromResult(_dbContext.Projects.ToArray());
        }

        public async Task<Project> UpdateProjectAsync(UpdateProjectModel projectModel)
        {
            var existingProject = _dbContext.Projects.SingleOrDefault(x => x.Id == projectModel.Id);

            if(existingProject == null)
            {
                return null;
            }

            // The following method maps and updates the existing object
            _mapper.Map<UpdateProjectModel, Project>(projectModel, existingProject);

            _dbContext.Projects.Update(existingProject);
            await _dbContext.SaveChangesAsync();

            return existingProject;
        }
    }
}
