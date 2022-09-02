
## data.contestants[contestant_id].title can be actually an HTML string, for example a link

contestants: {
        a: {
            title: '<a href="http://google.com" style="text-decoration: none">link to google</a>',
            .....
        }
}



# Highlight contestants's matches

## on click

When you click on a side of match, by default it will "highlight" all matches where such contestant was a side.  
"Highlighted" means that connection lines of such a match attain a color of options.highlightedConnectionLinesColor (**** by default)  
And player titles of a highlighted contesant will attain a color of ****

Matches will be unhighlighted if you click something other than match side.

Highlight on click will not work if options.onMatchClick or options.onMatchSideClick is provided


## highlightContestantHistory

Accepts one argument: **contestant_id** which can be a string or null

When called with a valid contestant_id (for which a side is found in data.matches), it will highlight such contestant's matches.

When called with null, it will unhighlight what was highlighted before

When called with something else, will do nothing

If called with a valid contestant_id, it will highlight matches *even if options.onMatchClick or options.onMatchSideClick is provided*


# Data

## rounds

## matches

### * sides

**title**: rendered IF there is NO contestant_id  
*(because if there IS a contestant_id, a title is expected to be found in contestants[contestant_id].players[i].title)*

## contestants

### entry_status:
    Optional.
    this value will be passed to "getEntryStatusHTML" function that you can provide in options.
    (If you provide just this value and NO "getEntryStatusHTML", this value will be rendered as such. Though mind the width of an entry_status. If you provide just a text like 'LL' or '14', it will cause horizontal misalignment withing a match element. Thus it's recommended to provide an HTML with an explicit width. Storing HTML in a data doesn't seem reasonable so "getEntryStatusHTML" is given to you to transform entry_status data to HTML. getEntryStatusHTML's ?th argument will be the entry_status of a current player)
### nationality:
    Optional.
    (same rules as for entry status)




# Options

## getNationalityHTML()

The **getNationalityHTML** option allows you to inject any HTML into the "nationality" section of a player (second column from the left, if "Entry status" field is also displayed).  
This function will be called for every player in a tournament.

### Parameters

`nationality`  

Any value that you provided as "nationality" for a current player (`contestants[i].players[j].nationality`). Can be undefined if you didn't provide "nationality" for a current player.

`context`

Object that tells you where nationality is rendered.  
Contatins following properties:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; matchId (string)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; contestantId (string)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; playerIndex (number)

`data`

All data that you provided to easy-playoffs

### Return value

String

It will be injected as innerHTML into the nationality element of each player.

This string may contain any text but HTML markup is advisable.

It non-string value will be returned, it will be ignored and "nationality" from player's data will be used instead.

### Considerations

`Issue of width`

We recommend that you always return an element with explicit (and **equal** for each player) width.  
This will help with horizontal alignment within match element.

`If this function is not provided`

Then bare "nationality" from a current player's data will be used (`contestants[i].players[j].nationality`). If there is no such data for a player, then nationality field will not be visible.

`Use the "second column" for anything you want`

If no "nationality" in data, getNationalityHTML will be called for every player anyway. You don't have to provide nationality for each or any player.  
You can use the nationality field however you want.  
You can use getNationalityHTML as just a way to _inject something into the 2nd field from the left_.  
What you inject can be an avatar of a player for instance.

`getNationalityHTML will be ignored when passed to **applyNewOptions**`