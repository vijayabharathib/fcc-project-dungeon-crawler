export const createBoard = (row,col) => {return ({type: 'CREATE_BOARD',col,row})};
export const clearBoard = () => {return ({type: 'CLEAR_BOARD'})};
export const randomizeBoard = () => {return ({type: 'RANDOMIZE_BOARD'})};
export const nextGeneration = () => {return ({type: 'NEXT_GENERATION'})};
export const startGame = (intervalID) => {return ({type: 'START_GAME',intervalID})};
export const stopGame = () => {return ({type: 'STOP_GAME'})};
export const gosperGlider = () => {return ({type: 'GOSPER_GLIDER'})};
export const toggleCell=(r,c)=>{return ({type: 'TOGGLE_CELL',row: r, col: c})};
