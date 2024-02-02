using DotNetAPI.Model;
using DotNetAPI.Service;
using Microsoft.AspNetCore.Mvc;

namespace DotNetAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ProductController : Controller
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService ??
                throw new ArgumentNullException(nameof(productService));
    }

    [HttpGet]
    [Route("GetProducts")]
    public async Task<IActionResult> GetProducts()
    {
        return Ok(await _productService.GetAllProduct());
    }
    [HttpGet]
    [Route("GetProductById/{productId}")]
    public async Task<IActionResult> GetProductById(Guid productId)
    {
        var result = await _productService.GetProductByID(productId);
        if (result == null)
            return NotFound("Product Not Found");
        return Ok(result);
    }

    [HttpGet]
    [Route("GetProductByUserId/{userId}")]
    public async Task<IActionResult> GetProductByUserId(Guid userId)
    {
        return Ok(await _productService.GetProductByUserId(userId));
    }


    [HttpPost]
    [Route("AddProduct")]
    public async Task<IActionResult> AddProduct([FromBody] Product product)
    {
        if (product == null)
            return BadRequest();

        var result = await _productService.AddProduct(product);
        if (result.ProductId == Guid.Empty)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
        }
        return Ok(new { Message = "Added Successfully!" });
    }
    [HttpPut]
    [Route("UpdateProduct")]
    public async Task<IActionResult> UpdateProduct([FromBody] Product product)
    {
        if (product == null)
            return BadRequest();

        var result = await _productService.UpdateProduct(product);
        if (result.UserId == Guid.Empty)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
        }

        return Ok(new { Message = "Updated Successfully" });
    }


    [HttpDelete]
    //[HttpDelete("{id}")]
    [Route("DeleteProduct/{productId}")]
    public async Task<IActionResult> DeleteProduct(Guid productId)
    {
        _productService.DeleteProduct(productId);
        return Ok(new { Message = "Deleted Successfully" });
    }
}
