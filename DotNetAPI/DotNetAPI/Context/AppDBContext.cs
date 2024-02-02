using DotNetAPI.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DotNetAPI.Context;

public class AppDBContext : DbContext
{
    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }
    public DbSet<User> Users
    {
        get;
        set;
    }

    public DbSet<Product> Products
    {
        get;
        set;
    }
}