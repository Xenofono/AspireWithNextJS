using Microsoft.Extensions.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var webapi = builder.AddProject<Projects.AspireWithNextJS_WebAPI>("nextjswebapi");

var frontend = builder.AddNpmApp("frontend-nextjs", "../nextjs-aspire-demo", "dev")
    .WithReference(webapi)
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints();

if (builder.Environment.IsDevelopment() && builder.Configuration["DOTNET_LAUNCH_PROFILE"] == "https")
{
    // Disable TLS certificate validation in development, see https://github.com/dotnet/aspire/issues/3324 for more details.
    frontend.WithEnvironment("NODE_TLS_REJECT_UNAUTHORIZED", "0");
}

builder.Build().Run();
