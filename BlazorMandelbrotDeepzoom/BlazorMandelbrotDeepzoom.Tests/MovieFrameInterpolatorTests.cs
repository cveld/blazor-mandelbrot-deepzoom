using BigDecimalDParker;
using BlazorMandelbrotDeepzoom.Server;
using Xunit;

namespace BlazorMandelbrotDeepzoom.Tests;

public class MovieFrameInterpolatorTests
{
    private readonly BigDecimalFactory _factory = new();

    private const string StartReal      = "-0.75";
    private const string StartImaginary = "0";
    private const string StartSize      = "3";
    private const string EndReal        = "-0.984582706537303595";
    private const string EndImaginary   = "-0.260429573738063572";
    private const string EndSize        = "0.00000000000592946";

    [Fact]
    public void Frame0_ReturnsStartPosition()
    {
        var (pos, posi) = Interpolate(0, 100);

        Assert.Equal(StartReal, pos.ToString());
        Assert.Equal(StartImaginary, posi.ToString());
    }

    [Fact]
    public void LastFrame_ReturnsEndPosition()
    {
        var (pos, posi) = Interpolate(99, 100);

        Assert.Equal(EndReal, pos.ToString());
        Assert.Equal(EndImaginary, posi.ToString());
    }

    [Fact]
    public void SingleFrame_ReturnsStartPosition()
    {
        var (pos, posi) = Interpolate(0, 1);

        Assert.Equal(StartReal, pos.ToString());
        Assert.Equal(StartImaginary, posi.ToString());
    }

    private (BigDecimalContracts.IBigDecimal pos, BigDecimalContracts.IBigDecimal posi) Interpolate(int frame, int totalFrames)
    {
        return MovieFrameInterpolator.InterpolatePosition(
            frame, totalFrames,
            _factory.FromString(StartReal),
            _factory.FromString(StartImaginary),
            StartSize,
            _factory.FromString(EndReal),
            _factory.FromString(EndImaginary),
            EndSize,
            _factory);
    }
}
