using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAPI.Model;

[Table("User")]
public class User
{
    [Key]
    public Guid UserId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string EmailAddress { get; set; }
    public string Password { get; set; }
    public DateTime AddedDate { get; set; }
    public DateTime? LastUpdatedDate { get; set;}
}
