import { render, screen } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <div data-testid="mock_header">Header Mock</div>);

import BaseTemplate from ".";
import { BrowserRouter } from 'react-router';

describe("BaseTemplate component", () => {
  it('renders the heading and paragraph correctly', () => {
    render(
      <BrowserRouter>
        <BaseTemplate>
          <div>Child Content</div>
        </BaseTemplate>
      </BrowserRouter>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
    expect(screen.getByTestId('mock_header')).toBeInTheDocument();
  });
});
