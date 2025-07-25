import Header from "../../components/Header";

const BaseTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col w-full">
            <Header />
            {children}
        </div>
    );
}

export default BaseTemplate;