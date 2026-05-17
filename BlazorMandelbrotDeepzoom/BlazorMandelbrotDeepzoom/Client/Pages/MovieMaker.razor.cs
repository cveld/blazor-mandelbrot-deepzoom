using BlazorMandelbrotDeepzoom.Shared;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace BlazorMandelbrotDeepzoom.Client.Pages
{
    public partial class MovieMaker : ComponentBase, IAsyncDisposable
    {
        [Inject] private NavigationManager Navigation { get; set; }
        [Inject] private HttpClient Http { get; set; }
        [Inject] private IJSRuntime JSRuntime { get; set; }

        private HubConnection _hubConnection;
        private List<InterestingPointSummaryDTO> pois = new();
        private string _connectionId;

        private string startReal = "-0.75";
        private string startImaginary = "0";
        private string startSize = "3";
        private string endReal = "-0.75";
        private string endImaginary = "0";
        private string endSize = "0.001";

        private int frameCount = 60;
        private int fps = 30;
        private int iterationLimit = 1024;

        private bool isGenerating = false;
        private int currentFrame = 0;
        private int totalFrames = 0;
        private string statusMessage;
        private string downloadUrl;
        private string errorMessage;

        protected override async Task OnInitializedAsync()
        {
            pois = await Http.GetFromJsonAsync<List<InterestingPointSummaryDTO>>("InterestingPoints") ?? new();

            _hubConnection = new HubConnectionBuilder()
                .WithUrl(Navigation.ToAbsoluteUri("/moviehub"))
                .Build();

            _hubConnection.On<FrameReadyDTO>("FrameReady", async (frame) =>
            {
                currentFrame = frame.FrameNumber + 1;
                totalFrames = frame.TotalFrames;
                await JSRuntime.InvokeVoidAsync("movieMakerInterop.addFrameFromUrl", frame.FrameUrl, frame.FrameNumber);
                await InvokeAsync(StateHasChanged);
            });

            _hubConnection.On("GenerationComplete", async () =>
            {
                statusMessage = "Frames read, composing video...";
                await InvokeAsync(StateHasChanged);
                downloadUrl = await JSRuntime.InvokeAsync<string>("movieMakerInterop.renderAndDownload", fps);
                isGenerating = false;
                statusMessage = "Video ready!";
                await InvokeAsync(StateHasChanged);
                await CleanupFrames();
            });

            _hubConnection.On<string>("GenerationError", async (msg) =>
            {
                errorMessage = $"Error while generating: {msg}";
                isGenerating = false;
                await InvokeAsync(StateHasChanged);
            });

            await _hubConnection.StartAsync();
            _connectionId = _hubConnection.ConnectionId;
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
                await JSRuntime.InvokeVoidAsync("movieMakerInterop.init", "movie-preview-canvas", 400, 400);
        }

        private void OnStartPoiChanged(ChangeEventArgs e)
        {
            var poi = pois.Find(p => p.Id == e.Value?.ToString());
            if (poi == null) return;
            startReal = poi.Real;
            startImaginary = poi.Imaginary;
            startSize = poi.Size;
            iterationLimit = poi.IterationLimit;
        }

        private void OnEndPoiChanged(ChangeEventArgs e)
        {
            var poi = pois.Find(p => p.Id == e.Value?.ToString());
            if (poi == null) return;
            endReal = poi.Real;
            endImaginary = poi.Imaginary;
            endSize = poi.Size;
        }

        private async Task StartGeneration()
        {
            if (_hubConnection.State != HubConnectionState.Connected)
            {
                errorMessage = "No connection with server.";
                return;
            }

            errorMessage = null;
            downloadUrl = null;
            isGenerating = true;
            currentFrame = 0;
            totalFrames = frameCount;
            statusMessage = "Started generating...";

            await JSRuntime.InvokeVoidAsync("movieMakerInterop.reset");

            await _hubConnection.SendAsync("StartGeneration", new MovieGenerationRequestDTO
            {
                StartReal = startReal,
                StartImaginary = startImaginary,
                StartSize = startSize,
                EndReal = endReal,
                EndImaginary = endImaginary,
                EndSize = endSize,
                FrameCount = frameCount,
                Fps = fps,
                IterationLimit = iterationLimit
            });
        }

        private async Task CleanupFrames()
        {
            if (!string.IsNullOrEmpty(_connectionId))
                await Http.DeleteAsync($"api/movieframes/{_connectionId}");
        }

        public async ValueTask DisposeAsync()
        {
            if (_hubConnection != null)
                await _hubConnection.DisposeAsync();
        }
    }
}
