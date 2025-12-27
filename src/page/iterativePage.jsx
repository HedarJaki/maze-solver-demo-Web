import '../style.css'
import maze from "../assets/maze.png"

function IterativeSection() {
  return (
    <>
      <div className="dfs-section">
        <div className="dfs-title">DFS ITERATIF</div>
        <div className="dfs-icon-box">
        <img src={maze} alt="Maze" className="maze-image" />
        </div>
      </div>

      <div className="algoritma-iteratif">
        <pre className="code-snippet">
          <code>
            <span className="keyword">bool</span> <span className="function">dfs_iterative</span>((vector<span className="number">{'<'}</span>vector
            <span className="number">{'<'}</span><span className="keyword">int</span><span className="number">{'>>&'}</span> maze, vector<span className="number">{'<'}</span>
            pair<span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span><span className="number">{'>>&'}</span> path){'{\n'}
            
            {'    '}<span className="keyword">if </span> (maze.<span className="function">empty</span>() <span className='number'>|| </span>maze[<span className='number'>0</span>].<span className='function'>empty</span>()) <span className='keyword'>return</span> <span className='number'>false</span>;{'\n\n'}
            {'    '}<span className='keyword'>int </span>rows = maze.<span className="function">size</span>();{'\n'}
            {'    '}<span className='keyword'>int </span>cols = maze[<span className='number'>0</span>].<span className="function">size</span>();{'\n\n'}

            {'    '}set<span className="number">{'<'}</span>pair<span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span><span className="number">{'>>'}</span> visited;{'\n'}
            {'    '}stack<span className="number">{'<'}</span>pair<span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span><span className="number">{'>>'}</span> st;{'\n'}
            {'    '}map<span className="number">{'<'}</span>pair<span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span><span className="number">{'>'}</span>,
            pair<span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span><span className="number">{'>>'}</span> parent;{'\n\n'}


            {'    '}st.<span className="function">push</span>({'{'}<span className='number'>0</span>,<span className='number'>0</span>{'}'});{'\n'}
            {'    '}parent[{'{'}<span className='number'>0</span>,<span className='number'>0</span>{'}'}] = {'{'}<span className='number'>-1</span>,<span className='number'>-1</span>{'}'};{'\n\n'}


            {'    '}vector<span className="number">{'<'}</span>pair<span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span><span className="number">{'>>'}</span> direction = 
                    {' {{'}<span className='number'>-1</span>,<span className='number'>0</span>{'}'}, {'{'}<span className='number'>1</span>,<span className='number'>0</span>{'}'}, {'{'}<span className='number'>0</span>,<span className='number'>-1</span>{'}'} {'{'}
                    <span className='number'>0</span>,<span className='number'>1</span>{'}}'};{'\n\n'}

            {'    '}<span className="keyword">while </span>(<span className='number'>!</span>st.<span className='function'>empty</span>()){'{'}{'\n'}
            {'        '}pair<span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span><span className="number">{'>'}</span> current = st.<span className='function'>top</span>();{'\n'}
            {'        '}st.<span className='function'>pop</span>();{'\n\n'}

            {'        '}<span className="keyword">int</span> row = current.<span className="function">first</span>;{'\n'}
            {'        '}<span className="keyword">int</span> col = current.<span className="function">second</span>;{'\n\n'}

            {'        '}<span className='keyword'>if</span>(row <span className='number'>==</span> rows<span className='number'>-1 &&</span> col <span className='number'>==</span> cols<span className='number'>-1</span>){'{'}{'\n'}
            {'            '}pair<span className="number">{'<'}</span><span className="keyword">int</span>,<span className="keyword">int</span><span className="number">{'>'}</span> pos = {'{row, col}'};{'\n'}
            {'            '}<span className="keyword">while</span> (pos.<span className='function'>first</span><span className='number'>!= -1</span>){'{'}{'\n'}
            {'                '}path.<span className='function'>push_back</span>(pos);{'\n'}
            {'                '}pos = parent[pos];{'\n'}
            {'            '}{'}'}{'\n'}
            {'            '}<span className="function">reverse</span>(path.<span className="function">begin</span>(), path.<span className='function'>end</span>());{'\n'}
            {'            '}<span className='keyword'>return</span> <span className='number'> true</span>;
            {'        '}{'}'}{'\n\n'}

            {'        '}<span className='keyword'>for </span>(<span className='keyword'>const auto</span><span className='number'>&</span> dir : direction) {'{\n'}
            {'            '}<span className='keyword'>int</span> new_row = row <span className='number'>+ </span>dir.<span className='function'>first</span>;{'\n'}
            {'            '}<span className='keyword'>int</span> new_col = col <span className='number'>+ </span>dir.<span className='function'>second</span>;{'\n\n'}

            {'             '}<span className='keyword'>if </span>(new_row<span className='number'>{'>= 0 '}</span>&& new_row <span className='number'>{'< '}</span>rows &&{'\n'}
            {'                '}new_col <span className='number'>{'>= 0 '}</span>&& new_col <span className='number'>{'< '}</span>cols &&{'\n'}
            {'                '}maze[new_row][new_col] <span className='number'>== 0</span>&&{'\n'}
            {'                '}visited.<span className='function'>find</span>({'{new_row, new_col}'}) <span className='number'>==</span> visited.<span className='function'>end</span>()){'{\n'}
            {'                '}st.<span className='function'>push</span>({'{new_row, new_col}'});{'\n'}
            {'                '}<span className='keyword'>if </span>(parent.<span className='function'>find</span>({'{new_row, new_col}'})<span className='number'>== </span>parent.<span className='function'>end</span>()){'{\n'}
            {'                    '}parent[{'{new_row, new_col}'}] = {'{row, col};\n'}
            {'                '}{'}\n'}
            {'             '}{'}\n'}
            {'        '}{'}\n'}
            {'    '}{'\n'}
            {'    '}<span className='keyword'>return</span> <span className='number'> false</span> {'\n'}
            {'}'}
          </code>
        </pre>
      </div>
      </>
  )
}

export default IterativeSection