namespace BlazorMandelbrotDeepzoom.Shared
{
    public class InterestingPointDTO
    {
        public string Name { get; set; }
        public string Real { get; set; }
        public string Imaginary { get; set; }
        public string Size { get; set; }
        public int IterationLimit { get; set; }
        public string ImageDataUrl { get; set; }
    }
}
