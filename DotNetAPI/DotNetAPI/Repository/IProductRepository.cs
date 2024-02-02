using DotNetAPI.Model;

namespace DotNetAPI.Repository;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllProduct();
    Task<IEnumerable<Product>> GetProductByUserId(Guid userId);
    Task<Product> GetProductByID(Guid productId);
    Task<Product> AddProduct(Product product);
    Task<Product> UpdateProduct(Product product);
    bool DeleteProduct(Guid productId);
}
