using System.Linq;
using AutoMapper;
using Domain;

namespace Application.User
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {
            CreateMap<AppUser, AppUserDto>()
                // .ForMember(d => d.Role, o => o.MapFrom(s => s.Role.Name))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
            // CreateMap<Activity, ActivityDto>()
            //     .ForMember();

            // CreateMap<UserActivity, AttendeeDto>()
            //     .ForMember(d => d.Username, o => o.MapFrom(s =>
            //         s.Appuser.UserName))
            //     .ForMember(d => d.DisplayName, o => o.MapFrom(s =>
            //         s.Appuser.DisplayName))
            //     .ForMember(d => d.Image, o => o.MapFrom(s => s.Appuser.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}