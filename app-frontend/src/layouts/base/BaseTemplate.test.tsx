import { render, screen } from '@testing-library/react';
import BaseTemplate from ".";

describe("BaseTemplate component", () => {

    it('renders the heading and paragraph correctly', () => {
        render(<BaseTemplate />);

        const heading = screen.getByRole('heading', { name: /base layout/i });
        expect(heading).toBeInTheDocument();

        const paragraph = screen.getByText(/this is the base layout of the application./i);
        expect(paragraph).toBeInTheDocument();
    });
})