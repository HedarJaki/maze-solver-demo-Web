// MazePerformanceTester.jsx
import React, { useState } from 'react';
import './performanceTester.css';

const MazePerformanceTester = () => {
  const [mazeSize, setMazeSize] = useState(10);
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentMaze, setCurrentMaze] = useState(null);
  const [showVisual, setShowVisual] = useState(false);

  // ========== MAZE GENERATOR ==========
  const generateMaze = (size) => {
    // Inisialisasi maze dengan semua dinding (1)
    const maze = Array(size).fill().map(() => Array(size).fill(1));
    
    // Stack untuk DFS maze generation
    const stack = [];
    const startRow = 0;
    const startCol = 0;
    
    maze[startRow][startCol] = 0;
    stack.push([startRow, startCol]);
    
    const directions = [
      [-2, 0], // atas (loncat 2 sel)
      [2, 0],  // bawah
      [0, -2], // kiri
      [0, 2]   // kanan
    ];

    while (stack.length > 0) {
      const [row, col] = stack[stack.length - 1];
      
      // Shuffle directions untuk random maze
      const shuffled = directions
        .map(dir => ({ dir, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ dir }) => dir);
      
      let moved = false;
      
      for (const [dr, dc] of shuffled) {
        const newRow = row + dr;
        const newCol = col + dc;
        
        if (
          newRow >= 0 && newRow < size &&
          newCol >= 0 && newCol < size &&
          maze[newRow][newCol] === 1
        ) {
          // Buat jalan ke sel baru
          maze[newRow][newCol] = 0;
          // Buat jalan di antara sel
          maze[row + dr / 2][col + dc / 2] = 0;
          
          stack.push([newRow, newCol]);
          moved = true;
          break;
        }
      }
      
      if (!moved) {
        stack.pop();
      }
    }
    
    // Pastikan start dan end adalah jalan
    maze[0][0] = 0;
    maze[size - 1][size - 1] = 0;
    
    // Tambah beberapa jalan ekstra untuk variasi
    for (let i = 0; i < size * 2; i++) {
      const randomRow = Math.floor(Math.random() * size);
      const randomCol = Math.floor(Math.random() * size);
      if (randomRow > 0 && randomRow < size - 1 && 
          randomCol > 0 && randomCol < size - 1) {
        maze[randomRow][randomCol] = 0;
      }
    }
    
    return maze;
  };

  // ========== DFS ITERATIF ==========
  const dfsIterative = (maze) => {
    const size = maze.length;
    const visited = new Set();
    const stack = [[0, 0, [[0, 0]]]];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    let cellsVisited = 0;
    let pathFound = null;

    while (stack.length > 0) {
      const [row, col, currentPath] = stack.pop();
      const key = `${row},${col}`;
      
      if (visited.has(key)) continue;
      
      visited.add(key);
      cellsVisited++;

      if (row === size - 1 && col === size - 1) {
        pathFound = currentPath;
        break;
      }

      // Push terbalik agar eksplorasi sama dengan rekursif
      for (let i = directions.length - 1; i >= 0; i--) {
        const [dr, dc] = directions[i];
        const newRow = row + dr;
        const newCol = col + dc;
        const newKey = `${newRow},${newCol}`;
        
        if (
          newRow >= 0 && newRow < size &&
          newCol >= 0 && newCol < size &&
          maze[newRow][newCol] === 0 &&
          !visited.has(newKey)
        ) {
          stack.push([newRow, newCol, [...currentPath, [newRow, newCol]]]);
        }
      }
    }

    return {
      found: pathFound !== null,
      pathLength: pathFound ? pathFound.length : 0,
      cellsVisited
    };
  };

  // ========== DFS REKURSIF ==========
  const dfsRecursive = (maze) => {
    const size = maze.length;
    const visited = new Set();
    let cellsVisited = 0;
    
    const dfsHelper = (row, col, currentPath) => {
      const key = `${row},${col}`;
      
      // Base cases
      if (row < 0 || row >= size || col < 0 || col >= size) return null;
      if (maze[row][col] === 1) return null;
      if (visited.has(key)) return null;
      
      visited.add(key);
      cellsVisited++;
      
      if (row === size - 1 && col === size - 1) {
        return currentPath;
      }
      
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      
      for (const [dr, dc] of directions) {
        const result = dfsHelper(
          row + dr, 
          col + dc, 
          [...currentPath, [row + dr, col + dc]]
        );
        if (result) return result;
      }
      
      return null;
    };
    
    const pathFound = dfsHelper(0, 0, [[0, 0]]);
    
    return {
      found: pathFound !== null,
      pathLength: pathFound ? pathFound.length : 0,
      cellsVisited
    };
  };

  // ========== RUN PERFORMANCE TEST ==========
  const runPerformanceTest = () => {
    const size = parseInt(mazeSize);
    
    // Validasi minimum saja
    if (size < 5) {
      alert('Ukuran maze minimal 5×5');
      return;
    }
    
    // Warning untuk maze sangat besar
    if (size > 100) {
      const confirm = window.confirm(
        `⚠️ WARNING: Maze ${size}×${size} sangat besar!\n\n` +
        `- Browser mungkin freeze/hang\n` +
        `- Memory usage tinggi\n` +
        `- Waktu eksekusi bisa >10 detik\n\n` +
        `Lanjutkan?`
      );
      if (!confirm) return;
    }

    setIsRunning(true);

    // Generate maze baru
    const maze = generateMaze(size);
    setCurrentMaze(maze);
    
    // Set show visual hanya untuk maze kecil
    setShowVisual(size <= 30);

    // Test Iteratif
    const startIter = performance.now();
    const resultIter = dfsIterative(maze);
    const endIter = performance.now();
    const timeIter = (endIter - startIter).toFixed(4);

    // Test Rekursif
    const startRec = performance.now();
    const resultRec = dfsRecursive(maze);
    const endRec = performance.now();
    const timeRec = (endRec - startRec).toFixed(4);

    // Simpan hasil
    const newResult = {
      id: Date.now(),
      size,
      iterative: {
        time: timeIter,
        pathLength: resultIter.pathLength,
        cellsVisited: resultIter.cellsVisited,
        found: resultIter.found
      },
      recursive: {
        time: timeRec,
        pathLength: resultRec.pathLength,
        cellsVisited: resultRec.cellsVisited,
        found: resultRec.found
      },
      winner: parseFloat(timeIter) < parseFloat(timeRec) ? 'Iteratif' : 'Rekursif'
    };

    setTestResults(prev => [newResult, ...prev]);
    setIsRunning(false);
  };

  // ========== EXPORT TO JSON ==========
  const exportResults = () => {
    const dataStr = JSON.stringify(testResults, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `maze-performance-${Date.now()}.json`;
    link.click();
  };

  // ========== COPY MAZE MATRIX ==========
  const copyMazeMatrix = () => {
    if (!currentMaze) return;
    
    const mazeStr = JSON.stringify(currentMaze, null, 2);
    navigator.clipboard.writeText(mazeStr);
    alert('Matriks maze berhasil di-copy ke clipboard!');
  };

  const clearResults = () => {
    setTestResults([]);
    setCurrentMaze(null);
  };

  return (
    <div className="performance-tester-wrapper">
      <div className="performance-container">
        {/* Header */}
        <div className="perf-header">
          <h1 className="perf-title">Maze Performance Tester</h1>
          <p className="perf-subtitle">
            Uji performa DFS Iteratif vs Rekursif dengan maze yang di-generate (UNLIMITED SIZE - Experimental Mode)
          </p>
        </div>

        {/* Input & Controls */}
        <div className="test-controls">
          <div className="input-group">
            <label className="control-label">
              Ukuran Maze (min: 5):
              <input
                type="number"
                min="5"
                value={mazeSize}
                onChange={(e) => setMazeSize(e.target.value)}
                className="size-input"
                disabled={isRunning}
              />
            </label>
          </div>

          <button
            onClick={runPerformanceTest}
            disabled={isRunning}
            className={`btn-test ${isRunning ? 'btn-disabled' : ''}`}
          >
            <svg className="btn-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {isRunning ? 'Testing...' : 'Run Performance Test'}
          </button>

          {currentMaze && showVisual && (
            <div className="maze-visual-notice">
              <p style={{color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', margin: '10px 0'}}>
                ℹ️ Visualisasi maze hanya ditampilkan untuk ukuran ≤30×30
              </p>
            </div>
          )}
          
          {currentMaze && (
            <button
              onClick={copyMazeMatrix}
              className="btn-copy"
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Maze Matrix ({currentMaze.length}×{currentMaze.length})
            </button>
          )}
        </div>

        {/* Results Table */}
        {testResults.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <h2 className="results-title">Hasil Testing ({testResults.length} tests)</h2>
              <div className="results-actions">
                <button onClick={exportResults} className="btn-export">
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export JSON
                </button>
                <button onClick={clearResults} className="btn-clear">
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear
                </button>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Ukuran</th>
                    <th colSpan="3">DFS Iteratif</th>
                    <th colSpan="3">DFS Rekursif</th>
                    <th>Winner</th>
                  </tr>
                  <tr>
                    <th></th>
                    <th>Time (ms)</th>
                    <th>Path</th>
                    <th>Visited</th>
                    <th>Time (ms)</th>
                    <th>Path</th>
                    <th>Visited</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {testResults.map((result) => (
                    <tr key={result.id}>
                      <td className="size-cell">{result.size}x{result.size}</td>
                      <td className={`time-cell ${result.winner === 'Iteratif' ? 'winner' : ''}`}>
                        {result.iterative.time}
                      </td>
                      <td>{result.iterative.pathLength}</td>
                      <td>{result.iterative.cellsVisited}</td>
                      <td className={`time-cell ${result.winner === 'Rekursif' ? 'winner' : ''}`}>
                        {result.recursive.time}
                      </td>
                      <td>{result.recursive.pathLength}</td>
                      <td>{result.recursive.cellsVisited}</td>
                      <td className="winner-cell">
                        <span className={`winner-badge ${result.winner.toLowerCase()}`}>
                          {result.winner}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Statistics */}
            <div className="summary-stats">
              <h3 className="summary-title">Summary</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-label">Avg Iteratif Time</div>
                  <div className="stat-value">
                    {(testResults.reduce((sum, r) => sum + parseFloat(r.iterative.time), 0) / testResults.length).toFixed(4)} ms
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Avg Rekursif Time</div>
                  <div className="stat-value">
                    {(testResults.reduce((sum, r) => sum + parseFloat(r.recursive.time), 0) / testResults.length).toFixed(4)} ms
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Iteratif Wins</div>
                  <div className="stat-value">
                    {testResults.filter(r => r.winner === 'Iteratif').length}
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Rekursif Wins</div>
                  <div className="stat-value">
                    {testResults.filter(r => r.winner === 'Rekursif').length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {testResults.length === 0 && (
          <div className="empty-state">
            <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="empty-text">
              Belum ada hasil testing. Masukkan ukuran maze dan klik "Run Performance Test"!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MazePerformanceTester;