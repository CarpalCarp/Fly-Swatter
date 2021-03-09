import { Movements } from '../movement/Movement';
import { Wasp } from './../enemies/Wasp';
import { RedEyeSmall } from './../enemies/RedEyeSmall';
import { Component, HostListener, OnInit } from '@angular/core';
import { BlueFly } from '../enemies/blueFly';
import { Bug } from '../enemies/Bug';
import { SmallFly } from '../enemies/SmallFly';
import { Bomb } from '../enemies/Bomb';
import { Swarm } from '../enemies/Swarm';

@Component({
  selector: 'swatter',
  templateUrl: './swatter.component.html',
  styleUrls: ['./swatter.component.css']
})
export class SwatterComponent implements OnInit {
  public swatSound;
  public blueFlies: Bug[] = [];
  public smallFlies: Bug[] = [];
  public redEyeSmallFlies: Bug[] = [];
  public wasps: Bug[] = [];
  public bombs: Bug[] = [];
  public swarms: Bug[] = [];
  public bugTypes: Object[] = [{ value: "random", name: "Random" }, { value: "blueFly", name: "Blue Fly" }, { value: "smallFly", name: "Small Fly" }, { value: "redEyeSmall", name: "Red Eye Fly" }, { value: "wasp", name: "Wasp" }, { value: "bomb", name: "Bomb" }, { value: "swarm", name: "Swarm" }];
  public fliesPerWave: number[] = [5, 10, 15, 20];
  public sizes: Object[] = [{ value: 1, name: "Small" }, { value: 1.5, name: "Medium" }, { value: 2, name: "Large" }];
  private animationIntervalIds: any[] = [];
  private startingPositions: number[] = [-100, 1600]; // holds starting positions for which side of the screen to appear
  public left: string;
  public top: string;
  public playerOw = new Audio("assets/sounds/Ugh.mp3");
  public music = new Audio("assets/sounds/Level1Music.mp3");
  private beeSound = new Audio("assets/sounds/beeSound.mp3");
  public htmlImgTag: string = "";
  public imageDisplay: string = "default";
  public bossImage: string = "assets/flySwatter/watinga.png";
  public smackType: string = "assets/flySwatter/smack2.png";
  public swatterPng: string = "assets/flySwatter/flySwatter.png";
  public blueFlyIcon: string = "assets/flySwatter/blueFly1.png";
  public smallFlyIcon: string = "assets/flySwatter/smallFly1.png";
  public redEyeSmallIcon: string = "assets/flySwatter/redEyeSmall.png";
  public waspIcon: string = "assets/flySwatter/wasp.png";
  public bombIcon: string = "assets/flySwatter/bomb.png";
  public swarmIcon: string = "assets/flySwatter/swarm.png";
  public bugType: string = "random";
  public yellowSplashDisplay: string = "none";
  private blueFlyIconChange: boolean = true;
  private smallFlyIconChange: boolean = true;
  private redEyeSmallIconChange: boolean = true;
  private waspIconChange: boolean = true;
  private bombIconChange: boolean = true;
  private swarmIconChange: boolean = true;
  private gameStarted: boolean = false;
  public timeAttackIntro: boolean = false;
  public displayGiveUpBtn: boolean = false;
  private flyCount: number = 0;
  public swappedFlies: number = 0;
  public maxFlies: number = 5;
  public flySize: number = 1;
  public splashOpacity: number = 1;
  public disableTimeAttackBtn: boolean = false;
  private maxTime: number = 60;
  public time: number = this.maxTime;
  private bugCreatorInterval: any;
  private timerInterval: any;
  public difficulties: string[] = ["Easy Swap", "Bite Me Plenty", "Nightmare"];
  public difficultySetting: string = "Easy Swap";
  public timeAttackFlyNum: number = 0;
  @HostListener('mousemove', ['$event'])
  handleMousemove(event) {
    this.left = event.pageX + "px";
    this.top = event.pageY + "px";
  }

  constructor() { }

