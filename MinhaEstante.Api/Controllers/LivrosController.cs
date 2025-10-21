// Controllers/LivrosController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinhaEstante.Api.Data;
using MinhaEstante.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")] // Define a rota base como "api/livros"
public class LivrosController : ControllerBase
{
    private readonly AppDbContext _context;

    // O .NET injeta automaticamente o AppDbContext aqui para nós
    public LivrosController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/livros
    // Retorna todos os livros salvos na sua estante.
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Livro>>> GetLivros()
    {
        return await _context.Livros.ToListAsync();
    }

    // POST: api/livros
    // Adiciona um novo livro à sua estante.
    [HttpPost]
    public async Task<ActionResult<Livro>> PostLivro(Livro livro)
    {
        _context.Livros.Add(livro);
        await _context.SaveChangesAsync();

        // Retorna um status 201 (Created) com os dados do livro criado
        return CreatedAtAction(nameof(GetLivros), new { id = livro.Id }, livro);
    }

    // PUT: api/livros/5
    // Atualiza um livro existente (ex: muda o status ou dá uma nota).
    [HttpPut("{id}")]
    public async Task<IActionResult> PutLivro(int id, Livro livro)
    {
        if (id != livro.Id)
        {
            return BadRequest();
        }

        _context.Entry(livro).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent(); // Retorna um status 204 (No Content)
    }

    // DELETE: api/livros/5
    // Remove um livro da sua estante.
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLivro(int id)
    {
        var livro = await _context.Livros.FindAsync(id);
        if (livro == null)
        {
            return NotFound();
        }

        _context.Livros.Remove(livro);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}