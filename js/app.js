// Enemies our player must avoid
var Enemy = function(column, row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // NOTE: The "- 20" on 'y' values helps center bug vertically in row
    this.x = 101 * column;
    this.y = 83 * row - 20;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Every enemy moves at some multiple (speed) of standard speed
    this.x += dt * 50 * this.speed;

    // Check for collision with Player
    this.checkCollision();

    // When enemy reaches right edge, start it just off screen to
    // the left for a smoother transition bringing it back on screen
    if (this.x > 101 * 5) {
        this.x = -100;
    }
};

Enemy.prototype.checkCollision = function() {
    // Check for collision with Player
    // Since Enemy is drawn 10px higher than Player, adjust 'y'
    if (this.y === player.y - 10) {
        // Enemy is on same row as Player
        // Since Enemy can move many pixels each 'dt', check range
        if (this.x > player.x - 50 && this.x < player.x + 50) {
            // Collision! React and reset Player position
            player.reset();

            // Also deduct 20 points from score
            score.modifyScore(-20);
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Gems that player wants
var Gem = function(column, row, speed, color) {
    // Gems are a subclass of  Enemy
    Enemy.call(this, column, row, speed);

    // Provided color selects gem image; default is Rock
    if (color === 'blue') {
        this.sprite = 'images/Gem Blue.png';
    } else if (color === 'green') {
        this.sprite = 'images/Gem Green.png';
    } else if (color === 'orange') {
        this.sprite = 'images/Gem Orange.png';
    } else {
        this.sprite = 'images/Rock.png';
    }

    // Cache the current sprite image setting for later
    this.oldSprite = this.sprite;
};

// Make sure Gem derives from Enemy
Gem.prototype = Object.create(Enemy.prototype);

// But also make sure Gem knows its own actual constructor
Gem.prototype.constructor = Gem;

// Gem will behave differently than Enemy in collision with Player
Gem.prototype.checkCollision = function() {
    // Check for collision with Player
    // Since Gem is drawn 10px higher than Player, adjust 'y'
    if (this.y === player.y - 10) {
        // Gem is on same row as Player
        // Since Gem can move many pixels each 'dt', check range
        if (this.x > player.x - 50 && this.x < player.x + 50) {
            // Check if this is start of collision
            if (this.sprite != 'images/Star.png') {
                // Add 10 points to score
                score.modifyScore(10);

                // Change sprite when Gem collides with Player
                this.sprite = 'images/Star.png';
            }
        }
    }
};

Gem.prototype.reset = function() {
    // Reset sprite image for Gem
    this.sprite = this.oldSprite;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(column, row) {
    // NOTE: The "- 10" on 'y' values centers player vertically in row
    this.x = 101 * column;
    this.y = 83 * row - 10;

    // Select image for Player
    this.sprite = 'images/char-boy.png';

    this.showSuccess = 0;
};

Player.prototype.update = function(dt) {
    // If Player reached water, hold changed sprite for a while
    if (this.showSuccess > 20) {
        // Visual display of Success done - reset Player
        this.reset();
    }
};

Player.prototype.render = function() {
    // Redraw Player image
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // If Player reached water, showing success for a few ticks
    if (this.y < 0) {
        this.showSuccess++;
    }
};

Player.prototype.handleInput = function(keyName) {
    // Check for an expected key and move Player
    if (keyName === 'up') {
        // Move up by one square
        this.y -= 83;

        if (this.y < 0) {
            // If this just happened, handle reaching water row
            // Note: Enemy collision method handles player reset
            if (this.showSuccess === 0) {
                // Temporarily replace character sprite with
                // star image so user knows they succeeded!
                this.sprite = 'images/Star.png';

                // Add 50 points to score for reaching the water
                score.modifyScore(50);
            }
        }
    } else if (keyName === 'down') {
        // Move down by one square
        this.y += 83;

        // Can't move past bottom edge of game area
        if (this.y > 83 * 5 - 10) {
            this.y = 83 * 5 - 10;
        }
    } else if (keyName === 'left') {
        // Move left by one square
        this.x -= 101;

        // Can't move past left edge of game area
        if (this.x < 0) {
            this.x = 0;
        }
    } else if (keyName === 'right') {
        // Move right by one square
        this.x += 101;

        // Can't move past right edge of game area
        if (this.x > 101 * 4) {
            this.x = 101 * 4;
        }
    }
};

Player.prototype.reset = function() {
    // Move player back to 3rd column and bottom row of play area
    this.y = 101 * 2;
    this.y = 83 * 5 - 10;

    // Make sure we are back to normal Player image
    this.sprite = 'images/char-boy.png';

    this.showSuccess = 0; // start over

    // Reset Gems to use their original sprite images
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i] instanceof Gem) {
            allEnemies[i].reset();
        }
    }
};

// Create a Score object for keeping track of points and displaying
var Score = function() {
    // Start with a score of 0
    this.score = 0;

    // Center score display horizontally and put it
    // at top, just above the play area
    this.x = 101 * 2.5;
    this.y = 30;
};

// Update the score object
// Parameter: dt, a time delta between ticks
Score.prototype.update = function(dt) {
    // For now, let other events update score value
    // The render method will update score display
};

Score.prototype.render = function() {
    // Erase old Score and draw updated Score on screen
    ctx.clearRect(0, 0, 505, 50);
    ctx.fillText(this.score, this.x, this.y);
    ctx.strokeText(this.score, this.x, this.y);
};

Score.prototype.modifyScore = function(change) {
    // 'change' should be positive to increase score
    // and negative to decrease the score
    this.score += change;
    if (this.score < 0) {
        this.score = 0; // score can never be less than 0
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Start this Enemy in 1st column, 2nd row, standard speed times 4
allEnemies.push(new Enemy(0, 1, 4));

// Start this Enemy in 4th column, 3rd row, standard speed times 2
allEnemies.push(new Enemy(3, 2, 2));

// Start this Enemy in 2nd column, 4th row, standard speed times 3
allEnemies.push(new Enemy(1, 3, 3));

// Also add Gems to allEnemies
allEnemies.push(new Gem(3, 1, 4, 'blue'));
allEnemies.push(new Gem(0, 2, 2, 'orange'));
allEnemies.push(new Gem(4, 3, 3, 'green'));

// Place the player object in a variable called player
// Start player in 3rd column, 6th row (bottom)
var player = new Player(2, 5);

// The score object holds the current score and displays it
// Other events, such as collisions, will update the score
var score = new Score();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
