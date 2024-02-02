using DotNetAPI.Model;
using DotNetAPI.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace DotNetAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class UserController : Controller
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService ??
                throw new ArgumentNullException(nameof(userService));
    }

    [HttpPost]
    [Route("Authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] User user)
    {
        if (user == null)
            return BadRequest();

        var result = await _userService.Authenticate(user);

        if (result == null)
            return NotFound("User Not Found");

        return Ok(result);
    }

    //[HttpGet]
    //[Route("Authenticate")]
    //public async Task<IActionResult> Authenticate(string username, string password)
    //{
    //    var result = await _userService.Authenticate(user);

    //    if (result == null)
    //        return NotFound("User Not Found");

    //    return Ok(new { Message = "Login Successfully!" });
    //}

    [HttpGet]
    [Route("GetUsers")]
    public async Task<IActionResult> GetUsers()
    {
        return Ok(await _userService.GetAllUser());
    }
    [HttpGet]
    [Route("GetUserById/{userId}")]
    public async Task<IActionResult> GetUserById(Guid userId)
    {
        var result = await _userService.GetUserByUid(userId);
        if (result == null)
            return NotFound("User Not Found");
        return Ok(result);
    }

    [HttpGet]
    [Route("GetUserByEmail/{emailAdd}")]
    public async Task<IActionResult> GetUserByEmail(string emailAdd)
    {
        var result = await _userService.GetUserByEmailAddress(emailAdd);
        if (result == null)
            return NotFound("User Not Found");
        return Ok(result);
    }

    [HttpPost]
    [Route("AddUser")]
    public async Task<IActionResult> AddUser([FromBody] User user)
    {
        if (user == null)
            return BadRequest();

        if(await _userService.EmailAddressExist(user.EmailAddress))
            return BadRequest(new {Message = "Email Address Exist!"});

        var result = await _userService.AddUser(user);

        if (result.UserId == Guid.Empty)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
        }
        return Ok(new { Message = "Added Successfully!" });
    }
    [HttpPut]
    [Route("UpdateUser")]
    public async Task<IActionResult> UpdateUser([FromBody] User user)
    {
        if (user == null)
            return BadRequest();

        if (await _userService.EmailAddressExist(user.EmailAddress, user.UserId))
            return BadRequest(new { Message = "Email Address Exist!" });

        var result = await _userService.UpdateUser(user);

        if (result.UserId == Guid.Empty)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
        }

        return Ok(new { Message = "Updated Successfully" });
    }
    [HttpDelete]
    //[HttpDelete("{id}")]
    [Route("DeleteUser/{userId}")]
    public async Task<IActionResult> DeleteUser(Guid userId)
    {
        _userService.DeleteUser(userId);
        return Ok(new { Message = "Deleted Successfully" });
    }
}
