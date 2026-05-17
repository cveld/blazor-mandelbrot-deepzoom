using BigDecimalDParker;
using Xunit;

namespace BlazorMandelbrotDeepzoom.Tests;

public class BigDecimalDivTests
{
    private readonly BigDecimalFactory _factory = new();

    private BigDecimalContracts.IBigDecimal BD(string s) => _factory.FromString(s);

    [Theory]
    [InlineData("1",   "2",   "0.5")]
    [InlineData("6",   "2",   "3")]
    [InlineData("10",  "4",   "2.5")]
    [InlineData("-1",  "2",   "-0.5")]
    [InlineData("1",   "-2",  "-0.5")]
    [InlineData("0.5", "0.1", "5")]
    [InlineData("1",   "3",   "0.333333")]
    [InlineData("2",   "3",   "0.666666")]
    [InlineData("1",   "1",   "1")]
    [InlineData("0",   "1",   "0")]
    [InlineData("-0.4828118049731756187755102040816326530612244897959183673469387755102040816326530612244897959183673468", "1", "-0.4828118049731756187755102040816326530612244897959183673469387755102040816326530612244897959183673468")]
    public void Div_ReturnsExpected(string left, string right, string expectedPrefix)
    {
        var result = BD(left).Div(BD(right));
        Assert.StartsWith(expectedPrefix, result.ToString());
    }
}
