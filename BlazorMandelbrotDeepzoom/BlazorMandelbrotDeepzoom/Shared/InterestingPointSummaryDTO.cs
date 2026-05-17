namespace BlazorMandelbrotDeepzoom.Shared
{
    public class InterestingPointSummaryDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Real { get; set; }
        public string Imaginary { get; set; }
        public string Size { get; set; }
        public int IterationLimit { get; set; }
        public string ImageUrl { get; set; }
        public bool HasImage { get; set; }
    }
}
