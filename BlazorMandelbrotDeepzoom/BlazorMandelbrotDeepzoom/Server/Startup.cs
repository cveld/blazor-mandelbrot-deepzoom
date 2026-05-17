using Azure.Data.Tables;
using Azure.Identity;
using Azure.Storage.Blobs;
using BlazorMandelbrotDeepzoom.Server.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace BlazorMandelbrotDeepzoom.Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddSignalR(options =>
            {
                options.MaximumReceiveMessageSize = 2_000_000;
            }).AddAzureSignalR(Configuration["Azure:SignalR:ConnectionString"]);

            services.AddSingleton(new TableClient(
                new Uri("https://stmandelbrot.table.core.windows.net"),
                "interestingpoints",
                new DefaultAzureCredential()));
            services.AddSingleton(new BlobContainerClient(
                new Uri("https://stmandelbrot.blob.core.windows.net/mandelbrot-snapshots"),
                new DefaultAzureCredential()));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebAssemblyDebugging();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseBlazorFrameworkFiles();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<MovieHub>("/moviehub");
                endpoints.MapFallbackToFile("index.html");
            });
        }
    }
}
