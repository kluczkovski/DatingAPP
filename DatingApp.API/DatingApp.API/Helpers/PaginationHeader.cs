using System;
namespace DatingApp.API.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }

        public int ItemPerPage { get; set; }

        public int TotalItems { get; set; }

        public int TotalPages { get; set; }

        public PaginationHeader(int currentPage, int itemsPerpage, int totalItems, int totalPages)
        {
            CurrentPage = currentPage;
            ItemPerPage = itemsPerpage;
            TotalItems = totalItems;
            TotalPages = totalPages;
        }


    }
}
