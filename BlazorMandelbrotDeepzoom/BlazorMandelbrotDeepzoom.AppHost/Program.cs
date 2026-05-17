var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.BlazorMandelbrotDeepzoom_Server>("server");

builder.AddJavaScriptApp("webpack-watch", "../BlazorMandelbrotDeepzoom/Client")
    .WithRunScript("watch");

builder.Build().Run();
