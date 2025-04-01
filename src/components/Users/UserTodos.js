// import { useQuery } from "@tanstack/react-query";
// import getData from "../../util/api";

// const UserTodos = ({id}) => {
//     const {data: todos} = useQuery({
//         queryKey: ["todos", id],
//         queryFn: () => getData(`http://localhost:3001/todos?userId=${id}`, 1500),
//         suspense: true
//     });

//     return (
//         <div className="user-todos">
//             <h3>User Todos</h3>
//             {todos.length > 0 ? (
//                 <ul>
//                     {todos.map(todo => <li key={todo.id}>{todo.todo}</li>)}
//                 </ul>
//             ) : (
//                 <p>Nothing to do!</p>
//             )}
//         </div>
//     );
// };

// export default UserTodos;