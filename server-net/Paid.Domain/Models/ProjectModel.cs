﻿namespace Paid.Domain.Models
{
    public class ProjectModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Rate { get; set; }
        public bool IsActive { get; set; }
    }
}