// DIFFCULTY: 1 : easy
//            2 : Medium
//            3 : Hard

class Algorithm {
  constructor(
    subject,
    testName,
    totalMarks,
    totalQuestions,
    difficulty,
    pop_size,
    iterations,
    mutationRate
  ) {
    this.data = require("./dataset/train.json");
    this.chapterdis = [5, 5, 8, 5, 4, 12, 4, 7, 9, 4, 4, 3, 10, 8, 3, 9];
    this.subject = subject;
    this.testName = testName;
    this.totalMarks = totalMarks;
    this.totalQuestions = totalQuestions;
    this.analyseFitness = [];
    this.difficulty = difficulty;
    this.analysePaper = null;
    this.pop_size = pop_size;
    this.iterations = iterations;
    this.mutationRate = mutationRate;
  }

  generateBank = () => {
    let questionBank_1M = [];
    for (let i = 0; i < 3000; i++) {
      let diff = Math.floor(Math.random() * 3) + 1;
      // marks1 = Math.floor(Math.random() * 3) + 1;
      let ID = (diff + 1) * (Math.floor(Math.random() * 1000) + 1);
      let CO = Math.floor(Math.random() * 5) + 1;
      let Chapter = Math.floor(Math.random() * 16) + 1;
      let Question = this.data[i].question;
      let Answer = this.data[i].correct_answer;
      let Options = [
        this.data[i].distractor3,
        this.data[i].distractor1,
        this.data[i].distractor2,
        this.data[i].correct_answer,
      ];
      questionBank_1M.push({
        id: ID,
        marks: 1,
        difficulty: diff,
        co: CO,
        chapter: Chapter,
        included: false,
        question: Question,
        answer: Answer,
        options: Options,
      });
    }
    let questionBank_2M = [];
    for (let i = 3001; i < 6000; i++) {
      let diff = Math.floor(Math.random() * 3) + 1;
      // marks1 = Math.floor(Math.random() * 3) + 1;
      let ID = (diff + 1) * (Math.floor(Math.random() * 1000) + 1);
      let CO = Math.floor(Math.random() * 5) + 1;
      let Chapter = Math.floor(Math.random() * 16) + 1;
      let Question = this.data[i].question;
      let Answer = this.data[i].correct_answer;
      let Options = [
        this.data[i].distractor3,
        this.data[i].distractor1,
        this.data[i].distractor2,
        this.data[i].correct_answer,
      ];
      questionBank_2M.push({
        id: ID,
        marks: 2,
        difficulty: diff,
        co: CO,
        chapter: Chapter,
        included: false,
        question: Question,
        answer: Answer,
        options: Options,
      });
    }
    let questionBank_3M = [];
    for (let i = 6001; i < 9000; i++) {
      let diff = Math.floor(Math.random() * 3) + 1;
      // marks1 = Math.floor(Math.random() * 3) + 1;
      let ID = (diff + 1) * (Math.floor(Math.random() * 1000) + 1);
      let CO = Math.floor(Math.random() * 5) + 1;
      let Chapter = Math.floor(Math.random() * 16) + 1;
      let Question = this.data[i].question;
      let Answer = this.data[i].correct_answer;
      let Options = [
        this.data[i].distractor3,
        this.data[i].distractor1,
        this.data[i].distractor2,
        this.data[i].correct_answer,
      ];
      questionBank_3M.push({
        id: ID,
        marks: 3,
        difficulty: diff,
        co: CO,
        chapter: Chapter,
        included: false,
        question: Question,
        answer: Answer,
        options: Options,
      });
    }
    let questionBank = [];
    questionBank.push(questionBank_1M);
    questionBank.push(questionBank_2M);
    questionBank.push(questionBank_3M);
    return questionBank;
  };

  isValid = (i, j, k, marks, count) => {
    if (i + 2 * j + 3 * k == marks && i + j + k == count) return true;
    return false;
  };

  generatePopulation = (marks, count) => {
    let m1 = [];
    let m2 = [];
    let m3 = [];
    if (marks == count) {
      m1.push(count);
      m2.push(0);
      m3.push(0);
    } else {
      let buf1 = marks - 5;
      for (let i = 1; i <= buf1; i++) {
        let temp = (marks - i) / 2;
        for (let j = 1; j <= temp; j++) {
          let buf = (marks - i - j * 2) / 3;
          for (let k = 1; k <= buf; k++) {
            if (this.isValid(i, j, k, marks, count)) {
              m1.push(i);
              m2.push(j);
              m3.push(k);
              // console.log(i, j, k);
            }
          }
        }
      }
    }
    let res = [];
    res.push(m1);
    res.push(m2);
    res.push(m3);
    return res;
  };

