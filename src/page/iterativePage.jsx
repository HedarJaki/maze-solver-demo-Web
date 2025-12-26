import '../style.css'
import maze from "../assets/maze.png"

function IterativeSection() {
  return (
    <div className="cihuy-2">
      <div className="dfs-section">
        <div className="dfs-title">DFS ITERATIF</div>
        <div className="dfs-icon-box">
        <img src={maze} alt="Maze" className="maze-image" />
        </div>
      </div>

      <div className="algoritma-iteratif">
        <pre className="code-snippet">
          <code>
            <span className="keyword">def</span> <span className="function">solve_maze_iterative</span>(maze):{'\n'}
            {'    '}<span className="keyword">if not</span> maze <span className="keyword">or not</span> maze[<span className="number">0</span>]:{'\n'}
            {'        '}<span className="keyword">return</span> <span className="number">False</span>{'\n'}
            {'    '}rows, cols = <span className="function">len</span>(maze), <span className="function">len</span>(maze[<span className="number">0</span>]){'\n'}
            {'    '}visited = <span className="function">set</span>(){'\n'}
            {'    '}stack = [(<span className="number">0</span>, <span className="number">0</span>)]{'\n'}
            {'    '}directions = [(<span className="number">-1</span>,<span className="number">0</span>), (<span className="number">1</span>,<span className="number">0</span>), (<span className="number">0</span>,<span className="number">-1</span>), (<span className="number">0</span>,<span className="number">1</span>)]{'\n'}
            {'\n'}
            {'    '}<span className="keyword">while</span> stack:{'\n'}
            {'        '}row, col = stack.<span className="function">pop</span>(){'\n'}
            {'        '}<span className="keyword">if</span> (row,col) <span className="keyword">in</span> visited:{'\n'}
            {'            '}<span className="keyword">continue</span>{'\n'}
            {'        '}visited.<span className="function">add</span>((row,col)){'\n'}
            {'        '}<span className="keyword">if</span> row == rows - <span className="number">1</span> <span className="keyword">and</span> col == cols - <span className="number">1</span>:{'\n'}
            {'            '}<span className="keyword">return</span> <span className="number">True</span>{'\n'}
            {'\n'}
            {'        '}<span className="keyword">for</span> dr, dc <span className="keyword">in</span> directions:{'\n'}
            {'            '}new_row, new_col = row + dr, col + dc{'\n'}
            {'            '}<span className="keyword">if</span> (<span className="number">0</span> {'<='} new_row {'<'} rows <span className="keyword">and</span>{'\n'}
            {'                '}<span className="number">0</span> {'<='} new_col {'<'} cols <span className="keyword">and</span>{'\n'}
            {'                '}maze[new_row][new_col] == <span className="number">0</span> <span className="keyword">and</span>{'\n'}
            {'                '}(new_row, new_col) <span className="keyword">not in</span> visited):{'\n'}
            {'                '}stack.<span className="function">append</span>((new_row, new_col)){'\n'}
            {'    '}<span className="keyword">return</span> <span className="number">False</span>
          </code>
        </pre>
      </div>
    </div>
  )
}

export default IterativeSection