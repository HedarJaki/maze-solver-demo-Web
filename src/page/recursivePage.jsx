import "../style.css"
import maze from "../assets/maze.png"
function RecursiveSection(){
    return (
        <>
        <div className="dfs-section">
        <div className="dfs-title">DFS ITERATIF</div>
        <div className="dfs-icon-box">
          {/* <img src={maze} alt="maze" className="dfs-icon"/>  */}
        </div>
      </div>


      <div className="algoritma-iteratif">
        <div className="code-snippet"><span className="keyword">def</span> <span className="function">is_valid</span>(maze, visited, row, col, rows, cols):
    <row><span className="keyword">return</span> (<span className="number">0</span> {'<='} row {'<'} rows <span className="keyword">and</span> <span className="number">0</span> {'<='} col {'<'} cols <span className="keyword">and</span>
            maze[row][col] == <span className="number">0</span> <span className="keyword">and not</span> visited[row][col])</row>

<span className="keyword">def</span> <span className="function">dfs_recursive</span>(maze, visited, row, col, rows, cols):
    <span className="keyword">if</span> row == rows - <span className="number">1</span> <span className="keyword">and</span> col == cols - <span className="number">1</span>:
        <span className="keyword">return</span> <span className="number">True</span>  <span className="comment"># Ditemukan end</span>
    
    visited[row][col] = <span className="number">True</span>
    
    <span className="comment"># Arah: atas, bawah, kiri, kanan</span>
    directions = [(-<span className="number">1</span>, <span className="number">0</span>), (<span className="number">1</span>, <span className="number">0</span>), (<span className="number">0</span>, -<span className="number">1</span>), (<span className="number">0</span>, <span className="number">1</span>)]
    <span className="keyword">for</span> dr, dc <span className="keyword">in</span> directions:
        new_row, new_col = row + dr, col + dc
        <span className="keyword">if</span> <span className="function">is_valid</span>(maze, visited, new_row, new_col, rows, cols):
            <span className="keyword">if</span> <span className="function">dfs_recursive</span>(maze, visited, new_row, new_col, rows, cols):
                <span className="keyword">return</span> <span className="number">True</span>
    
    <span className="keyword">return</span> <span className="number">False</span>

<span className="keyword">def</span> <span className="function">solve_maze_recursive</span>(maze):
    <span className="keyword">if not</span> maze <span className="keyword">or not</span> maze[<span className="number">0</span>]:
        <span className="keyword">return</span> <span className="number">False</span>
    rows, cols = <span className="function">len</span>(maze), <span className="function">len</span>(maze[<span className="number">0</span>])
    visited = [[<span className="number">False</span>] * cols <span className="keyword">for</span> _ <span className="keyword">in</span> <span className="function">range</span>(rows)]
    <span className="keyword">return</span> <span className="function">dfs_recursive</span>(maze, visited, <span className="number">0</span>, <span className="number">0</span>, rows, cols)</div>
      </div>
        </>
    )
}


export default RecursiveSection