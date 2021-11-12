using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Paid.Database.DbContexts;
using Paid.Database.Repositories;
using Microsoft.EntityFrameworkCore;
using Paid.AppServices.Profiles;

namespace Paid.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            Console.WriteLine($"dbConnection {Configuration.GetSection("dbConnection").Value}");
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddScoped<IInvoiceRepository, InvoiceRepositoty>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddDbContext<PaidDbContext>(options =>
            {
                options.UseNpgsql(Configuration.GetSection("dbConnection").Value,
                    x => x.MigrationsAssembly("Paid.Domain")
                );
            });

            // services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            // Load all assemblies and scan for profiles to load
            //services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddAutoMapper(cfg => cfg.AddProfile<PaidProfile>());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
                    options.RoutePrefix = string.Empty;     // Make it available at the root
                });
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
