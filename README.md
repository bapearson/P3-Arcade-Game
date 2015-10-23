frontend-nanodegree-arcade-game
===============================

Welcome to the Arcade!

Loading the Game
================

To load the game, open the index.html file in your browser.
Note that all associated folders (css, images, js) and files
must also be copied with index.html for the game to work.

Object of the Game
==================

The object of the game is to gain points by collecting gems and
getting to the top water row while avoiding collisions with bugs.
There are no time limits, so you can play for as long as you want!

Playing the Game
================

Move your player around the game board by using the arrow keys:
- 'up arrow' moves your player up one square
- 'down arrow' moves your player down one square
- 'right arrow' moves your player right one square
- 'left arrow' moves your player left one square

The player cannot 'wrap around' - for instance, you cannot move
left from the far left squares to get to the far right edge.

Bug characters are the enemy. They are constantly in motion from
left to right, and as they disappear off the right edge of the
screen they will reappear on the left edge.
Colliding with a bug will reduce your score and move your player
back to the beginning square at the bottom of the game area.

Gems are a source of points, so do collide with those!
There are 3 gems, one moving in each row with the bugs.
You can gain points from these on each attempt to reach water.
Once you have 'collected' a gem, you cannot collect more points
from that same gem until you either reach the water and start again
or until you have collided with a bug and moved back to the bottom.
If it appears as a gem, you can collect points by colliding with it.
If it appears as a star, nothing happens when you collide with it.

Scoring
=======
+50 each time you reach the water
+10 each time you collide with a gem
-20 each time you collide with a bug

Just to be nice, we'll never let your score fall below zero. Enjoy!
