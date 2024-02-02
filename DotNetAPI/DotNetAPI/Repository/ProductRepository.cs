using DotNetAPI.Context;
using DotNetAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace DotNetAPI.Repository;

public class ProductRepository : IProductRepository
{
    private readonly AppDBContext _appDBContext;
    public ProductRepository(AppDBContext context)
    {
        _appDBContext = context ??
            throw new ArgumentNullException(nameof(context));
    }
    public async Task<IEnumerable<Product>> GetAllProduct()
    {
        return await _appDBContext.Products.ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetProductByUserId(Guid userId)
    {
        return await _appDBContext.Products.Where(x => x.UserId == userId).ToListAsync();
    }
    public async Task<Product> GetProductByID(Guid productId)
    {
        return await _appDBContext.Products.FindAsync(productId);
    }
    public async Task<Product> AddProduct(Product product)
    {
        _appDBContext.Products.Add(product);
        await _appDBContext.SaveChangesAsync();
        return product;
    }
    public async Task<Product> UpdateProduct(Product product)
    {
        _appDBContext.Entry(product).State = EntityState.Modified;
        await _appDBContext.SaveChangesAsync();
        return product;
    }
    public bool DeleteProduct(Guid productId)
    {
        bool result = false;
        var product = _appDBContext.Products.Find(productId);
        if (product != null)
        {
            _appDBContext.Entry(product).State = EntityState.Deleted;
            _appDBContext.SaveChanges();
            result = true;
        }
        else
        {
            result = false;
        }
        return result;
    }
}