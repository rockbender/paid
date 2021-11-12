using System;
using System.Threading.Tasks;
using Paid.Domain.Entities;
using Paid.Domain.Models;

namespace Paid.Database.Repositories
{
    public interface IProjectRepository
    {
        Task<Project> AddProjectAsync(ProjectModel projectModel);
        Task<Project> GetProjectAsync(int id);
        Task<Project[]> GetProjectsAsync();
        Task<Project> UpdateProjectAsync(UpdateProjectModel projectModel);
    }
}
