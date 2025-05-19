import {Button, StyleSheet, Text, View, StatusBar, TouchableOpacity} from 'react-native';
import {useState, useEffect} from 'react';
// export default function App() {
//
//     const handlePress = () => {
//         console.log('test1')
//         console.warn('test2')
//         console.error('test3')
//
//         try {
//             throw new Error('Це тестова помилка')
//         }catch (error){
//             console.error("Виникла помилка: ", error.message)
//         }
//         //Reactotron(Redux, Axios)
//     }
//
//     return (
//         <View style={styles.container}>
//             <Text>Open up App.js to start working on your app!</Text>
//             <Button title="test" onPress={handlePress}/>
//             <StatusBar style="auto"/>
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

//ex1 JavaScript-помилки
// export default function App() {
//
//     const handlePress = () => {
//         // try {
//         //     // const obj = null;
//         //     // console.log(obj.property)
//         // }catch (error){
//         //     console.error("Виникла помилка: ", error.message)
//         // }
//         const obj = null;
//         console.log(obj.property)
//     }
//
//     return (
//         <View>
//             <Text>Open up App.js to start working on your app!</Text>
//             <Button title="test" onPress={handlePress}/>
//             <StatusBar style="auto"/>
//         </View>
//     );
// };

//2.Асинхронні помилки
// export default function App() {
//     const [errorMessage, setErrorMessage] = useState('');
//     const [loading, setLoading] = useState(false);
//
//     // const fetchData = () => {
//     //     setLoading(true);
//     //     setErrorMessage('');
//     //
//     //     const promise = new Promise((resolve, reject) => {
//     //         const isDataValid = false;
//     //         if (!isDataValid) {
//     //             reject('Дані некоректні')
//     //         } else {
//     //             resolve('Дані успішно отримано')
//     //         }
//     //     });
//     //
//     //     promise
//     //         .then((res) => console.log(res))
//     //         .catch((err) => {
//     //             setErrorMessage(err)
//     //         })
//     //         .finally(() => {
//     //             setLoading(false)
//     //         });
//     //     console.log('finish');
//     // }
//
//     const fetchData = async () => {
//         console.log('start')
//         setLoading(true);
//         setErrorMessage('');
//         try {
//             const data = await new Promise((resolve, reject) => {
//                 const isDataValid = false;
//                 if (!isDataValid) {
//                     reject('Дані некоректні')
//                 } else {
//                     resolve('Дані успішно отримано')
//                 }
//             });
//
//             console.log(data);
//             console.log('finish')
//         } catch (error) {
//             setErrorMessage(error)
//         } finally {
//             setLoading(false)
//         }
//     }
//
//
//     return (
//         <View>
//             <Text>Open up App.js to start working on your app!</Text>
//             <Button title="test" onPress={fetchData}/>
//             {loading && <Text>Завантаження...</Text>}
//             {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
//             <StatusBar style="auto"/>
//         </View>
//     );
// }

//3 оброблення помилок у мережевих запитах
// const fetchData = async ()=>{
//    try{
//        const response = await fetch('https://jsonplaceholder.typicode.com/users');
//        console.log(response)
//        if(!response.ok){
//            throw new Error('Помилка завантаження:', response.status, response.statusText);
//        }
//        const data = await response.json();
//        console.log('Дані: ', data)
//    }catch (error){
//        console.error('Мережева помилка', error.message)
//    }
// }
// export default function App() {
//     return (
//         <View>
//             <Text>ReactNative!</Text>
//             <Button title="test" onPress={fetchData}/>
//             <StatusBar style="auto"/>
//         </View>
//     );
// };

//4.Глобальні помилки
// export default function App() {
//     useEffect(() => {
//         ErrorUtils.setGlobalHandler((error, isFatal) => {
//             console.error('Глобальна помилка: ', error.message, 'Фатальна:', isFatal);
//             //відправка на сервер
//             //повідомити користувача
//             //перезапуск додатка
//             //аналітичні сервіси
//         })
//         setTimeout(() => {
//             // throw new Error('Це тестова глобальна помилка')
//             try {
//                 throw new Error("Це тестова НЕ фатальна помилка");
//             } catch (error) {
//                 console.warn("Ловимо помилку в try-catch:", error.message);
//                 alert("ERROR!")
//             }
//         }, 5000)
//     }, []);
//     return (
//         <View>
//             <Text>ReactNative!</Text>
//             <StatusBar style="auto"/>
//         </View>
//     );
// };

export default function App() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [isXNext, setIsXNext] = useState(true);
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [draws, setDraws] = useState(0);

    const currentBoard = history[stepNumber];

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: [a, b, c] };
            }
        }
        return null;
    };

    const result = calculateWinner(currentBoard);
    const winner = result?.winner;
    const winningLine = result?.line || [];

    const isDraw = !winner && currentBoard.every((cell) => cell !== null);

    // Підрахунок очок після завершення гри
    useEffect(() => {
        if (winner) {
            if (winner === "X") setXWins((prev) => prev + 1);
            else if (winner === "O") setOWins((prev) => prev + 1);
        } else if (isDraw) {
            setDraws((prev) => prev + 1);
        }
    }, [winner, isDraw]);

    const handleClick = (index) => {
        if (currentBoard[index] || winner || isDraw) return;

        const boardCopy = [...currentBoard];
        boardCopy[index] = isXNext ? 'X' : 'O';

        const updatedHistory = [...history.slice(0, stepNumber + 1), boardCopy];

        setHistory(updatedHistory);
        setStepNumber(updatedHistory.length - 1);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setHistory([Array(9).fill(null)]);
        setStepNumber(0);
        setIsXNext(true);
    };

    const undoMove = () => {
        if (stepNumber === 0) return;
        setStepNumber(stepNumber - 1);
        setIsXNext((prev) => !prev);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Хрестики-Нулики</Text>

            <Text style={styles.score}>
                O: {oWins}  |  X: {xWins}  |  Нічиї: {draws}
            </Text>

            <View style={styles.board}>
                {currentBoard.map((value, index) => {
                    const isWinningCell = winningLine.includes(index);
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.cell,
                                isWinningCell && styles.winningCell
                            ]}
                            onPress={() => handleClick(index)}
                        >
                            <Text style={styles.cellText}>{value}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {winner ? (
                <View style={styles.winnerContainer}>
                    <Text style={styles.winnerText}>{winner} виграв!</Text>
                    <Button title="Нова гра" onPress={resetGame} />
                </View>
            ) : isDraw ? (
                <View style={styles.winnerContainer}>
                    <Text style={styles.winnerText}>Нічия!</Text>
                    <Button title="Грати знову" onPress={resetGame} />
                </View>
            ) : (
                <Text style={styles.turnText}>
                    Черга гравця: {isXNext ? 'Хрестики (X)' : 'Нулики (0)'}
                </Text>
            )}

            <View style={{ marginTop: 10 }}>
                <Button title="Назад" onPress={undoMove} disabled={stepNumber === 0} />
            </View>

            <StatusBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    score: {
        fontSize: 18,
        marginBottom: 20,
    },
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    cell: {
        width: '33.33%',
        height: '33.33%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
    },
    cellText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    winningCell: {
        backgroundColor: '#c8e6c9',
    },
    winnerContainer: {
        alignItems: 'center',
    },
    winnerText: {
        fontSize: 20,
        marginBottom: 10,
    },
    turnText: {
        fontSize: 18,
        marginTop: 20,
    },
});
