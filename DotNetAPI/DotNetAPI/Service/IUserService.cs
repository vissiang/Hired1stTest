using DotNetAPI.Context;
using DotNetAPI.Model;

namespace DotNetAPI.Service;

public interface IUserService
{
    Task<User?> Authenticate(User user);
    Task<IEnumerable<User>> GetAllUser();
    Task<User?> GetUserByUid(Guid userId);
    Task<User?> GetUserByEmailAddress(string emailAddress);
    Task<User> AddUser(User user);
    Task<User> UpdateUser(User user);
    bool DeleteUser(Guid userId);
    Task<bool> EmailAddressExist(string emailAddress, Guid? userId = null);
}
