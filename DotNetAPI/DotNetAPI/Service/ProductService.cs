using DotNetAPI.Model;
using DotNetAPI.Repository;

namespace DotNetAPI.Service;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepo;
    public ProductService(IProductRepository productRepo)
    {
        _productRepo= productRepo;
    }

    public async Task<Product> AddProduct(Product product)
    {
        return await _productRepo.AddProduct(product);
    }

    public bool DeleteProduct(Guid productId)
    {
        return _productRepo.DeleteProduct(productId);
    }

    public async Task<IEnumerable<Product>> GetAllProduct()
    {
        return await _productRepo.GetAllProduct();
    }

    public async Task<Product> GetProductByID(Guid productId)
    {
        return await _productRepo.GetProductByID(productId);
    }

    public async Task<IEnumerable<Product>> GetProductByUserId(Guid userId)
    {
        return await _productRepo.GetProductByUserId(userId);
    }

    public async Task<Product> UpdateProduct(Product product)
    {
        return await _productRepo.UpdateProduct(product);
    }
}
