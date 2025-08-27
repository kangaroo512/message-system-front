export class MessageService {

    constructor() {
this._messages = [
  {
  pageNumber:0,
  pageSize:10,
  totalPages:2,
  totalElements:20,
  content: [
  {
    conversationId: 1,
    name: "Alice",
    numberOfMessages: 3,
    messagePreview: "Hey, are we still meeting tomorrow?",
    date: "2025-08-17 10:32"
  },
  {
    conversationId: 2,
    name: "Bob",
    numberOfMessages: 5,
    messagePreview: "Don’t forget to send me the report.",
    date: "2025-08-16 18:45"
  },
  {
    conversationId: 3,
    name: "Charlie",
    numberOfMessages: 1,
    messagePreview: "Got it, thanks!",
    date: "2025-08-16 15:12"
  },
  {
    conversationId: 4,
    name: "Diana",
    numberOfMessages: 2,
    messagePreview: "Let’s reschedule for next week.",
    date: "2025-08-15 09:58"
  },
  {
    conversationId: 5,
    name: "Eve",
    numberOfMessages: 4,
    messagePreview: "Here’s the link I mentioned.",
    date: "2025-08-14 21:07"
  },
  {
    conversationId: 6,
    name: "Frank",
    numberOfMessages: 6,
    messagePreview: "Can you review my code?",
    date: "2025-08-14 14:22"
  },
  {
    conversationId: 7,
    name: "Grace",
    numberOfMessages: 3,
    messagePreview: "Happy birthday! 🎉",
    date: "2025-08-13 19:10"
  },
  {
    conversationId: 8,
    name: "Hank",
    numberOfMessages: 2,
    messagePreview: "Running late, be there soon.",
    date: "2025-08-13 08:47"
  },
  {
    conversationId: 9,
    name: "Ivy",
    numberOfMessages: 1,
    messagePreview: "Let me know if you’re free later.",
    date: "2025-08-12 12:30"
  },
  {
    conversationId: 10,
    name: "Jack",
    numberOfMessages: 7,
    messagePreview: "Meeting is confirmed for Monday.",
    date: "2025-08-12 09:15"
  }]
},
{
    pageNumber:1,
    pageSize:10,
    totalPages:2,
    totalElements:20,
    content: [
        {
    conversationId: 11,
    name: "Karen",
    numberOfMessages: 2,
    messagePreview: "Did you finish the assignment?",
    date: "2025-08-11 16:05"
  },
  {
    conversationId: 12,
    name: "Leo",
    numberOfMessages: 5,
    messagePreview: "Check out this article I found.",
    date: "2025-08-11 11:48"
  },
  {
    conversationId: 13,
    name: "Mona",
    numberOfMessages: 1,
    messagePreview: "See you at the party tonight!",
    date: "2025-08-10 20:22"
  },
  {
    conversationId: 14,
    name: "Nate",
    numberOfMessages: 3,
    messagePreview: "Can we push the deadline?",
    date: "2025-08-10 14:55"
  },
  {
    conversationId: 15,
    name: "Olivia",
    numberOfMessages: 4,
    messagePreview: "Loved the photos you sent!",
    date: "2025-08-09 18:37"
  },
  {
    conversationId: 16,
    name: "Paul",
    numberOfMessages: 2,
    messagePreview: "Don’t forget our appointment.",
    date: "2025-08-09 09:03"
  },
  {
    conversationId: 17,
    name: "Quinn",
    numberOfMessages: 6,
    messagePreview: "Here’s the updated spreadsheet.",
    date: "2025-08-08 22:41"
  },
  {
    conversationId: 18,
    name: "Rachel",
    numberOfMessages: 3,
    messagePreview: "I’ll call you in the morning.",
    date: "2025-08-08 10:29"
  },
  {
    conversationId: 19,
    name: "Sam",
    numberOfMessages: 1,
    messagePreview: "Congrats on the promotion!",
    date: "2025-08-07 17:52"
  },
  {
    conversationId: 20,
    name: "Tina",
    numberOfMessages: 5,
    messagePreview: "Let’s grab lunch this weekend.",
    date: "2025-08-07 12:18"
  }
    ]
}
];
    }

    getMessagesByFolderName(folder, pageNumber) {
      const methodName = "get" + folder + "Messages";
      if(typeof this[methodName] === 'function') {
        this[methodName](pageNumber);
      }
    }

    getMessages(pageNumber) {
      return this._messages.find(paginator => paginator.pageNumber === pageNumber) || null;
    }

    getSentMessages(pageNumber) {
      return this._messages.find(paginator => paginator.pageNumber === pageNumber) || null;      
    }

    getTrashMessages(pageNumber) {
      return this._messages.find(paginator => paginator.pageNumber === pageNumber) || null;
    }

    getArchiveMessages(pageNumber) {
      return this._messages.find(paginator => paginator.pageNumber === pageNumber) || null;
    }

    getSpamMessages(pageNumber) {
      return this._messages.find(paginator => paginator.pageNumber === pageNumber) || null;
    }


}





