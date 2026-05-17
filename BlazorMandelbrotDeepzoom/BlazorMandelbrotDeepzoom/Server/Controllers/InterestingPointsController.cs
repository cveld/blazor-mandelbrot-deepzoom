using Azure.Data.Tables;
using Azure.Storage.Blobs;
using BlazorMandelbrotDeepzoom.Shared;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BlazorMandelbrotDeepzoom.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InterestingPointsController : ControllerBase
    {
        private readonly TableClient _tableClient;
        private readonly BlobContainerClient _blobContainerClient;

        public InterestingPointsController(TableClient tableClient, BlobContainerClient blobContainerClient)
        {
            _tableClient = tableClient;
            _blobContainerClient = blobContainerClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var results = new List<InterestingPointSummaryDTO>();
            await foreach (var entity in _tableClient.QueryAsync<TableEntity>())
            {
                var rowKey = entity.RowKey;
                var hasImage = entity.GetString("ImageUrl") != null;
                results.Add(new InterestingPointSummaryDTO
                {
                    Id = rowKey,
                    Name = entity.GetString("Name"),
                    Real = entity.GetString("Real"),
                    Imaginary = entity.GetString("Imaginary"),
                    Size = entity.GetString("Size"),
                    IterationLimit = entity.GetInt32("IterationLimit") ?? 0,
                    HasImage = hasImage,
                    ImageUrl = hasImage ? $"InterestingPoints/{rowKey}/image" : null
                });
            }
            return Ok(results);
        }

        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetImage(string id)
        {
            var blobClient = _blobContainerClient.GetBlobClient($"{id}.png");
            if (!await blobClient.ExistsAsync())
                return NotFound();
            var download = await blobClient.DownloadStreamingAsync();
            return File(download.Value.Content, "image/png");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _tableClient.DeleteEntityAsync("mandelbrot", id);
            var blobClient = _blobContainerClient.GetBlobClient($"{id}.png");
            await blobClient.DeleteIfExistsAsync();
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Post(InterestingPointDTO dto)
        {
            await _tableClient.CreateIfNotExistsAsync();

            var rowKey = Guid.NewGuid().ToString();
            string imageUrl = null;

            if (!string.IsNullOrEmpty(dto.ImageDataUrl))
            {
                await _blobContainerClient.CreateIfNotExistsAsync();
                var base64Data = dto.ImageDataUrl.Split(',')[1];
                var imageBytes = Convert.FromBase64String(base64Data);
                var blobClient = _blobContainerClient.GetBlobClient($"{rowKey}.png");
                await blobClient.UploadAsync(new BinaryData(imageBytes), new Azure.Storage.Blobs.Models.BlobUploadOptions
                {
                    HttpHeaders = new Azure.Storage.Blobs.Models.BlobHttpHeaders { ContentType = "image/png" }
                });
                imageUrl = blobClient.Uri.ToString();
            }

            var entity = new TableEntity("mandelbrot", rowKey)
            {
                ["Name"] = dto.Name,
                ["Real"] = dto.Real,
                ["Imaginary"] = dto.Imaginary,
                ["Size"] = dto.Size,
                ["IterationLimit"] = dto.IterationLimit,
                ["ImageUrl"] = imageUrl
            };
            await _tableClient.AddEntityAsync(entity);
            return Ok();
        }
    }
}
