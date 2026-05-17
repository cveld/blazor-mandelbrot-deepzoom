namespace BlazorMandelbrotDeepzoom.Shared
{
    public class InterpolationFrameDTO
    {
        public int Frame { get; set; }
        public string Real { get; set; }
        public string Imaginary { get; set; }
        public string Size { get; set; }
        public int IterationLimit { get; set; }
    }
}
