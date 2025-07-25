import { Button } from "primereact/button";
import React from "react";

const LandingPage: React.FC = () => {

    return (
        <div>
            <h1>Welcome to the Landing Page</h1>
            <p>This is the landing page of our application.</p>
            <Button
                label="Get Started"
                size="large"
                onClick={() => alert("Button Clicked!")}
            />
        </div>
    )
}

export default LandingPage;