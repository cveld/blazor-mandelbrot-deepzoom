using Azure.Storage.Blobs;
using BigDecimalDParker;
using BlazorMandelbrotDeepzoom.Shared;
using Mandelbrot;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;

namespace BlazorMandelbrotDeepzoom.Server.Hubs
{
    public class MovieHub : Hub
    {
        private readonly BlobContainerClient _blobContainer;

        public MovieHub(BlobContainerClient blobContainer)
        {
            _blobContainer = blobContainer;
        }

        public async Task StartGeneration(MovieGenerationRequestDTO request)
        {
            var connectionId = Context.ConnectionId;
            var clients = Clients;
            var blobContainer = _blobContainer;

            _ = Task.Run(async () =>
            {
                try
                {
                    var factory = new BigDecimalFactory();
                    var mathCtxFactory = new MathContextFactory();

                    var startPos = factory.FromString(request.StartReal);
                    var startPosi = factory.FromString(request.StartImaginary);
                    var endPos = factory.FromString(request.EndReal);
                    var endPosi = factory.FromString(request.EndImaginary);

                    double startSizeD = double.Parse(request.StartSize, CultureInfo.InvariantCulture);
                    double endSizeD = double.Parse(request.EndSize, CultureInfo.InvariantCulture);
                    double logStart = Math.Log(startSizeD);
                    double logEnd = Math.Log(endSizeD);

                    int frames = Math.Max(1, request.FrameCount);

                    for (int i = 0; i < frames; i++)
                    {
                        var (pos, posi) = MovieFrameInterpolator.InterpolatePosition(
                            i, frames,
                            startPos, startPosi, request.StartSize,
                            endPos, endPosi, request.EndSize,
                            factory);
                        var size = factory.FromDouble(Math.Exp(logStart + (frames > 1 ? (double)i / (frames - 1) : 0.0) * (logEnd - logStart)));

                        var mandelbrot = new Mandelbrot.Mandelbrot(400, 400, factory, mathCtxFactory);
                        var result = mandelbrot.DoCalculation(SuperSampleType.SUPER_SAMPLE_NONE, size, pos, posi, request.IterationLimit);
                        var mandelbrotImage = result.MakeTexture(new ImageBuilder(), new SFTPaletteOld(), SuperSampleType.SUPER_SAMPLE_NONE) as MandelbrotImage;

                        var blobName = $"movie-frames/{connectionId}/{i:D4}";
                        var blobClient = blobContainer.GetBlobClient(blobName);
                        using (var stream = new MemoryStream(mandelbrotImage.image))
                        {
                            await blobClient.UploadAsync(stream, overwrite: true);
                        }

                        await clients.Client(connectionId).SendAsync("FrameReady", new FrameReadyDTO
                        {
                            FrameNumber = i,
                            TotalFrames = frames,
                            FrameUrl = $"api/movieframes/{Uri.EscapeDataString(connectionId)}/{i}"
                        });
                    }

                    await clients.Client(connectionId).SendAsync("GenerationComplete");
                }
                catch (Exception ex)
                {
                    await clients.Client(connectionId).SendAsync("GenerationError", ex.Message);
                }
            });
        }
    }
}
