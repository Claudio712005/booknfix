import { screen } from '@testing-library/react';
import BaseTemplate from ".";
import { renderWithProviders } from '../../../utils/test-utils';

describe("BaseTemplate component", () => {
  it('renders the heading and paragraph correctly', () => {
    renderWithProviders(
      <BaseTemplate>
        <div>Child Content</div>
      </BaseTemplate>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
