import { Button } from "./components/Button";
import { Plus, Share } from "lucide-react";
import { Card } from "./components/Card";

function App() {
  return (
    <>
      <div className="flex gap-3">
        {/* <Button variant="primary" className="flex">
          <Plus size={17} /> Add Content
        </Button>
        <Button variant="secondary">
          <Share size={17} /> Share
        </Button> */}

        <Card></Card>
      </div>
    </>
  );
}

export default App;
