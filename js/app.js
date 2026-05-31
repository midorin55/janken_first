$(function () {

  let hands = ["狐", "鉄砲", "庄屋"];

  let enemyHand = "";
  let combo = 0;
  let maxCombo = 0;
  let hp = 3;

  $("#startBtn").on("click", function () {
    startGame();
  });

  $("#restartBtn").on("click", function () {
    startGame();
  });

  $(".handBtn").on("click", function () {
    let playerHand = $(this).data("hand");

    let randomNum = Math.floor(Math.random() * hands.length);
    enemyHand = hands[randomNum];

    $("#enemyHand").text(enemyHand);

    judge(playerHand, enemyHand);

    if (hp <= 0) {
      gameOver();
    }
  });

  function startGame() {
    combo = 0;
    maxCombo = 0;
    hp = 3;

    $("#combo").text(combo);
    $("#hp").text(hp);
    $("#enemyHand").text("？");
    $("#result").text("いざ、勝負！");

    $("#startBtn").hide();
    $(".game-over").hide();
    $(".game").show();
  }

  function judge(player, enemy) {
    if (player === enemy) {
      $("#result").text("あいこでござる！");
      combo = 0;
    } else if (
      player === "狐" && enemy === "庄屋" ||
      player === "庄屋" && enemy === "鉄砲" ||
      player === "鉄砲" && enemy === "狐"
    ) {
      $("#result").text("勝ちでござる！");
      combo += 1;

      if (combo > maxCombo) {
        maxCombo = combo;
      }
    } else {
      $("#result").text("負けでござる…");
      hp -= 1;
      combo = 0;
    }

    $("#combo").text(combo);
    $("#hp").text(hp);
  }

  function gameOver() {
    $(".game").hide();
    $(".game-over").show();

    let rank = "";

    if (maxCombo >= 5) {
      rank = "東八拳の達人";
    } else if (maxCombo >= 3) {
      rank = "江戸の遊び人";
    } else {
      rank = "見習い拳士";
    }

    $("#rank").text(rank);
    $("#startBtn").show();
  }

});