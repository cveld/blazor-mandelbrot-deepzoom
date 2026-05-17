using BlazorMandelbrotDeepzoom.Shared;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace BlazorMandelbrotDeepzoom.Client.Pages
{
    public partial class InterpolationTest : ComponentBase
    {
        [Inject] private HttpClient Http { get; set; }
        [Inject] private IJSRuntime JS { get; set; }

        private List<InterestingPointSummaryDTO> pois = new();
        private List<InterpolationFrameDTO> frames;

        private string sourceReal = "-0.75";
        private string sourceImaginary = "0";
        private string sourceSize = "3";
        private string targetReal = "-0.75";
        private string targetImaginary = "0";
        private string targetSize = "0.001";
        private int sourceIterationLimit = 1024;
        private int targetIterationLimit = 1024;

        private string renderReal = "";
        private string renderImaginary = "";
        private string renderSize = "";
        private int renderIterationLimit = 1024;

        private int frameCount = 10;
        private string errorMessage;
        private bool isRendering = false;
        private int generatingFrameNumber = -1;
        private int previewFrameNumber = -1;

        protected override async Task OnInitializedAsync()
        {
            pois = await Http.GetFromJsonAsync<List<InterestingPointSummaryDTO>>("InterestingPoints") ?? new();
        }

        private void OnSourcePoiChanged(ChangeEventArgs e)
        {
            var poi = pois.Find(p => p.Id == e.Value?.ToString());
            if (poi == null) return;
            sourceReal = poi.Real;
            sourceImaginary = poi.Imaginary;
            sourceSize = poi.Size;
            sourceIterationLimit = poi.IterationLimit;
        }

        private void OnTargetPoiChanged(ChangeEventArgs e)
        {
            var poi = pois.Find(p => p.Id == e.Value?.ToString());
            if (poi == null) return;
            targetReal = poi.Real;
            targetImaginary = poi.Imaginary;
            targetSize = poi.Size;
            targetIterationLimit = poi.IterationLimit;
        }

        private async Task Interpolate()
        {
            errorMessage = null;
            frames = null;
            previewFrameNumber = -1;
            try
            {
                static string Enc(string s) => Uri.EscapeDataString(s ?? "");
                var url = $"Interpolation?startReal={Enc(sourceReal)}&startImaginary={Enc(sourceImaginary)}&startSize={Enc(sourceSize)}&endReal={Enc(targetReal)}&endImaginary={Enc(targetImaginary)}&endSize={Enc(targetSize)}&frames={frameCount}&startIterationLimit={sourceIterationLimit}&endIterationLimit={targetIterationLimit}";

                frames = await Http.GetFromJsonAsync<List<InterpolationFrameDTO>>(url);
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
            }
        }

        private void SelectFrame(InterpolationFrameDTO frame)
        {
            renderReal = frame.Real;
            renderImaginary = frame.Imaginary;
            renderSize = frame.Size;
            renderIterationLimit = frame.IterationLimit;
            generatingFrameNumber = frame.Frame;
        }

        private async Task RenderPanel()
        {
            isRendering = true;
            StateHasChanged();
            try
            {
                static string Enc(string s) => Uri.EscapeDataString(s ?? "");
                var url = $"Mandelbrot?pos={Enc(renderReal)}&posi={Enc(renderImaginary)}&size={Enc(renderSize)}&iterationlimit={renderIterationLimit}";
                var dto = await Http.GetFromJsonAsync<MandelbrotImageDTO>(url);
                previewFrameNumber = generatingFrameNumber;
                var base64 = Convert.ToBase64String(dto.Image);
                await JS.InvokeVoidAsync("interpolationInterop.drawPixelsToCanvas", "frame-preview-canvas", base64, 400, 400);
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
            }
            finally
            {
                isRendering = false;
                StateHasChanged();
            }
        }
    }
}
