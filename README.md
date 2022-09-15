
## data.contestants[contestantId].title can be actually an HTML string, for example a link

contestants: {
        a: {
            title: '<a href="http://google.com" style="text-decoration: none">link to google</a>',
            .....
        }
}


# wrapper

It's recommended to provide __fixed height__ for your wrapper.  
If not, easy-playoffs will take as much height as necessary to display all matches.  
But it may have a negative side effect: the actual height will start changing on navigation  
(because by default easy-playoffs tries to reduce the height according to which rounds are visible. Thus it plays better with not-so-tall wrappers).  
If you still want to have an __auto height__, it's recommended to switch '__useClassicalLayout__' option to true. This will ensure that the height will remain stable on navigation



# Highlight contestants's matches

## on click

When you click on a side of match, by default it will "highlight" all matches where such contestant was a side.  
"Highlighted" means that connection lines of such a match attain a color of options.highlightedConnectionLinesColor (**** by default)  
And player titles of a highlighted contesant will attain a color of ****

Matches will be unhighlighted if you click something other than match side.

Highlight on click will not work if options.onMatchClick or options.onMatchSideClick is provided


## highlightContestantHistory

Accepts one argument: **contestantId** which can be a string or null

When called with a valid contestantId (for which a side is found in data.matches), it will highlight such contestant's matches.

When called with null, it will unhighlight what was highlighted before

When called with something else, will do nothing

If called with a valid contestantId, it will highlight matches *even if options.onMatchClick or options.onMatchSideClick is provided*


# Data

## rounds

## matches

### * sides

**title**: rendered IF there is NO contestantId  
*(because if there IS a contestantId, a title is expected to be found in contestants[contestantId].players[i].title)*

## contestants

### entryStatus:
    Optional.
    this value will be passed to "getEntryStatusHTML" function that you can provide in options.
    (If you provide just this value and NO "getEntryStatusHTML", this value will be rendered as such. Though mind the width of an entry status. If you provide just a text like 'LL' or '14', it will cause horizontal misalignment withing a match element. Thus it's recommended to provide an HTML with an explicit width. Storing HTML in a data doesn't seem reasonable so "getEntryStatusHTML" is given to you to transform entryStatus data to HTML. getEntryStatusHTML's ?th argument will be the entryStatus of a current player)
### nationality:
    Optional.
    (same rules as for entry status)




# Options

## getNationalityHTML
&nbsp;&nbsp;&nbsp;    <sup>function</sup>

The **getNationalityHTML** option allows you to inject any HTML (or simply text) into the "nationality" section of a player (second column from the left, if "Entry status" field is also displayed).  
This function will be called for every player in a tournament.

### Parameters

`nationality`  

Any value that you provided as "nationality" for a current player (`contestants[id].players[i].nationality`). Can be undefined if you didn't provide "nationality" for a current player.

`context`

Object that tells you where nationality is rendered.  
Contatins following properties:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; roundIndex (number)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; matchOrder (number)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; contestantId (string)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; playerIndex (number)

`data`

All data that you provided to easy-playoffs

### Return value

String

It will be injected as innerHTML into the ".nationality" column of each player.

This string may contain any text but HTML markup is advisable.

It non-string value will be returned, it will be ignored and the ".nationality" column will be filled with bare data.contestants[id].players[i].nationality (if present).

### Considerations

`Issue of width`

It's highly recommended that you always return HTML with explicit (and **equal** for each side) width AND height.  Especially if you mean to inject images.  
Ideally width and height should be set inline: `<img style="width: 40px; height:30px;" src="some_url">`

`If this function is not provided`

Then bare "nationality" from a current player's data will be used (`contestants[id].players[i].nationality`). If there is no such data for a player, then nationality field will not be visible.

`Use the "second column" for anything you want`

If no "nationality" in data, getNationalityHTML will be called for every player anyway. You don't have to provide nationality for each or any player.  
You can use the nationality field however you want.  
You can use getNationalityHTML as just a way to _inject something into the 2nd field from the left_.  
What you inject can be an avatar of a player for instance.

`getNationalityHTML will not be updated if a new getNationalityHTML is passed to **applyNewOptions**`





## getEntryStatusHTML
&nbsp;&nbsp;&nbsp;    <sup>function</sup>

The **getEntryStatusHTML** option allows you to inject any HTML (or simply text) into the "entry status" section of a player (leftmost column within a match element).  
This function will be called for every side of every match in a tournament.

### Parameters

`entryStatus`  

Any value that you provided as "entryStatus" for a current contestant (`contestants[id].entryStatus`). Can be undefined if you didn't provide "entryStatus" for a current contestant.

`context`

Object that tells you where entry status is rendered.  
Contatins following properties:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; roundIndex (number)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; matchOrder (number)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; contestantId (string)  

`data`

All data that you provided to easy-playoffs

### Return value

String

It will be injected as innerHTML into the ".entry-status" column of each side.

This string may contain any text but HTML markup is advisable.

It non-string value will be returned, it will be ignored and the ".entry-status" column will be filled with bare data.contestants[id].entryStatus (if present).

### Considerations

`Issue of width`

It's highly recommended that you always return HTML with explicit (and **equal** for each side) width AND height.  Especially if you mean to inject images.  
Ideally width and height should be set inline: `<img style="width: 40px; height:30px;" src="some_url">`

`If this function is not provided`

Then bare "entryStatus" from a current player's data will be used (`contestants[id].entryStatus`). If there is no such data for a contestant, then ".entry-status" column will not be visible.

`Use the "first column" for anything you want`

If no "entryStatus" in data, getEntryStatusHTML will be called for every side anyway. You don't have to provide entryStatus for each or any contestant.  
You can use the first column however you want.  
You can use getEntryStatusHTML as just a way to _inject something into the leftmost column_.  

`getEntryStatusHTML will not be updated if a new getEntryStatusHTML is passed to **applyNewOptions**`



## getMatchElement
&nbsp;&nbsp;&nbsp;    <sup>function</sup>

Should return an Element or undefined

### notes on sizes
    Please set explicit width and height to your images and other content which may change its size afterwards.


## displayWholeRounds
&nbsp;&nbsp;&nbsp;    <sup>boolean</sup>

If true, widths of rounds will be adjusted in order to hide the partly visible round on the right.  
By default it's false (thus you will likely see only a fraction of round on the right).  
When this option is true, mind that rounds (and matches too) will become wider - and in some cases it may be too wide. To prevent this use __matchMaxWidth__ option


## useClassicalLayout
&nbsp;&nbsp;&nbsp;    <sup>boolean</sup>

'True' means that vertical space taken by one match will be doubled for every next round.  
In contrast, default behaviour (with useClassical layout set to **false**) means that this vertical space will be reduced to the smallest possible value for a given navigation state (if you scrolled 2 rounds to the right, then the 3rd round will become "the base round" with a smallest possible height)
(images are desirable)
