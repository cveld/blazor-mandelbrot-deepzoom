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
using BigDecimalContracts;

namespace BlazorMandelbrotDeepzoom.Client.Pages
{
    public partial class Canvas : ComponentBase
    {                       
        private Canvas2DContext _context;
        private WebGLContext _webGLContext;

        protected BECanvasComponent _canvasReference;
        private DotNetObjectReference<Canvas> _objRef;

        private Mandelbrot.Mandelbrot mandelbrot;
        public IBigDecimal mPos { get; set; }
        public IBigDecimal mPosi { get; set; }
        public IBigDecimal mSize { get; set; }
        public int iterationlimit { get; set; }
        public int x { get; set; }
        public int y { get; set; }
        public int horizontalSize { get; set; }


        [Inject]
        protected IJSRuntime jSRuntime { get; set; }
        int width = 400;
        int height = 400;
        //IBigDecimal size;
        IBigDecimalFactory bigDecimalFactory;
        IMathContextFactory mathContextFactory;

        public Canvas(IBigDecimalFactory bigDecimalFactory, IMathContextFactory mathContextFactory)
        {
            this.bigDecimalFactory = bigDecimalFactory;
            this.mathContextFactory = mathContextFactory;
            SetUp();
        }
        public Canvas() 
        {            
            bigDecimalFactory = new BigDecimalFactory();
            mathContextFactory = new MathContextFactory();
            SetUp();
        }

        public void SetUp()
        {
            mandelbrot = new Mandelbrot.Mandelbrot(width, height, bigDecimalFactory, mathContextFactory);

            mSize = bigDecimalFactory.FromDouble(3.0);
            mPos = bigDecimalFactory.FromDouble(-0.75); //, mathContextFactory.BigDecimal128());
            mPosi = bigDecimalFactory.FromDouble(0); //, mathContextFactory.BigDecimal128());
            iterationlimit = 1024;
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
                await jSRuntime.InvokeVoidAsync("canvasInterop.init", _canvasReference.Id, _objRef, width, height);
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
            await jSRuntime.InvokeVoidAsync("canvasInterop.fetchAndDraw", mPos.ToString(), mPosi.ToString(), mSize.ToString(), iterationlimit);
        }

        public async Task ServerGenerateOld()
        {
            var mandelbrotImageDTO = await httpClient.GetJsonAsync<MandelbrotImageDTO>($"Mandelbrot?pos={mPos}&posi={mPosi}&size={mSize}&iterationlimit={iterationlimit}");
            image = mandelbrotImageDTO.Image;
            iterationlimit = mandelbrotImageDTO.NewIterationLimit;
            await jSRuntime.InvokeAsync<string>("canvasInterop.drawPixelsString", image);
        }

        /// <summary>
        /// Is called from JavaScript when server-side calculation is finished
        /// </summary>
        /// <param name="newIterationLimit"></param>
        [JSInvokable]
        public void NewIterationLimit(int newIterationLimit)
        {
            iterationlimit = newIterationLimit;
            StateHasChanged();
        }
        public async Task Generate()
        {

            // var result = mandelbrot.Generate(0, 0, 0);
            this.iterationlimit = mandelbrot.GetNewIterationLimit(iterationlimit);
            var result = mandelbrot.DoCalculation(SuperSampleType.SUPER_SAMPLE_NONE, mSize, mPos, mPosi, iterationlimit);
            fractal = result.mBuffer;
            var palette = new SFTPaletteOld();
            var imageBuilder = new ImageBuilder();
            //var imageBuilder = new BufferedImageBuilder();           
            var image = result.MakeTexture(imageBuilder, palette, SuperSampleType.SUPER_SAMPLE_NONE) as MandelbrotImage;
            //var image = result.MakeTexture(imageBuilder, palette, SuperSampleType.SUPER_SAMPLE_NONE) as BufferedImage;
            this.image = image.image;
            var text =
                await jSRuntime.InvokeAsync<string>("canvasInterop.drawPixelsString", image.image);            
        }

        public void Test()
        {
            var r = new Random();
            y = r.Next();
        }

        [JSInvokable]
        public void Dragged(Rect rect, bool drag)
        {
            x = rect.startX;
            y = rect.startY;
            horizontalSize = rect.w;            
            StateHasChanged();
        }

        public void SetCoordsClicked()
        {
            SetCoords(new Rect
            {
                startX = x,
                startY = y,
                w = horizontalSize
            });
        }

        // taken from SftComponent.java mouseClicked method
        public void SetCoords(Rect rect)
        {
            int s = rect.w;
            //if (x - mSelected_x <= s && mSelected_x - x <= s)
            {
                //s = (mDragged_size * 768) / 1024 / 2;
                //if (y - mSelected_y < s && mSelected_y - y < s)
                {
                    // double x_mul = x * 1.0 / mResolution_y - mResolution_x * 0.5 / mResolution_y;
                    double x_mul = rect.startX * 1.0 / this.height - this.width * 0.5 / this.height;
                    // double y_mul = (0.5 * mResolution_y - mSelected_y) / mResolution_y;
                    double y_mul = (0.5 * this.height - rect.startY) / this.height;

                    IBigDecimal x_offset = mSize.Mul(bigDecimalFactory.FromDouble(x_mul));
                    IBigDecimal y_offset = mSize.Mul(bigDecimalFactory.FromDouble(y_mul));

                    int size_scale = mSize.JavaScale();
                    if (x_offset.JavaScale() > size_scale + 4)
                        x_offset = x_offset.SetJavaScale(size_scale + 4, BigDecimalRoundingEnum.ROUND_HALF_DOWN);
                    if (y_offset.JavaScale() > size_scale + 4)
                        y_offset = y_offset.SetJavaScale(size_scale + 4, BigDecimalRoundingEnum.ROUND_HALF_DOWN);

                    mPos = mPos.Add(x_offset);
                    mPosi = mPosi.Add(y_offset);
                    // mSize = mSize.Mul(new BigDecimal(mDragged_size / 1024.0));
                    mSize = mSize.Mul(bigDecimalFactory.FromDouble((double)rect.w / this.width));

                    int newScale = 6 - mSize.JavaPrecision() + mSize.JavaScale();
                    mSize = mSize.SetJavaScale(newScale, BigDecimalRoundingEnum.HALF_UP);

                    mPos = mPos.StripTrailingZeros();
                    mPosi = mPosi.StripTrailingZeros();
                    mSize = mSize.StripTrailingZeros();

                }
            }
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
