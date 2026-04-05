export default function Navbar({role,onRolechange})
{
    return(
        <nav className="flex flex-row justify-between">
            <h2>My Finance</h2>
            <div>
            <label>view as:</label>  
                 <select value={role}
            onChange={()=>onRolechange()}>
                <option value="Admin">Admin</option>
                <option value="viewer">viewer</option>
            </select>
            </div>
        </nav>
    )
}