  // start the animations for all the bug types in the game when swatter component gets created
  ngOnInit(): void {
    this.animationIntervalIds.push(this.animateBlueFly("assets/flySwatter/blueFly1.png", "assets/flySwatter/blueFly2.png", 50));
    this.animationIntervalIds.push(this.animateSmallFly("assets/flySwatter/smallFly1.png", "assets/flySwatter/smallFly2.png", 50));
    this.animationIntervalIds.push(this.animateRedEye("assets/flySwatter/redEyeSmall.png", "assets/flySwatter/redEyeSmall2.png", 50));
    this.animationIntervalIds.push(this.animateWasp("assets/flySwatter/wasp.png", "assets/flySwatter/wasp2.png", 50));
    this.animationIntervalIds.push(this.animateBomb("assets/flySwatter/bomb.png", "assets/flySwatter/bomb2.png", 50));
    this.animationIntervalIds.push(this.animateSwarm("assets/flySwatter/swarm.png", "assets/flySwatter/swarm2.png", 50));
  }


  // stop all the animations when the swatter component is destroyed
  ngOnDestroy(): void {
    this.animationIntervalIds.forEach(interval => {
      interval.clearInterval();
    });
  }

  public playMusic() {
    this.music.play();
  }

  public stopMusic() {
    this.music.pause();
    this.music.currentTime = 0;
  }

  public splat() {
    let soundType: string = "emptySwat.wav"; // empty swat
    this.swatterPng = "assets/flySwatter/smack1.png";
    this.checkCollider(this.blueFlies, soundType);
    this.checkCollider(this.smallFlies, soundType);
    this.checkCollider(this.redEyeSmallFlies, soundType);
    this.checkCollider(this.wasps, soundType);
    this.checkCollider(this.bombs, soundType);
    this.checkCollider(this.swarms, soundType);
    setTimeout(() => {
      this.swatterPng = this.smackType;
      this.smackType = "assets/flySwatter/smack2.png";
    }, 20);
    setTimeout(() => {
      this.swatSound = new Audio(`assets/sounds/${soundType}`).play();
      this.swatterPng = "assets/flySwatter/flySwatter.png";
    }, 60);
  }

  private async checkCollider(bugArr: any, soundType: string) {
    if (bugArr.length !== 0) {
      bugArr.forEach(bug => {
        let bugElement = document.querySelector(`#${bug.alt}${bug.id}`);
        if (!bug.hit && this.collides(Number(this.left.replace("px", "")), Number(this.top.replace("px", "")), bugElement, bug.width(), bug.height())) { // bug
          console.log(`Collided with bug id:${bug.id}`);
          soundType = "swat.wav"; // change sound type to swat
          if (bugArr === this.bombs)
            this.swatSound = new Audio("assets/sounds/metalCling.wav").play();
          else if (bugArr === this.swarms)
            this.swatSound = new Audio("assets/sounds/bugSplat2.wav").play();
          else if (bugArr === this.redEyeSmallFlies)
            this.swatSound = new Audio("assets/sounds/bugSplat3.wav").play();
          else if (bugArr === this.wasps)
            this.swatSound = new Audio("assets/sounds/bugSplat4.mp3").play();
          else
            this.swatSound = new Audio("assets/sounds/bugSplat.wav").play();
          this.smackType = "assets/flySwatter/yellowSmack.png";
          this.deadFly(bug);
          bug.hit = true;
          this.swappedFlies++;
        }
      });
    }
  }

  private createBugs({ bugType, maxFlies, timeInterval }: { bugType: string, maxFlies: number, timeInterval: number }) {
    //let intervalId = setInterval(() => {
    this.bugCreatorInterval = setInterval(() => {
      if (bugType === "random")
        this.createRandomBug();
      else
        this.createSpecificBug(bugType);
      if (this.flyCount == maxFlies)
        window.clearInterval(this.bugCreatorInterval);
    }, timeInterval);
  }

  public startGame() {
    if (this.gameStarted === false) {
      this.gameStarted = true;
      this.createBugs({ bugType: this.bugType, maxFlies: this.maxFlies, timeInterval: 500 });
    } else
      this.restartGame();
  }

  public restartGame() {
    this.reset();
    this.createBugs({ bugType: this.bugType, maxFlies: this.maxFlies, timeInterval: 500 });
  }

