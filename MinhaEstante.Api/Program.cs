using Microsoft.EntityFrameworkCore;
using MinhaEstante.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// --- SEÇÃO DE CONFIGURAÇÃO DE SERVIÇOS (Nosso "Carrinho de Compras") ---

// 1. Configurar o DbContext para usar o SQLite
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

// 2. Adicionar o serviço de Controllers
builder.Services.AddControllers();

// 3. Adicionar os serviços do Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 4. Adicionar o serviço do CORS (CORREÇÃO: Ele deve estar aqui, ANTES do builder.Build())
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});


// --- AQUI "FECHAMOS A COMPRA" ---
var app = builder.Build();


// --- SEÇÃO DE CONFIGURAÇÃO DO PIPELINE HTTP ---

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 5. Dizer ao aplicativo para USAR o CORS
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();