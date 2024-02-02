using DotNetAPI.Model;

namespace DotNetAPI.Repository;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllUser();
    Task<User?> GetUserByUid(Guid userId);
    Task<User?> GetUserByEmailAddress(string emailAddress, Guid? userId = null);
    Task<User?> GetUserAccount(string emailAddress, string password);
    Task<User> AddUser(User user);
    Task<User> UpdateUser(User user);
    bool DeleteUser(Guid userId);
}