  selection = (res, questionBank) => {
    var map = {};
    let temp = Math.floor(Math.random() * res[0].length);
    let a = res[0][temp];
    let b = res[1][temp];
    let c = res[2][temp];
    let res1 = [];
    for (let i = 0; i < a; i++) {
      let buf = Math.floor(Math.random() * (questionBank[0].length - 1));
      if (map.length > 0 && map[questionBank[0][buf].id]) {
        while (map[questionBank[0][buf].id])
          buf = Math.floor(Math.random() * (questionBank[0].length - 1));
      }
      // questionBank[0][buf].included = true;
      map[questionBank[0][buf].id] = true;
      res1.push(questionBank[0][buf]);
    }
    for (let i = 0; i < b; i++) {
      let buf = Math.floor(
        Math.random() * Math.random() * (questionBank[0].length - 1)
      );
      if (map.length > 0 && map[questionBank[1][buf].id]) {
        while (map[questionBank[1][buf].id])
          buf = Math.floor(Math.random() * (questionBank[0].length - 1));
      }
      // questionBank[0][buf].included = true;
      map[questionBank[1][buf].id] = true;
      res1.push(questionBank[1][buf]);
    }
    for (let i = 0; i < c; i++) {
      let buf = Math.floor(
        Math.random() * Math.random() * (questionBank[0].length - 1)
      );
      if (map.length > 0 && map[questionBank[2][buf].id]) {
        while (map[questionBank[2][buf].id])
          buf = Math.floor(Math.random() * (questionBank[0].length - 1));
      }
      // questionBank[0][buf].included = true;
      map[questionBank[2][buf].id] = true;
      res1.push(questionBank[2][buf]);
    }
    // console.log(res);
    return res1;
    // return population;
  };
  // console.log(m1, m2, m3);

  calcFitness = (res, marks, avg_diff) => {
    // console.log("In Fitness function");
    let diff = 0;
    let chapDis = [];
    let min = 0;
    let a = 0;
    let b = 0;
    let c = 0;
    for (let i = 0; i < 16; i++) {
      chapDis.push(0);
    }
    let visited = [];
    let chapSum = 0;
    for (let i = 0; i < 5; i++) visited.push(false);
    for (let i = 0; i < res.length; i++) {
      if (res[i].marks == 1) a++;
      else if (res[i].marks == 2) b++;
      else if (res[i].marks == 3) c++;
      diff += res[i].marks * res[i].difficulty;
      chapDis[res[i].Chapter - 1] += res[i].marks;
      chapSum += res[i].marks;
      visited[res[i].co - 1] = true;
    }
    chapSum = Math.abs(chapSum - 100);
    min += Math.abs(a - b);
    min += Math.abs(b - c);
    min += Math.abs(a - c);
    diff /= marks;
    diff = Math.abs(avg_diff - diff);
    //   diff = diff / avg_diff;
    let chapDiff = 0;
    for (let i = 0; i < 16; i++) {
      chapDiff += Math.abs(this.chapterdis[i] - chapDis[i]);
    }
    //   chapDiff *= 3;
    let coDiff = 1;
    for (let i = 0; i < 5; i++) {
      if (visited[i] == false) coDiff -= 0.2;
    }
    if (min == 0) min = 1;
    if (chapSum == 0) chapSum = 1;
    if (chapDiff == 0) chapDiff = 1;
    let fitness;
    //   fitness = (diff * coDiff) / (chapDiff * min);
    if (diff == 0) fitness = (1 * coDiff) / (chapDiff * min * chapSum);
    else fitness = (1 * coDiff) / (chapDiff * min * diff * chapSum);
    // console.log("Fitness :" + fitness);
    return fitness * 1000;
  };

