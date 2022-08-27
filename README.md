
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

### entry_status: can be HTML
### nationality_code: can be HTML