  public timeAttack() {
    this.setTimeAttackFlyNum();
    this.disableTimeAttackBtn = true;
    this.reset();
    this.timeAttackIntro = true;
    setTimeout(() => {
      this.displayGiveUpBtn = true;
      this.timerInterval = setInterval(() => {
        this.time--;
        if (this.time === -1)
          this.stopTimeAttackMode();
      }, 1000);
      this.maxFlies = 500;
      this.startGame();
    }, 3000);
  }

  public playerGaveUp() {
    this.displayGiveUpBtn = false;
    this.stopTimeAttackMode();
    this.playWatinga();
  }

  private stopTimeAttackMode() {
    window.clearInterval(this.timerInterval);
    this.timeAttackIntro = false;
    this.time = this.maxTime;
    this.checkTimeAttackResults();
  }

  private setTimeAttackFlyNum() {
    if (this.difficultySetting === "Easy Swap") {
      this.timeAttackFlyNum = 20;
      this.flySize = 2;
    }
    else if (this.difficultySetting === "Bite Me Plenty") {
      this.timeAttackFlyNum = 30;
      this.flySize = 1.5;
    }
    else if (this.difficultySetting === "Nightmare") {
      this.timeAttackFlyNum = 40;
      this.flySize = 1;
    }
  }

  private checkTimeAttackResults() {
    if (this.difficultySetting === "Easy Swap" && this.swappedFlies < 20 ||
      this.difficultySetting === "Bite Me Plenty" && this.swappedFlies < 30 ||
      this.difficultySetting === "Nightmare" && this.swappedFlies < 40) {
      this.playWatinga();
    } else {
      this.disableTimeAttackBtn = false;
      this.displayGiveUpBtn = false;
    }
    this.reset();
  }

  private reset() {
    this.flyCount = 0;
    this.swappedFlies = 0;
    this.blueFlies = [];
    this.smallFlies = [];
    this.redEyeSmallFlies = [];
    this.wasps = [];
    this.bombs = [];
    this.swarms = [];
    window.clearInterval(this.bugCreatorInterval);
  }

  public showSwatCursor() {
    this.imageDisplay = "inline";
  }

  public noShow() {
    this.imageDisplay = "none";
  }

  private collides(swatterLeft: number, swatterTop: number, bugElement, width: number, height: number) {
    if ((bugElement !== null && swatterLeft < Math.floor(bugElement.getBoundingClientRect().left) + width) &&
      (bugElement !== null && swatterLeft + (32 * this.flySize) > Math.floor(bugElement.getBoundingClientRect().left)) &&
      (bugElement !== null && swatterTop < Math.floor(bugElement.getBoundingClientRect().top + height)) &&
      (bugElement !== null && swatterTop + (30 * this.flySize) > Math.floor(bugElement.getBoundingClientRect().top))) return true;
    else
      return false;
  }

  public getRandBossImage() {
    let randNum = Math.floor(Math.random() * 7);
    switch (randNum) {
      case 0:
        return "assets/flySwatter/watinga.png";
      case 1:
        return "assets/flySwatter/blueFly1.png";
      case 2:
        return "assets/flySwatter/bomb.png";
      case 3:
        return "assets/flySwatter/redEyeSmall.png";
      case 4:
        return "assets/flySwatter/smallFly1.png";
      case 5:
        return "assets/flySwatter/wasp.png";
      case 6:
        return "assets/flySwatter/swarm.png";
    }
  }

  private animateBlueFly(asset1: string, asset2: string, time: number) {
    let id = setInterval(() => {
      if (this.blueFlyIconChange)
        this.blueFlyIcon = asset2;
      else
        this.blueFlyIcon = asset1;
      this.blueFlyIconChange = !this.blueFlyIconChange; // toggle flag
    }, time);
    return id;
  }

  private animateSmallFly(asset1: string, asset2: string, time: number) {
    let id = setInterval(() => {
      if (this.smallFlyIconChange)
        this.smallFlyIcon = asset2;
      else
        this.smallFlyIcon = asset1;
      this.smallFlyIconChange = !this.smallFlyIconChange; // toggle flag
    }, time);
    return id;
  }

