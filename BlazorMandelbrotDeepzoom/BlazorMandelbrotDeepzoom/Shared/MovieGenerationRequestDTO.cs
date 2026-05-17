namespace BlazorMandelbrotDeepzoom.Shared
{
    public class MovieGenerationRequestDTO
    {
        public string StartReal { get; set; }
        public string StartImaginary { get; set; }
        public string StartSize { get; set; }
        public string EndReal { get; set; }
        public string EndImaginary { get; set; }
        public string EndSize { get; set; }
        public int FrameCount { get; set; }
        public int Fps { get; set; }
        public int IterationLimit { get; set; }
    }
}
