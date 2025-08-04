using Municipality.Data.Entities;

namespace Municipality.Data.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetByEmailAsync(string email);
        Task<bool> ValidateCredentialsAsync(string username, string password);
    }
}

