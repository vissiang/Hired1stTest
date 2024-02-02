using DotNetAPI.Context;
using DotNetAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace DotNetAPI.Repository;

public class UserRepository : IUserRepository
{
    private readonly AppDBContext _appDBContext;
    public UserRepository(AppDBContext context)
    {
        _appDBContext = context ??
            throw new ArgumentNullException(nameof(context));
    }
    public async Task<IEnumerable<User>> GetAllUser()
    {
        return await _appDBContext.Users.ToListAsync();
    }
    public async Task<User?> GetUserByUid(Guid userId)
    {
        return await _appDBContext.Users.FindAsync(userId);
    }

    public async Task<User?> GetUserByEmailAddress(string emailAddress, Guid? userId = null)
    {
        var emailExist = userId != null ? _appDBContext.Users.Where(x => x.EmailAddress == emailAddress && x.UserId != userId).Any() : _appDBContext.Users.Where(x => x.EmailAddress == emailAddress).Any();
        return emailExist ? await _appDBContext.Users.Where(x => x.EmailAddress == emailAddress).FirstAsync() : null;
    }

    public async Task<User?> GetUserAccount(string emailAddress, string password)
    {
        return await _appDBContext.Users.Where(x => x.EmailAddress == emailAddress && x.Password == password).FirstAsync();
    }

    public async Task<User> AddUser(User user)
    {
        _appDBContext.Users.Add(user);
        await _appDBContext.SaveChangesAsync();
        return user;
    }
    public async Task<User> UpdateUser(User user)
    {
        _appDBContext.Entry(user).State = EntityState.Modified;
        await _appDBContext.SaveChangesAsync();
        return user;
    }
    public bool DeleteUser(Guid userId)
    {
        bool result = false;
        var department = _appDBContext.Users.Find(userId);
        if (department != null)
        {
            _appDBContext.Entry(department).State = EntityState.Deleted;
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
