using System;
namespace DatingApp.API.DTOs
{
    public class MessageForCreationDto
    {
        public int SenderId { get; set; }

        public int RecipientId { get; set; }

        public DateTime DataMessageSent { get; set; }

        public string Content { get; set; }


        public MessageForCreationDto()
        {
            DataMessageSent = DateTime.Now;
        }
    }
}
