export class UserService {
    constructor() {
        this._users = [
      {
        pageNumber:0,
        pageSize:10,
        totalPages:2,
        totalElements:20,
        content: [
          {"username":"LunaSky","avatar":"🌙","status":"Available","country":"France","city":"Paris","nativeLanguage":"French","timeZone":"CET","joinedDate":"2023-01-15","onlineStatus":"online","interests":["Reading","Music","Hiking"],"gender":"feminine"},
          {"username":"TechWizard","avatar":"🧙‍♂️","status":"Coding all day","country":"USA","city":"San Francisco","nativeLanguage":"English","timeZone":"PST","joinedDate":"2022-08-02","onlineStatus":"offline","interests":["Programming","Gaming","Chess"],"gender":"masculine"},
          {"username":"CoffeeAddict","avatar":"☕","status":"Coffee lover ☕","country":"USA","city":"Seattle","nativeLanguage":"English","timeZone":"PST","joinedDate":"2021-11-20","onlineStatus":"last seen at 09:15","interests":["Coffee tasting","Traveling","Photography"],"gender":"other"},
          {"username":"PixelArtist","avatar":"🎨","status":"Creating pixel art","country":"Germany","city":"Berlin","nativeLanguage":"German","timeZone":"CET","joinedDate":"2022-05-13","onlineStatus":"online","interests":["Art","Games","Anime"],"gender":"feminine"},
          {"username":"Wanderlust","avatar":"✈️","status":"Exploring the world","country":"Japan","city":"Tokyo","nativeLanguage":"Japanese","timeZone":"JST","joinedDate":"2023-03-21","onlineStatus":"offline","interests":["Traveling","Photography","Cooking"],"gender":"masculine"},
          {"username":"MusicLover","avatar":"🎵","status":"Always listening","country":"UK","city":"London","nativeLanguage":"English","timeZone":"GMT","joinedDate":"2020-07-10","onlineStatus":"online","interests":["Music","Concerts","Instruments"],"gender":"feminine"},
          {"username":"Bookworm99","avatar":"📚","status":"Lost in a book","country":"Canada","city":"Toronto","nativeLanguage":"English","timeZone":"EST","joinedDate":"2021-12-05","onlineStatus":"last seen at 14:40","interests":["Reading","Writing","History"],"gender":"other"},
          {"username":"GamerX","avatar":"🎮","status":"Leveling up","country":"South Korea","city":"Seoul","nativeLanguage":"Korean","timeZone":"KST","joinedDate":"2022-09-11","onlineStatus":"online","interests":["Gaming","Streaming","Tech"],"gender":"masculine"},
          {"username":"ChefExtraordinaire","avatar":"👩‍🍳","status":"Cooking up magic","country":"Italy","city":"Rome","nativeLanguage":"Italian","timeZone":"CET","joinedDate":"2020-03-28","onlineStatus":"offline","interests":["Cooking","Baking","Food Photography"],"gender":"feminine"},
          {"username":"NightOwl","avatar":"🦉","status":"Up all night","country":"Australia","city":"Sydney","nativeLanguage":"English","timeZone":"AEST","joinedDate":"2021-06-18","onlineStatus":"last seen at 23:50","interests":["Gaming","Coding","Movies"],"gender":"other"},
        ]    
      },
      {
        pageNumber:0,
        pageSize:10,
        totalPages:2,
        totalElements:20,
        content: [
          {"username":"NatureSeeker","avatar":"🌿","status":"Hiking today","country":"Canada","city":"Vancouver","nativeLanguage":"English","timeZone":"PST","joinedDate":"2023-02-14","onlineStatus":"online","interests":["Hiking","Camping","Photography"],"gender":"feminine"},
          {"username":"AnimeFan","avatar":"🗾","status":"Watching anime","country":"Japan","city":"Osaka","nativeLanguage":"Japanese","timeZone":"JST","joinedDate":"2022-12-01","onlineStatus":"offline","interests":["Anime","Manga","Cosplay"],"gender":"masculine"},
          {"username":"FitnessFreak","avatar":"🏋️","status":"Gym time!","country":"USA","city":"Los Angeles","nativeLanguage":"English","timeZone":"PST","joinedDate":"2021-04-07","onlineStatus":"online","interests":["Fitness","Nutrition","Yoga"],"gender":"feminine"},
          {"username":"TravelBug","avatar":"🐞","status":"Next destination: Bali","country":"Spain","city":"Madrid","nativeLanguage":"Spanish","timeZone":"CET","joinedDate":"2020-10-19","onlineStatus":"offline","interests":["Traveling","Culture","Photography"],"gender":"masculine"},
          {"username":"QuietThinker","avatar":"🤔","status":"Lost in thoughts","country":"Ireland","city":"Dublin","nativeLanguage":"English","timeZone":"GMT","joinedDate":"2021-09-09","onlineStatus":"last seen at 11:25","interests":["Philosophy","Writing","Chess"],"gender":"other"},
          {"username":"SunnyDay","avatar":"☀️","status":"Feeling happy","country":"Portugal","city":"Lisbon","nativeLanguage":"Portuguese","timeZone":"WEST","joinedDate":"2022-03-22","onlineStatus":"online","interests":["Sunbathing","Traveling","Photography"],"gender":"feminine"},
          {"username":"CodeNinja","avatar":"🥷","status":"Debugging","country":"India","city":"Bangalore","nativeLanguage":"Hindi","timeZone":"IST","joinedDate":"2023-01-05","onlineStatus":"offline","interests":["Programming","Gaming","Tech"],"gender":"masculine"},
          {"username":"Dreamer","avatar":"💭","status":"Thinking big","country":"Netherlands","city":"Amsterdam","nativeLanguage":"Dutch","timeZone":"CET","joinedDate":"2021-08-30","onlineStatus":"online","interests":["Writing","Traveling","Photography"],"gender":"other"},
          {"username":"StarGazer","avatar":"🌌","status":"Watching the stars","country":"South Africa","city":"Cape Town","nativeLanguage":"English","timeZone":"SAST","joinedDate":"2020-11-12","onlineStatus":"offline","interests":["Astronomy","Photography","Hiking"],"gender":"feminine"},
          {"username":"HappyFeet","avatar":"🕺","status":"Dancing all night","country":"Brazil","city":"Rio de Janeiro","nativeLanguage":"Portuguese","timeZone":"BRT","joinedDate":"2022-06-16","onlineStatus":"online","interests":["Dancing","Music","Traveling"],"gender":"masculine"},
        ]    
      },
      {
        pageNumber:1,
        pageSize:10,
        totalPages:2,
        totalElements:20,
        content: [
          {"username":"MovieBuff","avatar":"🍿","status":"Watching classics","country":"USA","city":"New York","nativeLanguage":"English","timeZone":"EST","joinedDate":"2021-01-25","onlineStatus":"last seen at 20:30","interests":["Movies","Cinema","Writing"],"gender":"other"},
          {"username":"EcoWarrior","avatar":"🌱","status":"Saving the planet","country":"Norway","city":"Oslo","nativeLanguage":"Norwegian","timeZone":"CET","joinedDate":"2023-02-28","onlineStatus":"online","interests":["Environment","Hiking","Photography"],"gender":"feminine"},
          {"username":"SportsFanatic","avatar":"⚽","status":"Watching the game","country":"Spain","city":"Barcelona","nativeLanguage":"Spanish","timeZone":"CET","joinedDate":"2020-09-14","onlineStatus":"offline","interests":["Football","Basketball","Tennis"],"gender":"masculine"},
          {"username":"MindfulSoul","avatar":"🧘","status":"Meditating","country":"Nepal","city":"Kathmandu","nativeLanguage":"Nepali","timeZone":"NPT","joinedDate":"2022-10-05","onlineStatus":"online","interests":["Meditation","Yoga","Reading"],"gender":"other"},
          {"username":"CoderGirl","avatar":"💻","status":"Building apps","country":"Sweden","city":"Stockholm","nativeLanguage":"Swedish","timeZone":"CET","joinedDate":"2021-05-18","onlineStatus":"offline","interests":["Programming","Gaming","Tech"],"gender":"feminine"},
          {"username":"Adventurer","avatar":"🗺️","status":"Looking for adventure","country":"New Zealand","city":"Auckland","nativeLanguage":"English","timeZone":"NZST","joinedDate":"2022-01-11","onlineStatus":"online","interests":["Traveling","Hiking","Photography"],"gender":"masculine"},
          {"username":"QuietReader","avatar":"📖","status":"Reading quietly","country":"Austria","city":"Vienna","nativeLanguage":"German","timeZone":"CET","joinedDate":"2020-04-20","onlineStatus":"offline","interests":["Reading","History","Writing"],"gender":"other"},
          {"username":"TechGuru","avatar":"🤖","status":"Tech is life","country":"Singapore","city":"Singapore","nativeLanguage":"English","timeZone":"SGT","joinedDate":"2021-07-09","onlineStatus":"online","interests":["Technology","AI","Gaming"],"gender":"masculine"},
          {"username":"ArtisticSoul","avatar":"🖌️","status":"Creating art","country":"Italy","city":"Florence","nativeLanguage":"Italian","timeZone":"CET","joinedDate":"2023-04-01","onlineStatus":"offline","interests":["Art","Painting","Photography"],"gender":"feminine"},
          {"username":"HappyCamper","avatar":"🏕️","status":"Out in nature","country":"USA","city":"Denver","nativeLanguage":"English","timeZone":"MST","joinedDate":"2022-08-22","onlineStatus":"online","interests":["Camping","Hiking","Fishing"],"gender":"other"},   
        ]    
      },
        ];
    }

    getUsersByFilters() {
      
    }

    getUsers(numberPage) {
      return this._users.find(paginator => paginator.pageNumber === numberPage) || null;
    }

}