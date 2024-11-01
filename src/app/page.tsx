"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, RefreshCw } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Assume this import works as it's in the project structure you provided earlier
import questionsData from "../app/data/data.json";

type Category = keyof typeof questionsData;

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function MuseDinnerQuestions() {
  const [gameState, setGameState] = useState("start"); // 'start', 'names', 'questions'
  const [players, setPlayers] = useState(["", "", "", ""]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  useEffect(() => {
    if (selectedCategory) {
      setQuestions(shuffleArray([...questionsData[selectedCategory]]));
    }
  }, [selectedCategory]);

  const startGame = () => {
    setGameState("names");
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const startQuestions = () => {
    const validPlayers = players.filter((name) => name.trim() !== "");
    if (validPlayers.length < 3) {
      alert("Please enter at least 3 player names");
      return;
    }
    setGameState("questions");
  };

  const shuffleQuestions = () => {
    if (selectedCategory) {
      setQuestions(shuffleArray([...questionsData[selectedCategory]]));
      setCurrentQuestion(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-100 to-blue-200">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {gameState === "start" && "Muse Dinner Questions"}
            {gameState === "names" && "Enter Player Names"}
            {gameState === "questions" && `Question ${currentQuestion + 1}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {gameState === "start" && (
            <p className="text-center mb-4">
              Welcome to the Oxford-style Muse Dinner Questions game!
            </p>
          )}
          {gameState === "names" && (
            <div className="grid gap-4 py-4">
              {players.map((player, index) => (
                <Input
                  key={index}
                  placeholder={`Player ${index + 1}`}
                  value={player}
                  onChange={(e) =>
                    handlePlayerNameChange(index, e.target.value)
                  }
                />
              ))}
            </div>
          )}
          {gameState === "questions" && (
            <>
              <Select
                onValueChange={(value) =>
                  setSelectedCategory(value as Category)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(questionsData).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-lg mb-6 text-center">
                {questions[currentQuestion]}
              </p>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {gameState === "start" && (
            <Button onClick={startGame} size="lg" className="w-full">
              Start Game
            </Button>
          )}
          {gameState === "names" && (
            <Button onClick={startQuestions} className="w-full">
              Start Questions
            </Button>
          )}
          {gameState === "questions" && (
            <div className="flex justify-between w-full">
              <Button
                onClick={nextQuestion}
                disabled={currentQuestion === questions.length - 1}
              >
                Next Question
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={shuffleQuestions} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Shuffle Questions
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
