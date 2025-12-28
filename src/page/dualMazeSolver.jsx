import React, { useState, useRef } from 'react';
import "./maze.css"

const DualMazeSolver = () => {
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
  
  // State untuk Iteratif
  const [visitedIter, setVisitedIter] = useState([]);
  const [pathIter, setPathIter] = useState([]);
  const [statsIter, setStatsIter] = useState({ visited: 0, pathLength: 0 });
  
  // State untuk Rekursif
  const [visitedRec, setVisitedRec] = useState([]);
  const [pathRec, setPathRec] = useState([]);
  const [statsRec, setStatsRec] = useState({ visited: 0, pathLength: 0 });
  
  const [isRunning, setIsRunning] = useState(false);
  
  const visitedRecRef = useRef([]);

  const resetVisualization = () => {
    setVisitedIter([]);
    setPathIter([]);
    setStatsIter({ visited: 0, pathLength: 0 });
    
    setVisitedRec([]);
    setPathRec([]);
    setStatsRec({ visited: 0, pathLength: 0 });
    visitedRecRef.current = [];
    
    setIsRunning(false);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // ========== ALGORITMA DFS ITERATIF ==========
  const isValidIter = (row, col, currentVisited) => {
    return (
      row >= 0 && row < gridSize &&
      col >= 0 && col < gridSize &&
      FIXED_MAZE[row][col] === 0 &&
      !currentVisited.some(([r, c]) => r === row && c === col)
    );
  };

  const solveMazeIterative = async () => {
    const visitedCells = [];
    const stack = [[0, 0, [[0, 0]]]];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    let found = false;

    while (stack.length > 0 && !found) {
      const [row, col, currentPath] = stack.pop();
      
      if (visitedCells.some(([r, c]) => r === row && c === col)) continue;
      
      visitedCells.push([row, col]);
      setVisitedIter([...visitedCells]);

      setStatsIter({
        visited: visitedCells.length,
        pathLength: currentPath.length
      });

      if (row === gridSize - 1 && col === gridSize - 1) {
        found = true;
        setPathIter(currentPath);
        break;
      }

      await sleep(50);

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        
        if (isValidIter(newRow, newCol, visitedCells)) {
          stack.push([newRow, newCol, [...currentPath, [newRow, newCol]]]);
        }
      }
    }

    return found;
  };

  // ========== ALGORITMA DFS REKURSIF ==========
  const isValidRec = (row, col) => {
    return (
      row >= 0 && row < gridSize &&
      col >= 0 && col < gridSize &&
      FIXED_MAZE[row][col] === 0 &&
      !visitedRecRef.current.some(([r, c]) => r === row && c === col)
    );
  };

  const dfsRecursive = async (row, col, currentPath) => {
    // Base case: jika sudah mencapai tujuan
    if (row === gridSize - 1 && col === gridSize - 1) {
      setPathRec(currentPath);
      return true;
    }

    // Tandai sel ini sebagai dikunjungi
    visitedRecRef.current.push([row, col]);
    setVisitedRec([...visitedRecRef.current]);
    
    setStatsRec({
      visited: visitedRecRef.current.length,
      pathLength: currentPath.length
    });

    // Delay untuk visualisasi
    await sleep(50);

    // Arah: atas, bawah, kiri, kanan
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // Eksplorasi setiap arah
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (isValidRec(newRow, newCol)) {
        const found = await dfsRecursive(
          newRow, 
          newCol, 
          [...currentPath, [newRow, newCol]]
        );
        
        if (found) return true;
      }
    }

    // Backtrack: tidak ada jalur yang ditemukan dari sel ini
    return false;
  };

  const solveMazeRecursive = async () => {
    visitedRecRef.current = [];
    return await dfsRecursive(0, 0, [[0, 0]]);
  };

  // Jalankan kedua algoritma bersamaan
  const runBothAlgorithms = async () => {
    if (isRunning) return;
    
    resetVisualization();
    setIsRunning(true);

    const [foundIter, foundRec] = await Promise.all([
      solveMazeIterative(),
      solveMazeRecursive()
    ]);

    setIsRunning(false);
    
    if (!foundIter || !foundRec) {
      alert('Tidak ada solusi!');
    }
  };

  const getCellClass = (row, col, visited, path) => {
    if (row === 0 && col === 0) return 'cell-start';
    if (row === gridSize - 1 && col === gridSize - 1) return 'cell-end';
    if (FIXED_MAZE[row][col] === 1) return 'cell-wall';
    if (path.some(([r, c]) => r === row && c === col)) return 'cell-path';
    if (visited.some(([r, c]) => r === row && c === col)) return 'cell-visited';
    return 'cell-empty';
  };

  return (
        
      <div className="">
        {/* Header Utama */}
        <div className="main-header">
          <h1 className="main-title">Perbandingan DFS Iteratif vs Rekursif</h1>
          <p className="main-subtitle">
            Visualisasi perbandingan algoritma DFS mencari jalur dari start ke finish
          </p>
        </div>

        {/* Tombol Kontrol Utama */}
        <div className="main-controls">
          <button
            onClick={runBothAlgorithms}
            disabled={isRunning}
            className={`btn-primary ${isRunning ? 'btn-disabled' : ''}`}
          >
            <svg className="btn-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            {isRunning ? 'Berjalan...' : 'Mulai Kedua Algoritma'}
          </button>
          <button
            onClick={resetVisualization}
            disabled={isRunning}
            className={`btn-secondary ${isRunning ? 'btn-disabled' : ''}`}
          >
            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>

        {/* Container untuk kedua maze */}
        <div className="dual-maze-container">
          
          {/* Maze Iteratif */}
          <div className="maze-demo-container">
            <div className="demo-header">
              <h2 className="demo-title">DFS Iteratif</h2>
              <p className="demo-subtitle">Menggunakan Stack</p>
            </div>

            <div className="stats-container">
              <div className="stat-box">
                <div className="stat-label">Sel Dikunjungi</div>
                <div className="stat-value">{statsIter.visited}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Panjang Jalur</div>
                <div className="stat-value">{statsIter.pathLength}</div>
              </div>
            </div>

            <div className="maze-grid-container">
              <div className="maze-grid">
                {FIXED_MAZE.map((row, rowIndex) =>
                  row.map((_, colIndex) => (
                    <div
                      key={`iter-${rowIndex}-${colIndex}`}
                      className={`maze-cell ${getCellClass(rowIndex, colIndex, visitedIter, pathIter)}`}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="legend-container">
              <div className="legend-item">
                <div className="legend-color cell-start"></div>
                <span>Start</span>
              </div>
              <div className="legend-item">
                <div className="legend-color cell-end"></div>
                <span>Finish</span>
              </div>
              <div className="legend-item">
                <div className="legend-color cell-wall"></div>
                <span>Dinding</span>
              </div>
              <div className="legend-item">
                <div className="legend-color cell-visited"></div>
                <span>Dikunjungi</span>
              </div>
              <div className="legend-item">
                <div className="legend-color cell-path"></div>
                <span>Jalur Solusi</span>
              </div>
            </div>
          </div>

          {/* Maze Rekursif */}
          <div className="maze-demo-container">
            <div className="demo-header">
              <h2 className="demo-title">DFS Rekursif</h2>
              <p className="demo-subtitle">Menggunakan Call Stack</p>
            </div>

            <div className="stats-container">
              <div className="stat-box">
                <div className="stat-label">Sel Dikunjungi</div>
                <div className="stat-value">{statsRec.visited}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Panjang Jalur</div>
                <div className="stat-value">{statsRec.pathLength}</div>
              </div>
            </div>

            <div className="maze-grid-container">
              <div className="maze-grid">
                {FIXED_MAZE.map((row, rowIndex) =>
                  row.map((_, colIndex) => (
                    <div
                      key={`rec-${rowIndex}-${colIndex}`}
                      className={`maze-cell ${getCellClass(rowIndex, colIndex, visitedRec, pathRec)}`}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="legend-container">
              <div className="legend-item">
                <div className="legend-color cell-start"></div>
                <span>Start</span>
              </div>
              <div className="legend-item">
                <div className="legend-color cell-end"></div>
                <span>Finish</span>
              </div>
              <div className="legend-item">
                <div className="legend-color cell-wall"></div>
                <span>Dinding</span>
              </div>
              <div className="legend-item">
                <div className="legend-color cell-visited"></div>
                <span>Dikunjungi</span>
              </div>
              <div className="legend-item">
                <div className="legend-color cell-path"></div>
                <span>Jalur Solusi</span>
              </div>
            </div>
          </div>

        </div>
      </div>
  );
};

export default DualMazeSolver;