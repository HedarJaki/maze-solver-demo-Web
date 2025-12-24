import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const SimpleMazeSolver = () => {
  // Fixed maze: 0 = path, 1 = wall
  const FIXED_MAZE = [
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0]
  ];

  const gridSize = FIXED_MAZE.length;
  const [visited, setVisited] = useState([]);
  const [path, setPath] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({ visited: 0, pathLength: 0 });

  const resetVisualization = () => {
    setVisited([]);
    setPath([]);
    setIsRunning(false);
    setStats({ visited: 0, pathLength: 0 });
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const isValid = (row, col, currentVisited) => {
    return (
      row >= 0 && row < gridSize &&
      col >= 0 && col < gridSize &&
      FIXED_MAZE[row][col] === 0 &&
      !currentVisited.some(([r, c]) => r === row && c === col)
    );
  };

  const solveMazeDFS = async () => {
    if (isRunning) return;
    
    resetVisualization();
    setIsRunning(true);

    const visitedCells = [];
    const finalPath = [];
    const stack = [[0, 0, [[0, 0]]]]; // [row, col, path]
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    let found = false;

    while (stack.length > 0 && !found) {
      const [row, col, currentPath] = stack.pop();
      
      if (visitedCells.some(([r, c]) => r === row && c === col)) continue;
      
      visitedCells.push([row, col]);
      setVisited([...visitedCells]);

      setStats({
        visited: visitedCells.length,
        pathLength: currentPath.length
      });

      if (row === gridSize - 1 && col === gridSize - 1) {
        found = true;
        finalPath.push(...currentPath);
        setPath(currentPath);
        break;
      }

      await sleep(50);

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        
        if (isValid(newRow, newCol, visitedCells)) {
          stack.push([newRow, newCol, [...currentPath, [newRow, newCol]]]);
        }
      }
    }

    setIsRunning(false);
    
    if (!found) {
      alert('No solution found!');
    }
  };

  const getCellColor = (row, col) => {
    if (row === 0 && col === 0) return 'bg-green-500';
    if (row === gridSize - 1 && col === gridSize - 1) return 'bg-red-500';
    if (FIXED_MAZE[row][col] === 1) return 'bg-gray-800';
    if (path.some(([r, c]) => r === row && c === col)) return 'bg-yellow-400';
    if (visited.some(([r, c]) => r === row && c === col)) return 'bg-blue-400';
    return 'bg-white';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-slate-900 rounded-xl">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          DFS Maze Solver Demo
        </h2>
        <p className="text-slate-400">
          Watch the algorithm find a path from start to end
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Cells Visited</div>
          <div className="text-white text-2xl font-bold">{stats.visited}</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Path Length</div>
          <div className="text-white text-2xl font-bold">{stats.pathLength}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={solveMazeDFS}
          disabled={isRunning}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-5 h-5" />
          {isRunning ? 'Running...' : 'Start DFS'}
        </button>
        <button
          onClick={resetVisualization}
          disabled={isRunning}
          className="bg-slate-700 hover:bg-slate-600 text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      {/* Maze Grid */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
        <div className="flex justify-center">
          <div
            className="inline-grid gap-1 bg-slate-700 p-3 rounded-lg"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            }}
          >
            {FIXED_MAZE.map((row, rowIndex) =>
              row.map((_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${getCellColor(rowIndex, colIndex)} transition-all duration-200 rounded-sm border border-slate-600`}
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span className="text-slate-300 text-sm">Start</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded"></div>
            <span className="text-slate-300 text-sm">End</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-800 rounded border border-slate-600"></div>
            <span className="text-slate-300 text-sm">Wall</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-400 rounded"></div>
            <span className="text-slate-300 text-sm">Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-400 rounded"></div>
            <span className="text-slate-300 text-sm">Path</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMazeSolver;