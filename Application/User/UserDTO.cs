namespace Application.User
{
    public class UserDTO
    {
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool LockoutEnabled { get; set; }
        public bool IsActive { get; set; }                                
    }
}