import { Song } from '../../app/song.model';

export const AMERICANSONGS: Song[] = [
  {
    id: 1,
    isFavorited: true,
    isLyricsShown: false,
    img: "data:image/jpeg;base64,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",
    title: "Robbers",
    artist: "The 1975",
    album: "The 1975",
    date: "2014",
    //#region lyrics
    lyrics: `
    She had a face straight out a magazine
    God only knows but you'll never leave her
    Her balaclava is starting to chafe
    When she gets his gun, he's begging, 'Babe stay, stay'

    'I'll give you one more time
    We'll give you one more fight
    Said one more line
    Will I know you?'

    Now if you never shoot, you'll never know
    And if you never eat, you'll never grow
    You've got a pretty kind of dirty face
    And when she's leaving your home
    She's begging you to stay stay, stay, stay, stay

    'I'll give you one more time
    We'll give you one more fight
    Said one more line
    There'll be a riot, 'cause I know you'

    Well now that you've got your gun
    It's much harder now the police have come
    And I'll shoot him if it's what you ask
    But if you just take off your mask
    You'd find out everything's gone wrong
    Now everybody's dead
    And they're driving past my old school
    And he's got his gun, he's got his suit on
    She says, 'Babe, you look so cool'

    You look so cool
    You look so cool, cool, cool, cool
    You look so cool, you look so cool
    You look so cool, cool, cool, cool, cool
    Cause I know you
    
    `,
    //#endregion
    chords: "v",
    tags: ["alternative rock", "indie pop", "emo"]
  },
  {
    id: 2,
    isFavorited: false,
    isLyricsShown: false,
    img: "https://images-na.ssl-images-amazon.com/images/I/51gLKP8Rq3L._SY355_.jpg",
    title: "Heart Like Yours",
    artist: "Willamette Stone",
    album: "If I Stay OST",
    date: "2015",
    //#region lyrics
    lyrics: `
    Breathe deep, breathe clear
    Know that I'm here
    Know that I'm here
    Waitin'

    Stay strong, stay gold
    You don't have to fear
    You don't have to fear
    Waitin'

    I'll see you soon
    I'll see you soon

    How could a heart like yours
    Ever love a heart like mine?
    How could I live before?
    How could I have been so blind?

    You opened up my eyes
    You opened up my eyes

    Sleep sound, sleep tight
    Here in my mind
    Here in my mind
    Waitin'

    Come close, my dear
    You don't have to fear
    You don't have to fear
    Waitin'

    I'll see you soon
    I'll see you soon

    How could a heart like yours
    Ever love a heart like mine?
    How could I live before?
    How could I have been so blind?

    You opened up my eyes
    You opened up my eyes

    Hold fast hope
    All your love is all I've ever known

    Hold fast hope
    All your love is all I've ever known


    How could a heart like yours
    Ever love a heart like mine?
    How could I live before?
    How could I have been so blind?

    You opened up my eyes
    You opened up my eyes

    You opened up my eyes
    You opened up my eyes
    
    `,
    //#endregion
    chords: "v",
    tags: ["pop rock", "ost", "movie"]
  },
  {
    id: 3,
    isFavorited: false,
    isLyricsShown: false,
    img: "http://dalelyles.com/musicmp3s/no_cover.jpg",
    title: "Sample",
    artist: "Sample",
    album: "Sample",
    date: "2018",
    //#region lyrics
    lyrics: `
    `,
    //#endregion
    chords: "v",
    tags: ["sample"]
  }
];
