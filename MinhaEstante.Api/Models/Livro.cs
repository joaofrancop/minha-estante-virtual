namespace MinhaEstante.Api.Models
{
    public class Livro
    {
        public int Id { get; set; }
        public string ApiId { get; set; } = string.Empty;
        public string Titulo { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public string UrlCapa { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int? Nota { get; set; }
    }
}