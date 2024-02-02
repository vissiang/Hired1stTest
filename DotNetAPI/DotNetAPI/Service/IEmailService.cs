using DotNetAPI.Model;

namespace DotNetAPI.Service;

public interface IEmailService
{
    void SendEmail(Email email);
}
