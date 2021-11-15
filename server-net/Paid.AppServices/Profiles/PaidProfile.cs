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
                .ForMember(dest => dest.TotalAmount, opts => opts.MapFrom(src => GetTotalAmount(src.WorkItems, src.Project.RateCents)))
            ;

            CreateMap<Invoice, InvoiceDetailModel>()
                .ForMember(dest => dest.InvoiceId, opts => opts.MapFrom(src => src.Id))
                .ForMember(dest => dest.InvoiceDate, opts => opts.MapFrom(src => src.InvoiceDate))
                .ForMember(dest => dest.DueDate, otps => otps.MapFrom(src => src.DueDate))
                .ForMember(dest => dest.Project, opts => opts.MapFrom(src => src.Project))
                .ForMember(dest => dest.WorkItems, opts => opts.MapFrom(src => src.WorkItems))
            ;

            CreateMap<WorkItemModel, WorkItem>()
                .ReverseMap()
            ;

            CreateMap<ProjectModel, Project>()
                .ForMember(dest => dest.RateCents, opts => opts.MapFrom(src => src.RateCents * 100))
                .ReverseMap()
            ;

            CreateMap<UpdateProjectModel, Project>()
                .ForMember(dest => dest.Id, opts => opts.Ignore())
                .ForMember(dest => dest.Name, opts => opts.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opts => opts.MapFrom(src => src.Description))
                .ForMember(dest => dest.RateCents, opts => opts.MapFrom(src => src.RateCents * 100))
                .ForMember(dest => dest.IsActive, opts => opts.MapFrom(src => src.IsActive))
            ;
        }

        private double GetTotalAmount(ICollection<WorkItem> workItems, int? rate)
        {
            if(!rate.HasValue)
            {
                return (double)default;
            }

            double total = 0.0;

            foreach(var w in workItems)
            {
                total += ((double)w.DurationMins / 60d) * ((double)rate.Value / 100.0d);
            }

            return total;
        }
    }
}