  private animateRedEye(asset1: string, asset2: string, time: number) {
    let id = setInterval(() => {
      if (this.redEyeSmallIconChange)
        this.redEyeSmallIcon = asset2;
      else
        this.redEyeSmallIcon = asset1;
      this.redEyeSmallIconChange = !this.redEyeSmallIconChange; // toggle flag
    }, time);
    return id;
  }

  private animateWasp(asset1: string, asset2: string, time: number) {
    let id = setInterval(() => {
      if (this.waspIconChange)
        this.waspIcon = asset2;
      else
        this.waspIcon = asset1;
      this.waspIconChange = !this.waspIconChange; // toggle flag
    }, time);
    return id;
  }

  private animateBomb(asset1: string, asset2: string, time: number) {
    let id = setInterval(() => {
      if (this.bombIconChange)
        this.bombIcon = asset2;
      else
        this.bombIcon = asset1;
      this.bombIconChange = !this.bombIconChange; // toggle flag
    }, time);
    return id;
  }

  private animateSwarm(asset1: string, asset2: string, time: number) {
    let id = setInterval(() => {
      if (this.swarmIconChange)
        this.swarmIcon = asset2;
      else
        this.swarmIcon = asset1;
      this.swarmIconChange = !this.swarmIconChange; // toggle flag
    }, time);
    return id;
  }

  // Watinga is the boss fly
  public playWatinga() {
    let watingaId = document.querySelector("#watinga");
    let watingaSwatterId = document.querySelector("#watingaSwatter");
    this.displayGiveUpBtn = false;
    this.beeSound.play();
    watingaId.animate([
      { transform: `translateY(0px)` },
      { transform: `translateY(-500px)` },
      { transform: `translateY(500px)` }
    ],
      {
        duration: 5000,
        iterations: 1,
        easing: "cubic-bezier(.01,1.57,.9,-0.77)"
      }
    );
    setTimeout(() => {
      this.swatSound = new Audio(`assets/sounds/bugSplat.wav`).play();
      this.playerOw.play();
      watingaSwatterId.animate([
        { transform: `scale(7, 7)` }
      ],
        {
          duration: 200,
        });
    }, 4600);
    setTimeout(() => {
      this.yellowSplashDisplay = "block";
    }, 4801);
    setTimeout(() => {
      let splashInterval = setInterval(() => {
        if (this.splashOpacity > 0)
          this.splashOpacity -= 0.01;
        else {
          this.yellowSplashDisplay = "none";
          this.splashOpacity = 1;
          window.clearInterval(splashInterval);
          this.disableTimeAttackBtn = false;
        }
      }, 10);
    }, 4802);
  }

  private createSpecificBug(bugType: string) {
    switch (bugType) {
      case "blueFly":
        this.createBlueFly();
        break;
      case "smallFly":
        this.createSmallFly();
        break;
      case "redEyeSmall":
        this.createRedEyeSmall();
        break;
      case "wasp":
        this.createWasp();
        break;
      case "bomb":
        this.createBomb();
        break;
      case "swarm":
        this.createSwarm();
        break;
    }
  }

  private createRandomBug() {
    let num = Math.floor(Math.random() * 6);
    switch (num) {
      case 0:
        this.createBlueFly();
        break;
      case 1:
        this.createRedEyeSmall();
        break;
      case 2:
        this.createSmallFly();
        break;
      case 3:
        this.createWasp();
        break;
      case 4:
        this.createBomb();
        break;
      case 5:
        this.createSwarm();
        break;
    }
  }

  // in angular I create a bug by pushing it into it's corresponding array
  // it then displays on the DOM using *ngFor
  private createBlueFly() {
    let bug = this.instantiateBug("BlueFly")
    this.blueFlies.push(bug);
    this.giveMovement(bug, 5000);
  }
  private createSmallFly() {
    let bug = this.instantiateBug("SmallFly");
    this.smallFlies.push(bug);
    this.giveMovement(bug, 5000);
  }

  private createRedEyeSmall() {
    let bug = this.instantiateBug("RedEyeSmall");
    this.redEyeSmallFlies.push(bug);
    this.giveMovement(bug, 5000);
  }

