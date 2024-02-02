using DotNetAPI.Context;
using DotNetAPI.Model;
using DotNetAPI.Repository;

namespace DotNetAPI.Service;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepo;

    public UserService(IUserRepository userRepo)
    {
        _userRepo = userRepo;
    }

    public async Task<IEnumerable<User>> GetAllUser()
    {
        return await _userRepo.GetAllUser();
    }

    public async Task<User> AddUser(User user)
    {
        user.AddedDate= DateTime.Now;
        return await _userRepo.AddUser(user);
    }

    public async Task<User?> Authenticate(User user)
    {
        var userDB = await _userRepo.GetUserAccount(user.EmailAddress, user.Password);
        
        return userDB;
    }


    public bool DeleteUser(Guid userId)
    {
        return _userRepo.DeleteUser(userId);
    }

    public async Task<User?> GetUserByUid(Guid userId)
    {
        return await _userRepo.GetUserByUid(userId);
    }

    public async Task<User?> GetUserByEmailAddress(string emailAddress)
    {
        return await _userRepo.GetUserByEmailAddress(emailAddress);
    }

    public async Task<User> UpdateUser(User user)
    {
        user.LastUpdatedDate = DateTime.Now;
        return await _userRepo.UpdateUser(user);
    }

    public async Task<bool> EmailAddressExist(string emailAddress, Guid? userId = null)
    {
        return await _userRepo.GetUserByEmailAddress(emailAddress, userId) == null ? false : true;
    }

    //Password Hash Method
    //Password Strength Method
}
