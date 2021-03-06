﻿using System;
namespace DatingApp.API.DTOs
{
    public class PhotoForReturnDto
    {
        public int PhotoId { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public DateTime DateAdded { get; set; }

        public bool IsMain { get; set; }

        public string PublicId { get; set; }

        public PhotoForReturnDto()
        {
        }
    }
}
