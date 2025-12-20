import { useState } from "react";

import { Button } from "@/components/ui/button";

function App() {
    const [count, setCount] = useState(0);

    const onClick = () => {
        setCount((prev) => prev + 1);
    };

    return (
        <main>
            <Button onClick={onClick}>Click me</Button>
            <p>Count: {count}</p>
        </main>
    );
}

export default App;
