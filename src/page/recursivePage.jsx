import "../style.css"
import maze from "../assets/maze.png"
function RecursiveSection(){
    return (
        <>
        <div className="dfs-section">
        <div className="dfs-title">DFS REKURSIF</div>
        <div className="dfs-icon-box">
        <img src={maze} alt="Maze" className="maze-image" />
        </div>
      </div>


      <div className="algoritma-iteratif">
        <pre className="code-snippet">
            <code>
            <span className="keyword">bool</span><span className="function"> dfs_recursive_helper</span>(vector<span className="number">{'<'}</span>vector
            <span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span><span className="number">{'>>&'}</span> maze, 
            <span className="keyword">int</span> row, <span className="keyword">int</span> col, {'\n'}set<span className="number">{'<'}</span>pair
            <span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span><span className="number">{'>>&'}</span> visited,
            vector<span className="number">{'<'}</span>pair<span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span>
            <span className="number">{'>>&'}</span> path){'{\n\n'}
            {'      '}<span className="keyword">int</span> rows = maze.<span className="function">size()</span>;{'\n'}
            {'      '}<span className="keyword">int</span> cols = maze[<span className="number">0</span>].<span className="function">size()</span>;{'\n\n'}

            {'      '}<span className="keyword">if</span>(row <span className="number">{'<'} 0 || </span>row <span className="number">{'>='}</span> rows <span className="number">|| </span>
            col <span className="number">{'< 0 || '}</span> col <span className="number">{'>= '}</span>cols) <span className="keyword">return</span> <span className="number">false</span>;{'\n'}
            {'      '}<span className="keyword">if</span>(maze[row][col] <span className="number">== 1</span>) <span className="keyword">return</span> <span className="number">false</span>;{'\n'}
            {'      '}<span className="keyword">if</span>(visited.<span className="function">find</span>({'{row, col}'}) <span className="number">!=</span> visited.<span className="function">end</span>())
            <span className="keyword"> return</span> <span className="number">false</span>;{'\n\n'}

            {'      '}visited.<span className="function">insert</span>({'{row, col}'});{'\n'}
            {'      '}path.<span className="function">push_back</span>({'{row, col}'});{'\n\n'}

            {'      '}<span className="keyword">if</span>(row <span className="number">==</span> rows <span className="number">-1 {'&&'}</span> col <span className="number">==</span> cols<span className="number">-1</span>) 
            <span className="keyword"> return</span> <span className="number">true</span>;{'\n\n'}

            {'      '}<span className="keyword">if</span>(dfs_recursive_helper(maze, row<span className="number">-1</span>, col, visited, path))<span className="keyword">return</span> <span className="number">true</span>;{'\n'}
            {'      '}<span className="keyword">if</span>(dfs_recursive_helper(maze, row<span className="number">+1</span>, col, visited, path))<span className="keyword">return</span> <span className="number">true</span>;{'\n'}
            {'      '}<span className="keyword">if</span>(dfs_recursive_helper(maze, row, col<span className="number">-1</span>, visited, path))<span className="keyword">return</span> <span className="number">true</span>;{'\n'}
            {'      '}<span className="keyword">if</span>(dfs_recursive_helper(maze, row, col<span className="number">+1</span>, visited, path))<span className="keyword">return</span> <span className="number">true</span>;{'\n\n'}
            
            {'      '}path.<span className="function">pop_back</span>();{'\n'}
            {'      '}<span className="keyword">return</span> <span className="number">false</span>;{'\n'}
            {'}\n\n'}

            <span className="keyword">bool</span> dfs_recursive (vector<span className="number">{'<'}</span>vector
            <span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span><span className="number">{'>>&'}</span> maze, vector<span className="number">{'<'}</span>pair
            <span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span>
            <span className="number">{'>>&'}</span> path){'{\n'}
            {'      '}<span className="keyword">if</span> (maze.<span className="function">empty()</span><span className="number"> ||</span> maze[<span className="number">0</span>].<span className="function">empty()</span>) 
            <span className="keyword"> return</span> <span className="number">false</span>; {'\n\n'}
            {'      '}set<span className="number">{'<'}</span>pair<span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span><span className="number">{'>>&'}</span> visited;{'\n'}
            {'      '}<span className="keyword">return</span> <span className="function"> dfs_recursive_helper</span>(maze, <span className="number">0</span>,<span className="number"> 0</span>, visited, path);{'\n'}
            {'}'}
            </code>
        </pre>
      </div>
        </>
    )
}


export default RecursiveSection