class Game {
  constructor() {
    this.resetTitle = createElement("h2");
     this.resetButton = createButton("");
  }
  //BP
  getState() {
    var gameStateRef = database.ref("GameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  //BP
  update(state) {
    database.ref("/").update({
      GameState: state
    });
  }

  // TA
  start() {
  player = new Player();
  playerCount = player.getCount();
    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 300);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }


  //BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html("Reset Game");
     this.resetTitle.class("resetText");
      this.resetTitle.position(width / 2 + 200, 40);
       this.resetButton.class("resetButton");
        this.resetButton.position(width / 2 + 230, 100);
  }
  handleResetButton() {
     this.resetButton.mousePressed(() => {
       database.ref("/").set({
         PlayerCount: 0,
         GameState: 0,
         players: {}
         });
          window.location.reload();
         }); 
        }
  //SA
  play() {
    this.handleElements();
    this.handleResetButton();
    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index].position.x = x;
        cars[index].position.y = y;

        //add 1 to the index for every loop
        index = index + 1;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
        }
      }

      // handling keyboard events
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }


 
      drawSprites();
    }

  }
}

