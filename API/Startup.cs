using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;

using Persistence;
using MediatR;
using Application.Activities;
using FluentValidation.AspNetCore;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Identity;
using Application.Interfaces;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using AutoMapper;
using Infrastructure.Photos;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt => 
            {
                opt.UseLazyLoadingProxies();
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
                // opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            ConfigureServices(services);
        }

        public void ConfigureProductionServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt => 
            {
                opt.UseLazyLoadingProxies();
                // opt.UseMySql(Configuration.GetConnectionString("DefaultConnection"));
                opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            ConfigureServices(services);
        }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(opt => 
            {
                opt.AddPolicy("CorsPolicy", policy => 
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(List.Handler));
            
            services.AddMvc(opt => 
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();

                    opt.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssemblyContaining<Create>())
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        
            // Configuration for Identity - important
            var builder = services.AddIdentityCore<AppUser>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            
            builder.AddUserManager<UserManager<AppUser>>();

            // Configuration for Identity Roles/User Control - important
            identityBuilder.AddRoles<IdentityRole>();

            // identityBuilder.AddRoleManager<UserManager<IdentityRole>>();

            // Configuration for Entity Framework - important
            identityBuilder.AddEntityFrameworkStores<DataContext>();

            // Configuration for Signin Manager - important
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();
            
            // 
            services.AddAuthorization(opt => 
            {
                opt.AddPolicy("IsActivityHost", policy => 
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });
            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

            //
            
            // Authentication
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt => 
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience = false,
                        ValidateIssuer = false
                    };
                });

            // JWT Generator
            services.AddScoped<IJwtGenerator, JwtGenerator>();
            // User Accessor
            services.AddScoped<IUserAccessor, UserAccessor>();
            // Photo Accessor
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();

            // Cloudinary Configuration
            services.Configure<CloudinarySettings>(Configuration.GetSection("Cloudinary"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {
                // app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                
                //Production
                app.UseHsts();
            }

            //Production
            //For preventing Cross-site scripting and Click-jacking Attacks
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opt => opt.NoReferrer());
            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            app.UseXfo(opt => opt.Deny());
            app.UseCspReportOnly(opt => opt
                .BlockAllMixedContent()
                .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com", 
                "sha256-AbpHGcgLb+kRsJGnwFEktk7uzpZOCcBY74+YBdrKVGs=",
                "sha256-o8/olgMXviPNpGJsHaezjz9HM9EoXd3RNqB0OyOWjOs=",
                "sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
                "sha256-6gy0Oe5wNrbHMD3FtxxZveehX86KJxTDxa8br7yOiHM=",
                "sha256-aOSg3hdzC610R7lKALK6HReQy/NGKaZsx67wToP903w=",
                "sha256-Q6B2hcKieZR8M+G7B7ksDwyJF9BRFPl5obeEVT9UPAc=",
                "sha256-ZHlZEhLnzh/QVV8cctwQevWQln5BQipNRz3PSUT+Ri0=",
                "sha256-TNucpMncdBIdGN21J1AQ41FTrENVPgFQGmIwT1anmDU=",
                "sha256-q/778mC8AucfSDovVC0Y2yBJtX7xXkMJ/AmktE6gON8=",
                "sha256-3o6aGi9efyCkMyrM2+XnTSuD7E2AcZqZHx/vJIcMTEk=",
                "sha256-6y7WJjf5UmqTyodR6qZk7zX4EDmiF+mg2XwcPgt7NsQ=",
                "sha256-daEdpEyAJIa8b2VkCqSKcw8PaExcB6Qro80XNes/sHA=",
                "sha256-wamdO2J0OzDpJ2zXcODa/9NaCMWSj6Fufy6MM4KqDTU=",
                "sha256-xhD0kyv/OBbU8qwRcx18eAWFdRtfYbPwMp5gT7FOJts=",
                "sha256-9TR6AqRSl+XSgzX39kMhJsW4CJwA5uu7gHOQwuM/m2Y=",
                "sha256-6V/9yj2KEHP5cUC98VBhLNRGzrh7eVqwLrrbmoLSlnA=",
                "sha256-KsmuySVzce1cVtDb+ROyTNAAijBxM/lU1MLFmbFY9kc=",
                "sha256-PEiFKXHUt5MPpD1Y/5j3O39fhw5u3Casw2yggKQu75o=",
                "sha256-PpoL88sugL+MixGj6eFNM05Q0l/B2tpC9guyJrsQkSY="))
                .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", 
                "data:"))
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self().CustomSources("https://res.cloudinary.com",
                "https://www.camella.com.ph/wp-content/uploads/2020/06/Website_Camella-Homes-Series_Cara-592x444.jpg",
                "blob:", "data:"))
                .ScriptSources(s => s.Self().CustomSources("sha256-ma5XxS1EBgt17N22Qq31rOxxRWRfzUTQS1KOtfYwuNo="))
            );
            //

            //Remove comment here when in production
            // app.UseHttpsRedirection();

            // Production
            app.UseDefaultFiles();
            app.UseStaticFiles();
            //

            app.UseAuthentication();
            app.UseCors("CorsPolicy");

            // Development
            app.UseMvc();
            //

            // Production
            // app.UseMvc(routes => 
            // {
            //     routes.MapSpaFallbackRoute(
            //         name: "spa-fallback",
            //         defaults: new {controller = "Fallback", action = "Index"}
            //     );
            // });
            //
            
        }
    }
}
