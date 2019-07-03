using System;
namespace DatingApp.API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 10;

        public int PageNumber { get; set; } = 1;


        private int _pageSize = 10;

        public int PageSize
        {
            get { return _pageSize;     } 
            set { _pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public int  UserId { get; set; }

        public string Gender { get; set; }

        public int MinAge { get; set; } = 18;

        public int MaxAge { get; set; } = 90;

        public string OrderBy { get; set; }

        public bool Likees { get; set; } = false;

        public bool Likers { get; set; } = false;

        public UserParams()
        {
        }
    }
}
