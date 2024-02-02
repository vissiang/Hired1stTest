using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAPI.Model;

[Table("Product")]
public class Product
{
    [Key]
    public Guid ProductId { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string? Description { get; set; }
    public DateTime AddedDate { get; set; }
    public DateTime? LastUpdatedDate { get; set; }
    public Guid UserId { get; set; }
}
