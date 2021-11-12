using System;
using AutoMapper;
using Paid.Domain.Models;
using Paid.Domain.Entities;

namespace Paid.AppServices.Profiles
{
    public class PaidProfile: Profile
    {
        public PaidProfile()
        {
            CreateMap<InvoiceModel, Invoice>()
                .ReverseMap()
            ;

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
    }
}
