using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s =>
                    s.Appuser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s =>
                    s.Appuser.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Appuser.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}