  private createWasp() {
    let bug = this.instantiateBug("Wasp");
    this.wasps.push(bug);
    this.giveMovement(bug, 5000);
  }

  private createBomb() {
    let bug = this.instantiateBug("Bomb");
    this.bombs.push(bug);
    this.giveMovement(bug, 5000);
  }

  private createSwarm() {
    let bug = this.instantiateBug("Swarm");
    this.swarms.push(bug);
    this.giveMovement(bug, 5000);
  }

  private instantiateBug(typeOfBug: string) {
    // -100 is so that bugs come from the left side of the screen so that user doesn't see them pop in
    switch (typeOfBug) {
      case "BlueFly":
        return new BlueFly(this.getRandStartPos(), this.getStartingYPos(), ++this.flyCount);
      case "SmallFly":
        return new SmallFly(this.getRandStartPos(), this.getStartingYPos(), ++this.flyCount);
      case "RedEyeSmall":
        return new RedEyeSmall(this.getRandStartPos(), this.getStartingYPos(), ++this.flyCount);
      case "Wasp":
        return new Wasp(this.getRandStartPos(), this.getStartingYPos(), ++this.flyCount);
      case "Bomb":
        return new Bomb(this.getRandStartPos(), this.getStartingYPos(), ++this.flyCount);
      case "Swarm":
        return new Swarm(this.getRandStartPos(), this.getStartingYPos(), ++this.flyCount);
    }
  }

  private getRandStartPos() {
    console.log(this.startingPositions.length);
    return this.startingPositions[Math.floor(Math.random() * this.startingPositions.length)];
  }

  // returns a random value between 0 and 400 which represents Y starting position on screen
  private getStartingYPos() {
    return Math.floor(Math.random() * 400);
  }

  private giveMovement(bug, totalDuration: number) {
    // giveMovement() needs to wait after the <img> gets created
    // before giving movement, or else it can't read animate of null
    setTimeout(() => {
      let id = document.querySelector(`#${bug.alt}${bug.id}`);
      let movementDirection;
      if (bug.xPos === -100)
        movementDirection = Movements.getMovementFromDirection("left");
      else if (bug.xPos === 1600)
        movementDirection = Movements.getMovementFromDirection("right");

      bug.animationId = id.animate( // save the animation id in the bug object
        movementDirection,
        {
          duration: totalDuration,
          iterations: 1
        });
      setTimeout(() => {
        console.log(`Fly ${bug.id} removed`);
        id.remove();
        this.removeDeadFly(bug);
      }, totalDuration + 1);
    }, 100);
  }

  private deadFly(deadFly) {
    let id = document.querySelector(`#${deadFly.alt}${deadFly.id}`);
    deadFly.animationId.pause(); // pause previous animation
    let pos = 0;
    let newAnimation = setInterval(() => {
      if (pos === 678)
        clearInterval(newAnimation);
      else {
        pos++;
        deadFly.yPos += pos;
      }
    }, 10);
    setTimeout(() => {
      id.remove();
      this.removeDeadFly(deadFly);
    }, 1001);

  }

  private removeDeadFly(deadFly) {
    // the checking if the fly is included is to prevent a bug from flies
    // disappearing even though they weren't hit by the swatter
    switch (deadFly.alt) {
      case "blueFly":
        if (this.blueFlies.includes(deadFly))
          this.blueFlies.splice(this.blueFlies.indexOf(deadFly), 1);
        break;
      case "smallFly":
        if (this.smallFlies.includes(deadFly))
          this.smallFlies.splice(this.smallFlies.indexOf(deadFly), 1);
        break;
      case "redEyeFly":
        if (this.redEyeSmallFlies.includes(deadFly))
          this.redEyeSmallFlies.splice(this.redEyeSmallFlies.indexOf(deadFly), 1);
        break;
      case "bomb":
        if (this.bombs.includes(deadFly))
          this.bombs.splice(this.bombs.indexOf(deadFly), 1);
        break;
      case "swarm":
        if (this.swarms.includes(deadFly))
          this.swarms.splice(this.swarms.indexOf(deadFly), 1);
        break;
    }
  }
}
