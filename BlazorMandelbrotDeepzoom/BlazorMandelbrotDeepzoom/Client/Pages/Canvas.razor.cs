using BigDecimalDParker;
using Blazor.Extensions;
using Blazor.Extensions.Canvas.Canvas2D;
using Blazor.Extensions.Canvas.WebGL;
using Mandelbrot;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlazorMandelbrotDeepzoom.Shared;
using System.Globalization;
using System.Net.Http;
using BlazorMandelbrotDeepzoom.Client.Models;

namespace BlazorMandelbrotDeepzoom.Client.Pages
{
    public partial class Canvas : ComponentBase
    {                       
        private Canvas2DContext _context;
        private WebGLContext _webGLContext;

        protected BECanvasComponent _canvasReference;
        private DotNetObjectReference<Canvas> _objRef;

        private Mandelbrot.Mandelbrot mandelbrot;
        [Inject]
        protected IJSRuntime jSRuntime { get; set; }
        int width = 400;
        int height = 400;
        public Canvas()
        {            
            var bigDecimalFactory = new BigDecimalFactory();
            var mathContextFactory = new MathContextFactory();
            mandelbrot = new Mandelbrot.Mandelbrot(width, height, bigDecimalFactory, mathContextFactory);            
        }
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                _objRef = DotNetObjectReference.Create(this);
                _context = await this._canvasReference.CreateCanvas2DAsync();
                //await this._context.SetFillStyleAsync("green");

                //await this._context.FillRectAsync(10, 100, 100, 100);

                //await this._context.SetFontAsync("48px serif");
                //await this._context.StrokeTextAsync("Hello Blazor!!!", 10, 100);
                await jSRuntime.InvokeVoidAsync("canvasInterop.init", _canvasReference.Id, _objRef);
            }
        }

        public int[] fractal { get; set; }
        public byte[] image { get; set; }
        public string listFrom { get; set; }
        public int listFromNumber { get; set; }
        public bool listFromNumberValid { get; set; }

        [Inject]
        public HttpClient httpClient { get; set; }

        public async Task ServerGenerate()
        {
            var pixels = await httpClient.GetJsonAsync<byte[]>("Mandelbrot");
            this.image = pixels;
            await jSRuntime.InvokeAsync<string>("canvasInterop.drawPixels", 0, 0, width, height, pixels);
        }
        public async Task Generate()
        {

            // var result = mandelbrot.Generate(0, 0, 0);
            var result = mandelbrot.DoCalculation(SuperSampleType.SUPER_SAMPLE_NONE);
            fractal = result.mBuffer;
            var palette = new SFTPaletteOld();
            var imageBuilder = new ImageBuilder();
            //var imageBuilder = new BufferedImageBuilder();           
            var image = result.MakeTexture(imageBuilder, palette, SuperSampleType.SUPER_SAMPLE_NONE) as MandelbrotImage;
            //var image = result.MakeTexture(imageBuilder, palette, SuperSampleType.SUPER_SAMPLE_NONE) as BufferedImage;
            this.image = image.image;
            var text =
                await jSRuntime.InvokeAsync<string>("canvasInterop.drawPixels", 0, 0, width, height, image.image);            
        }

        public void Test()
        {
            var r = new Random();
            y = r.Next();
        }

        public int x { get; set; }
        public int y { get; set; }
        [JSInvokable]
        public void Dragged(Rect rect, bool drag)
        {
            x = rect.StartX;
            var r = new Random();
            y = r.Next();
            StateHasChanged();
        }

        public void listFromChanged(ChangeEventArgs e)
        {
            var val = e.Value.ToString();
            listFromNumberValid = int.TryParse(val, System.Globalization.NumberStyles.HexNumber, CultureInfo.InvariantCulture, out var listFromNumberValue);
            if (listFromNumberValid)
            {
                listFromNumber = listFromNumberValue;
            }
        }

        public async void Dispose()
        {
            _objRef.Dispose();
            await jSRuntime.InvokeVoidAsync("canvasInterop.destroy", null);
        }
    }
}
