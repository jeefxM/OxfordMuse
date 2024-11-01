// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Loader2, ChevronRight, RefreshCw } from 'lucide-react'

// export function Page() {
//   const [gameState, setGameState] = useState('start') // 'start', 'names', 'questions'
//   const [players, setPlayers] = useState(['', '', '', '', ''])
//   const [questions, setQuestions] = useState([])
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [isGenerating, setIsGenerating] = useState(false)

//   const startGame = () => {
//     setGameState('names')
//   }

//   const handlePlayerNameChange = (index, name) => {
//     const newPlayers = [...players]
//     newPlayers[index] = name
//     setPlayers(newPlayers)
//   }

//   const startQuestions = async () => {
//     const validPlayers = players.filter(name => name.trim() !== '')
//     if (validPlayers.length < 3) {
//       alert('Please enter at least 3 player names')
//       return
//     }
//     setGameState('questions')
//     await generateQuestions()
//   }

//   const generateQuestions = async () => {
//     setIsGenerating(true)
//     try {
//       const response = await fetch('/api/generate-questions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ players }),
//       })
//       const data = await response.json()
//       setQuestions(data.questions)
//       setCurrentQuestion(0)
//     } catch (error) {
//       console.error('Failed to generate questions:', error)
//       alert('Failed to generate questions. Please try again.')
//     }
//     setIsGenerating(false)
//   }

//   const nextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1)
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-100 to-blue-200">
//       {gameState === 'start' && (
//         <Card className="w-full max-w-md">
//           <CardHeader>
//             <CardTitle className="text-2xl text-center">Muse Dinner Questions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-center mb-4">Welcome to the Oxford-style Muse Dinner Questions game!</p>
//           </CardContent>
//           <CardFooter className="flex justify-center">
//             <Button onClick={startGame} size="lg" className="w-full">
//               Start Game
//             </Button>
//           </CardFooter>
//         </Card>
//       )}

//       <Dialog open={gameState === 'names'} onOpenChange={() => {}}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Enter Player Names</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             {players.map((player, index) => (
//               <Input
//                 key={index}
//                 placeholder={`Player ${index + 1}`}
//                 value={player}
//                 onChange={(e) => handlePlayerNameChange(index, e.target.value)}
//               />
//             ))}
//           </div>
//           <DialogFooter>
//             <Button onClick={startQuestions} className="w-full">Start Questions</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {gameState === 'questions' && (
//         <Card className="w-full max-w-md">
//           <CardHeader>
//             <CardTitle className="text-xl text-center">Question {currentQuestion + 1}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-lg mb-6 text-center">{questions[currentQuestion]}</p>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1 || isGenerating}>
//               Next Question
//               <ChevronRight className="ml-2 h-4 w-4" />
//             </Button>
//             <Button onClick={generateQuestions} disabled={isGenerating} variant="outline">
//               {isGenerating ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Generating...
//                 </>
//               ) : (
//                 <>
//                   <RefreshCw className="mr-2 h-4 w-4" />
//                   New Questions
//                 </>
//               )}
//             </Button>
//           </CardFooter>
//         </Card>
//       )}
//     </div>
//   )
// }
