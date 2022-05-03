## data.teams[team_id].title can be actually an HTML string, for example a link

teams: {
        a: {
            title: '<a href="http://google.com" style="text-decoration: none">link to google</a>',
            .....
        }
}



## match.sides[index].result can be any string including html
### if it's an <img>, please set its style.width

match: {
    ...,
    sides: [
        ...,
        { result: '<img src="/champion.jpg" style="width: 50px;" />' }
    ]
}