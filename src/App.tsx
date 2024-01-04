import BookContainer from "./components/composable/BookContainer";
import CreateBookDialog from "./components/composable/CreateBookDialog";
import Navbar from "./components/composable/Navbar";

function App() {
	return (
		<>
			<Navbar />
			<div className="mt-8 px-5">
				<div className="flex justify-end mb-3">
					<CreateBookDialog />
				</div>

				<BookContainer />
			</div>
		</>
	);
}

export default App;