  Analyse = () => {
    this.analyseFitness = [];
    const marks = this.totalMarks;
    const count = this.totalQuestions;
    const avg_diff = this.difficulty;
    let max1 = -1;
    let pop_size = this.pop_size;
    let iterations = this.iterations;
    //   marks = 100;
    //   count = 60;
    //   avg_diff = 2;
    let prevFitness = 0;
    let questionBank = this.generateBank();
    let population = this.generatePopulation(marks, count);
    console.log(population);
    let curr_population = [];
    let curr_populationFitness = [];
    for (var i = 0; i < pop_size; i++) {
      curr_population.push(this.selection(population, questionBank));
      curr_populationFitness.push(
        this.calcFitness(curr_population[i], marks, avg_diff)
      );
      max1 = Math.max(max1, curr_populationFitness[i]);
    }
    for (var i = 0; i < pop_size; i++) {
      for (var j = 0; j < curr_population[i].length; j++) {
        curr_population[i][j].included = true;
      }
    }
    // console.log("this is ", curr_populationFitness);
    for (var i = 0; i < pop_size; i++) {
      curr_populationFitness[i] /= max1;
    }

    for (var p = 0; p < iterations; p++) {
      // console.log(p);
      for (var y = 0; y < pop_size; y++) {
        if (p == 999 || p == 0) {
          // console.log(
          //   "Generation : " +
          //     p +
          //     " Fitness: " +
          //     calcFitness(curr_population[y], marks, avg_diff) * 100
          //   // curr_population[y]
          // );
        }
      }

      let matingpool = [];
      for (var i = 0; i < pop_size; i++) {
        var temp = Math.floor(curr_populationFitness[i] * 100);
        for (var j = 0; j < temp; j++) {
          matingpool.push(curr_population[i]);
        }
      }

      let newGeneration = [];
      for (var j = 0; j < pop_size; j++) {
        var temp = Math.floor(Math.random() * (matingpool.length - 1));
        let parentA = matingpool[temp];
        temp = Math.floor(Math.random() * (matingpool.length - 1));
        let parentB = matingpool[temp];
        let childs = this.crossover(parentA, parentB);
        for (var w = 0; w < childs.length; w++) {
          if (Math.random(1) < this.mutationRate) {
            let m = childs[w].marks;
            if (this.isFull(questionBank, m) > 10)
              childs[w] = this.mutate(m, questionBank);
          }
        }
        newGeneration.push(childs);
      }
      curr_population = [];
      curr_populationFitness = [];
      max1 = -1;
      for (var q = 0; q < newGeneration.length; q++) {
        curr_population.push(newGeneration[q]);
        curr_populationFitness.push(
          this.calcFitness(curr_population[q], marks, avg_diff)
        );
        max1 = Math.max(max1, curr_populationFitness[q]);
      }
      let avg_fitness = 0;

      for (var i = 0; i < pop_size; i++) {
        avg_fitness += curr_populationFitness[i];
        curr_populationFitness[i] /= max1;
      }
      avg_fitness /= curr_populationFitness.length;
      console.log(avg_fitness);
      this.analyseFitness.push(avg_fitness);
      if (avg_fitness == prevFitness) break;
      prevFitness = avg_fitness;

      // console.log(curr_population);
      // setTimeout(Analyse, 1);
    }
    let finalQuestionPaper = curr_population[0];
    let finalFitness = curr_populationFitness[0];
    for (let i = 1; i < curr_population.length; i++) {
      if (finalFitness < curr_populationFitness[i]) {
        finalFitness = curr_populationFitness[i];
        finalQuestionPaper = curr_population[i];
      }
    }
    // console.log(
    //   "Final Paper Fitness : ",
    //   calcFitness(finalQuestionPaper, marks, avg_diff) * 100
    // );
    this.analysePaper = this.analyseQuestionPaper(finalQuestionPaper);
    return finalQuestionPaper;
    // }

    // console.log("Analysis: " + newGeneration);
  };

  crossover = (parentA, parentB) => {
    // console.log("In crossover:");
    let crosspt = Math.floor(Math.random() * (parentA.length - 1));
    let childA = [];
    let childB = [];
    for (var i = 0; i < crosspt; i++) {
      childA.push(parentA[i]);
    }
    for (var i = crosspt; i < parentB.length; i++) {
      childA.push(parentB[i]);
    }
    for (var i = 0; i < crosspt; i++) {
      childB.push(parentB[i]);
    }
    for (var i = crosspt; i < parentA.length; i++) {
      childB.push(parentA[i]);
    }

    // return [childA, childB];
    return childA;
  };

  mutate = (marks, questionBank) => {
    // console.log("Inisde mutate");
    let temp =
      Math.floor(Math.random() * (questionBank[marks - 1].length - 1)) + 1;
    if (questionBank[marks - 1][temp].included) {
      while (questionBank[marks - 1][temp].included) {
        temp =
          Math.floor(Math.random() * (questionBank[marks - 1].length - 1)) + 1;
      }
    }
    questionBank[marks - 1][temp].included = true;
    return questionBank[marks - 1][temp];
  };
  analyseQuestionPaper = (finalQuestionPaper) => {
    // for (let i = 0; i < finalQuestionPaper.length; i++)
    // console.log("This ", finalQuestionPaper[i].chapter);
    let overall_diffculty = 0;
    let chapterDistribution = [];
    for (let i = 0; i < 16; i++) {
      chapterDistribution[i] = 0;
    }
    let difficulty_distribution = [0, 0, 0];
    let marks_distribution = [0, 0, 0];
    for (let i = 0; i < finalQuestionPaper.length; i++) {
      overall_diffculty += finalQuestionPaper[i].difficulty;
      chapterDistribution[finalQuestionPaper[i].chapter - 1] +=
        finalQuestionPaper[i].marks;
      difficulty_distribution[finalQuestionPaper[i].difficulty - 1] += 1;
      marks_distribution[finalQuestionPaper[i].marks - 1] += 1;
    }
    // console.log(chapterDistribution);
    overall_diffculty /= finalQuestionPaper.length;
    return {
      difficulty: overall_diffculty,
      chapterDistribution: chapterDistribution,
      marksDistribution: marks_distribution,
      difficultyDistribution: difficulty_distribution,
      diff:
        (Math.abs(overall_diffculty - this.difficulty) / this.difficulty) * 100,
    };
  };
  isFull = (questionBank, marks) => {
    let k = 0;
    for (let i = 0; i < questionBank[marks - 1].length; i++) {
      if (!questionBank[marks - 1][i].included) {
        k++;
      }
    }
    return k;
  };
}

// let algo = new Algorithm();

// let QuestionPaper = algo.Analyse(100, 60, 1.5);
// console.log(QuestionPaper.length);
// console.log(algo.analyseQuestionPaper(QuestionPaper));
module.exports = Algorithm;
