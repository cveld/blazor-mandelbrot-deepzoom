using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BlazorMandelbrotDeepzoom.Server.Controllers
{
    [ApiController]
    [Route("api/movieframes")]
    public class MovieFramesController : ControllerBase
    {
        private readonly BlobContainerClient _blobContainer;

        public MovieFramesController(BlobContainerClient blobContainer)
        {
            _blobContainer = blobContainer;
        }

        [HttpGet("{connectionId}/{frameNumber}")]
        public async Task<IActionResult> GetFrame(string connectionId, int frameNumber)
        {
            var blobName = $"movie-frames/{connectionId}/{frameNumber:D4}";
            var blobClient = _blobContainer.GetBlobClient(blobName);

            if (!await blobClient.ExistsAsync())
                return NotFound();

            var download = await blobClient.DownloadStreamingAsync();
            return File(download.Value.Content, "application/octet-stream");
        }

        [HttpDelete("{connectionId}")]
        public async Task<IActionResult> Cleanup(string connectionId)
        {
            var prefix = $"movie-frames/{connectionId}/";
            var tasks = new List<Task>();

            await foreach (var blob in _blobContainer.GetBlobsAsync(prefix: prefix))
                tasks.Add(_blobContainer.GetBlobClient(blob.Name).DeleteIfExistsAsync());

            await Task.WhenAll(tasks);
            return NoContent();
        }
    }
}
