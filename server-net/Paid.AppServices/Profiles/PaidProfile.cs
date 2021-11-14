using System;
using AutoMapper;
using Paid.Domain.Models;
using Paid.Domain.Entities;
using System.Collections.Generic;

namespace Paid.AppServices.Profiles
{
    public class PaidProfile: Profile
    {
        public PaidProfile()
        {
            CreateMap<InvoiceModel, Invoice>()
                .ReverseMap()
            ;

            CreateMap<Invoice, InvoiceListModel>()
                .ForMember(dest => dest.ProjectName, opts => opts.MapFrom(src => src.Project.Name))
                .ForMember(dest => dest.InvoiceId, opts => opts.MapFrom(src => src.Id))
                .ForMember(dest => dest.DueDate, opts => opts.MapFrom(src => src.DueDate.Date))
                .ForMember(dest => dest.TotalAmount, opts => opts.MapFrom(src => GetTotal(src.WorkItems, src.Project.Rate)));

            CreateMap<WorkItemModel, WorkItem>()
                .ReverseMap()
            ;

            CreateMap<ProjectModel, Project>()
                .ForMember(dest => dest.Rate, opts => opts.MapFrom(src => src.Rate * 100))
                .ReverseMap()
            ;

            CreateMap<UpdateProjectModel, Project>()
                .ForMember(dest => dest.Id, opts => opts.Ignore())
                .ForMember(dest => dest.Name, opts => opts.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opts => opts.MapFrom(src => src.Description))
                .ForMember(dest => dest.Rate, opts => opts.MapFrom(src => src.Rate * 100))
                .ForMember(dest => dest.IsActive, opts => opts.MapFrom(src => src.IsActive))
            ;
        }

        private double GetTotal(ICollection<WorkItem> workItems, int? rate)
        {
            if(!rate.HasValue)
            {
                return (double)default;
            }

            double total = 0.0;

            foreach(var w in workItems)
            {
                total += w.Duration * rate.Value;
            }

            return total;
        }
    }
}
